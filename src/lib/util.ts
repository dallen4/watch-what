import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator';

export const hash = (input: any) => {
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex');
};

export const generateUsername = (prevSeed?: string) => {
    const seed = prevSeed || nanoid();

    const username = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: '',
        style: 'capital',
        seed,
    });

    return username;
};
