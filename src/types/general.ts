import { NextApiRequest } from 'next';

export type ApiRequest<Data = any> = Omit<NextApiRequest, 'body'> & {
    body: Data;
};

export enum SortBy {
    RelevanceDesc = 'relevance_desc',
    RelevanceAsc = 'relevance_asc',
    PopularityDesc = 'popularity_desc',
    PopularityAsc = 'popularity_asc',
    ReleaseDateDesc = 'release_date_desc',
    ReleaseDateAsc = 'release_date_asc',
    TitleDesc = 'title_desc',
    TitleAsc = 'title_asc',
}

export type SortDirection = 'asc' | 'desc';

export const SortOptions = ['Relevance', 'Popularity', 'Release Date', 'Title'];

export type SearchInput = {
    query: string;
    sources: number[];
    genres: number[];
    sort_by: SortBy;
};

export type SearchRequest = ApiRequest<SearchInput>;

export type Source = {
    id: number;
    name: string;
    type: string;
    logo_100px: string;
    ios_appstore_url: string;
    android_playstore_url: string;
    android_scheme: string;
    ios_scheme: string;
    regions: string[];
};

export type Genre = {
    id: number;
    name: string;
    tmdb_id: number;
};

export type Title = {
    id: number;
    title: string;
    year: number;
    imdb_id: string;
    tmdb_id?: number;
    tmdb_type?: 'movie';
    type: 'movie';
};
