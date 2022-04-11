import axios from 'axios';
import { SearchInput, SearchResult } from 'types/general';

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
    const { query, sources, types, genres, sort_by } = options;

    const response = await client.get<SearchResult>('/v1/list-titles/', {
        params: {
            source_ids: sources.join(','),
            genres: genres.join(','),
            types: types.join(','),
            sort_by,
            regions: 'US',
            limit: 50,
        },
    });

    return response.data;
};
