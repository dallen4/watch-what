import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import PasswordlessReact from 'supertokens-auth-react/recipe/passwordless';
import SessionReact from 'supertokens-auth-react/recipe/session';
import theme from 'theme';
import { appInfo } from './appInfo';

export const frontendConfig = (): SuperTokensConfig => {
    return {
        appInfo,
        recipeList: [
            PasswordlessReact.init({
                contactMethod: 'EMAIL',
                palette: {
                    background: theme.palette.background.default,
                    error: theme.palette.error.main,
                    textTitle: theme.palette.primary.main,
                    textLabel: theme.palette.secondary.main,
                    textInput: theme.palette.text.primary,
                    textPrimary: theme.palette.primary.main,
                    textLink: '#a9a9a9',
                    inputBackground: theme.palette.grey[300],
                },
                signInUpFeature: {
                    emailOrPhoneFormStyle: {
                        button: {
                            backgroundColor: theme.palette.primary.main,
                            border: '0px',
                            width: '100%',
                            margin: '0 auto',
                        },
                        input: {

                        },
                    },
                },
            }),
            SessionReact.init(),
        ],
    };
};
