import axios from 'axios';
import { SearchInput, Title } from 'types/general';

export const client = axios.create({
    baseURL: 'https://api.watchmode.com',
    params: {
        apiKey: process.env.WATCHMODE_API_KEY,
    },
});

export const getSources = async () => {
    const response = await client.get('/v1/sources/');
    return response.data;
};

export const getGenres = async () => {
    const response = await client.get('/v1/genres/');
    return response.data;
};

export const searchTitles = async (options: SearchInput) => {
    const { query, sources, genres, sort_by } = options;

    const response = await client.get<{ titles: Title[] }>('/v1/list-titles/', {
        params: {
            source_ids: sources.join(','),
            genres: genres.join(','),
            sort_by,
        },
    });

    return response.data;
};
