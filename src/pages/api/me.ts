import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import supertokens from 'supertokens-node';
import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';
import { backendConfig } from 'config/auth/backend';

supertokens.init(backendConfig());

export type ApiRequest = NextApiRequest &
    Request & {
        session: {
            getHandle: () => string;
            getUserId: () => string;
            getSessionData: () => any;
            updateSessionData: (data: any) => Promise<void>;
            getAccessTokenPayload: () => any;
            updateAccessTokenPayload: (data: any) => void;
            revokeSession: () => void;
            getTimeCreated: () => number;
            getExpiry: () => number;
            getAccessToken: () => string;
        };
    };

export default async function me(
    req: NextApiRequest & Request,
    res: NextApiResponse & Response,
) {
    if (req.method !== 'GET')
        return res.status(405).end();

    await superTokensNextWrapper(
        async (next) => {
            return await verifySession()(req, res, next);
        },
        req,
        res,
    );

    const reqWithSession = req as ApiRequest;

    return res.json({
        userId: reqWithSession.session.getUserId(),
        handle: reqWithSession.session.getHandle(),
        data: reqWithSession.session.getAccessTokenPayload(),
    });
}
