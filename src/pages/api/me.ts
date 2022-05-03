import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import supertokens from 'supertokens-node';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { NextApiResponse } from 'next';
import { Response } from 'express';
import { backendConfig } from 'config/auth/backend';
import { ApiRequest } from 'types/general';

supertokens.init(backendConfig());

export default async function me(req: ApiRequest, res: NextApiResponse & Response) {
    if (req.method !== 'GET') return res.status(405).end();

    await superTokensNextWrapper(
        async (next) => {
            return await verifySession()(req, res, next);
        },
        req,
        res,
    );

    const userId = req.session!.getUserId();

    const { metadata } = await UserMetadata.getUserMetadata(userId);

    res.status(200).json({
        userId,
        handle: req.session!.getHandle(),
        data: metadata,
    });

    return;
}
