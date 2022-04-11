const domain =
    process.env.NODE_ENV === 'production'
        ? 'https://watch.nieky.dev'
        : 'http://localhost:3000';

export const appInfo = {
    // ref: https://supertokens.com/docs/passwordless/appinfo
    appName: 'watch-what',
    apiDomain: domain,
    websiteDomain: domain,
    apiBasePath: '/api/auth',
    websiteBasePath: '/auth',
};
