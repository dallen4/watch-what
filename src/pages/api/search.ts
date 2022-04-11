import type { NextApiResponse } from 'next';
import { SearchRequest, TitleWithDetails } from 'types/general';
import { searchTitles } from '@lib/client';
import { getTitleDetails } from '@lib/imdb';

export default async function search(req: SearchRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
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
