import { getCookie, setCookies } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { ApiResponse, SearchRequest, TitleWithDetails } from 'types/general';
import { searchTitles } from 'api/data/watchmode';
import { getTitleDetails } from 'api/data/imdb';
import { hash } from 'lib/util';
import redis from 'api/redis';
import { auth } from 'api/middleware/auth';

const DAY_IN_SECONDS = 86400;
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

async function search(req: SearchRequest, res: ApiResponse) {
    // block non-POST requests
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }
console.log(req.body);
    // check cache
    const stringifiedInput = JSON.stringify(req.body);
    const cacheKey = hash(stringifiedInput);

    const cachedValue = await redis.hgetall(cacheKey);

    if (cachedValue && cachedValue.titles) {
        console.log('CACHE HIT: ' + cacheKey);
        const parsedTitles = JSON.parse(cachedValue.titles);
        res.status(200).json({ titles: parsedTitles });
        return;
    }

    // if (!req.session) {
    //     const cookie = getCookie('search-count', { req, res }) as string;

    //     const options: OptionsType = {
    //         req,
    //         res,
    //         maxAge: WEEK_IN_MS,
    //     };

    //     if (!cookie) setCookies('search-count', 1, options);
    //     else if (cookie && parseInt(cookie) < 10)
    //         setCookies('search-count', parseInt(cookie) + 1, options);
    //     else {
    //         res.status(429).end();
    //         return;
    //     }
    // }

    const data = await searchTitles(req.body);

    const titlesWithMetaReqs = data.titles.map(async (title) => {
        const info: TitleWithDetails = { ...title };

        if (title.imdb_id) info.details = await getTitleDetails(title.imdb_id);

        return info;
    });

    const titlesWithMeta = await Promise.all(titlesWithMetaReqs);

    await redis.hmset(cacheKey, {
        titles: JSON.stringify(titlesWithMeta),
    });
    await redis.expire(cacheKey, DAY_IN_SECONDS);

    res.status(200).json({ titles: titlesWithMeta });
    return;
}

export default auth(search);
