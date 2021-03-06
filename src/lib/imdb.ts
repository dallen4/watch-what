import axios from 'axios';
import IMDb from 'imdb-light';
import { IMDbTitle } from 'types/imdb';

const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '0e8df11290dfd54a54e5c5fee1845a1d',
    },
});

export const getTitleDetails = async (titleId: string) => {
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

    const [details] = [
        ...movie_results,
        ...tv_results,
        ...tv_episode_results,
        ...tv_season_results,
    ];

    return details as IMDbTitle;
};
