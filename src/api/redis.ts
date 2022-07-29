import Redis from 'ioredis';

const client = new Redis(process.env.REDIS_URL!, {
    keyPrefix: 'watch-what:',
});

export default client;
