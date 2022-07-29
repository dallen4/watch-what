// Declarations for modules without types
declare module '*posts' {
    const value: any;
    export default value;
}

declare module '*.md';

interface Window {
    GA_ANALYTICS: boolean;
}

declare module NodeJS {
    interface Global {
        prisma: import('@prisma/client').PrismaClient;
    }
}
