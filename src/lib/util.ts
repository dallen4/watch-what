import crypto from 'crypto';

export const hash = (input: any) => {
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex');
};
