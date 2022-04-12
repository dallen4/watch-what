import { getCookie, setCookies } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import Session from 'supertokens-node/recipe/session';
import supertokens from 'supertokens-node';
import { backendConfig } from 'config/auth/backend';
import { ApiResponse, SearchRequest, TitleWithDetails } from 'types/general';
import { searchTitles } from '@lib/watchmode';
import { getTitleDetails } from '@lib/imdb';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export default async function search(req: SearchRequest, res: ApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    supertokens.init(backendConfig());

    try {
        const session = await Session.getSession(req, res);

        if (!session) throw new Error('No session');

    } catch (err) {
        const cookie = getCookie('search-count', { req, res }) as string;

        const options: OptionsType = {
            req,
            res,
            maxAge: WEEK_IN_MS,
        };

        if (!cookie) setCookies('search-count', 1, options);
        else if (cookie && parseInt(cookie) < 10)
            setCookies('search-count', parseInt(cookie) + 1, options);
        else {
            res.status(429).end();
            return;
        }
    }

    const data = await searchTitles(req.body);

    const titlesWithMetaReqs = data.titles.map(async (title) => {
        const info: TitleWithDetails = { ...title };

        if (title.imdb_id) {
            const imdbDetails = await getTitleDetails(title.imdb_id);

            info.details = {
                ...imdbDetails,
                poster: imdbDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2` +
                      imdbDetails.poster_path
                    : undefined,
            };
        }

        return info;
    });

    const titlesWithMeta = await Promise.all(titlesWithMetaReqs);

    res.status(200).json({ titles: titlesWithMeta });
    return;
}
