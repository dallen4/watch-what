import type { NextApiResponse } from 'next';
import { SearchRequest } from 'types/general';
import { searchTitles } from '@lib/client';

export default async function search(
    req: SearchRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    const sources = await searchTitles(req.body);

    res.status(200).json(sources);
    return;
}
