import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { middleware } from 'supertokens-node/framework/express';
import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';
import { init } from 'api/auth';

init();

export default async function superTokens(
    req: NextApiRequest & Request,
    res: NextApiResponse & Response,
) {
    await superTokensNextWrapper(
        async (next) => {
            await middleware()(req, res, next);
        },
        req,
        res,
    );

    if (!res.writableEnded) {
        res.status(404).send('Not found');
    }
}
