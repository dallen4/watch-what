import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { ApiRequest, ApiResponse } from 'types/general';
import { auth } from 'api/middleware/auth';

async function me(req: ApiRequest, res: ApiResponse) {
    if (req.method !== 'GET') return res.status(405).end();

    const userId = req.session!.getUserId();

    const { metadata } = await UserMetadata.getUserMetadata(userId);

    res.status(200).json({
        userId,
        handle: req.session!.getHandle(),
        data: metadata,
    });

    return;
}

export default auth(me, true);
