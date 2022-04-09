import IMDb from 'imdb-light';
import { IMDbTitle } from 'types/imdb';

export const getTitleDetails = async (titleId: string) => {
    const request = new Promise<IMDbTitle>(function (resolve, reject) {
        IMDb.fetch(titleId, resolve);
    });

    const title = await request;

    return title;
};
