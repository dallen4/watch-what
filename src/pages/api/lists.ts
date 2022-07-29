import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { ApiRequest, ApiResponse } from 'types/general';
import { auth } from 'api/middleware/auth';
import prisma from 'api/prisma';
import { WatchList } from '@prisma/client';

type Profile = {
    id: string;
    metadata: any;
    lists?: WatchList[];
};

type DeleteLists = {
    ids: string[];
};

type PatchList = { id: string } & Partial<Omit<WatchList, 'id'>>;

async function lists(req: ApiRequest, res: ApiResponse) {
    const userId = req.session!.getUserId();

    if (req.method === 'GET') {
        const lists = await prisma.watchList.findMany({
            where: {
                userId,
            },
        });

        res.status(200).json({
            lists,
        });
    } else if (req.method === 'PATCH') {
        const { id, ...updates } = req.body as PatchList;

        const updatedList = await prisma.watchList.upsert({
            where: {
                id,
            },
            update: updates,
            create: {
                id,
                userId,
                name: 'New List',
                ...updates,
            },
        });

        res.status(200).json(updatedList);
    } else if (req.method === 'DELETE') {
        const { ids } = req.body as DeleteLists;

        const deleted = await prisma.watchList.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        res.status(200).json({ success: deleted.count === ids.length });
    }

    return;
}

export default auth(lists, true);
