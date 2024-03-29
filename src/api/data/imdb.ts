import axios from 'axios';
import { IMDbTitle, TitleType, TitleVideoDetails, VideosResponse } from 'types/imdb';
import redis from 'api/redis';
import { getTitleSources } from './watchmode';

const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.TMDB_API_KEY!,
    },
});

const WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

export const getTitleDetails = async (titleId: string) => {
    const cacheKey = `title:${titleId}`;

    const cachedValue = await redis.hgetall(cacheKey);

    if (!cachedValue || Object.keys(cachedValue).length > 0) {
        console.log('CACHE HIT: ' + cacheKey);
        return (cachedValue as unknown) as IMDbTitle;
    }

    const request = await client.get(`/find/${titleId}`, {
        params: {
            external_source: 'imdb_id',
        },
    });

    const {
        movie_results,
        tv_results,
        tv_episode_results,
        tv_season_results,
    } = request.data;

    const type = movie_results.length > 0 ? 'movie' : 'tv';

    const [details] = [
        ...movie_results,
        ...tv_results,
        ...tv_episode_results,
        ...tv_season_results,
    ];

    const videos = await getTitleVideos(details.id, type);
    // const sources = await getTitleSources(details.id);

    const title: IMDbTitle = {
        ...details,
        type,
        genre_ids:
            typeof details.genre_ids === 'string'
                ? details.genre_ids.split(',').map(Number)
                : details.genre_ids,
        poster: details.poster_path
            ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2` + details.poster_path
            : undefined,
        name:
            details.title ||
            details.name ||
            details.original_name ||
            details.original_title,
        videos,
        // sources,
    };

    await redis.hmset(cacheKey, title);
    await redis.expire(cacheKey, WEEK_IN_SECONDS);

    return title;
};

export const getTitleVideos = async (id: string, type: TitleType) => {
    const path = `/${type}/${id}/videos`;

    const request = await client.get<VideosResponse>(path);

    const { results } = request.data;

    const videos: TitleVideoDetails[] = results.map((video) => {
        const embedUrl =
            video.site === 'YouTube'
                ? `https://www.youtube.com/embed/${video.key}`
                : null;

        return {
            title: video.name,
            url: embedUrl,
            type: video.type,
        };
    }).filter((video) => video.url);

    return videos;
};
