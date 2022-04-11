import PasswordlessNode from 'supertokens-node/recipe/passwordless';
import SessionNode from 'supertokens-node/recipe/session';
import { appInfo } from './appInfo';
import { TypeInput } from 'supertokens-node/types';
import { sendLoginEmail } from '@lib/email';

export const backendConfig = (): TypeInput => {
    return {
        framework: 'express',
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        appInfo,
        recipeList: [
            PasswordlessNode.init({
                flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
                contactMethod: 'EMAIL',
                createAndSendCustomEmail: async (input, context) => {
                    sendLoginEmail(input.email, input.userInputCode!);
                    return;
                },
            }),
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    };
};
