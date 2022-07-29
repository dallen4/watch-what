import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { init } from 'api/auth';
import { ApiRequest, ApiResponse } from 'types/general';

init();

export const auth = (
    handler: (req: ApiRequest<any>, res: ApiResponse<any>) => Promise<void>,
    required = false,
) => async (req: ApiRequest, res: ApiResponse) => {
    await superTokensNextWrapper(
        async (next) => {
            return await verifySession({ sessionRequired: required })(req, res, next);
        },
        req,
        res,
    );

    return handler(req, res);
};
