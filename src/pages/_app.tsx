import React from 'react';
import { AppBar, Box, CssBaseline, ThemeProvider, Typography } from '@material-ui/core';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { DefaultSeo } from 'next-seo';
import { initGA, logPageView } from '@lib/analytics';
import Footer from 'atoms/Footer';
import theme from 'theme';
import BrandLogo from 'atoms/BrandLogo';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig } from 'config/auth/frontend';

if (typeof window !== 'undefined') {
    SuperTokensReact.init(frontendConfig());
}

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;
    const Router = useRouter();

    React.useEffect(() => {
        // Remove the server-side injected CSS
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        if (!window.GA_ANALYTICS && process.env.NODE_ENV === 'production') {
            initGA();
            window.GA_ANALYTICS = true;
            logPageView(window.location.pathname);
            Router.events.on('routeChangeComplete', (url) => {
                logPageView(url);
                window.scrollTo(0, 0);
            });
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <CssBaseline />
                <DefaultSeo
                    title={'Watch What?'}
                    description={'Figure out what to watch next.'}
                    openGraph={{}}
                />
                <Box
                    width={'100%'}
                    maxWidth={'100vw'}
                    height={'auto'}
                    minHeight={'100vh'}
                    bgcolor={theme.palette.background.default}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <AppBar
                        elevation={0}
                        style={{
                            backgroundColor: 'inherit',
                            position: 'relative',
                            border: 0,
                            padding: theme.spacing(4, 4),
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <BrandLogo />
                            <Typography color={'secondary'}>
                                For what to watch when you're tired of switching apps.
                            </Typography>
                        </div>
                    </AppBar>
                    <Component {...pageProps} />
                    <Footer />
                </Box>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
