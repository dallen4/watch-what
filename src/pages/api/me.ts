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

async function me(req: ApiRequest, res: ApiResponse) {
    if (req.method !== 'GET') return res.status(405).end();

    const userId = req.session!.getUserId();

    const { metadata } = await UserMetadata.getUserMetadata(userId);

    const profile: Profile = {
        id: userId,
        metadata,
    };

    if (metadata.premium) {
        profile.lists = await prisma.watchList.findMany({
            where: {
                userId,
            },
        });
    }

    res.status(200).json(profile);

    return;
}

export default auth(me, true);
