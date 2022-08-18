import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';
import { IMDbTitle } from './imdb';
import { SessionRequest } from 'supertokens-node/framework/express';

export type ApiRequest<Data = any> = Omit<NextApiRequest, 'body'> &
    Request<any, Data> &
    SessionRequest;

export type ApiResponse<Data = any> = Omit<NextApiResponse, 'body'> & Response<Data>;

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

export const SortOptions = ['Popularity', 'Relevance', 'Release Date', 'Title'];

export type SearchInput = {
    query?: string;
    sources: number[];
    types: string[];
    genres: number[];
    sort_by: SortBy;
    page?: number;
};

export type SearchRequest = ApiRequest<SearchInput>;

export type SearchResult = {
    titles: TitleWithDetails[];
};

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

export type TitleType =
    | 'movie'
    | 'tv_series'
    | 'tv_special'
    | 'tv_miniseries'
    | 'short_film';

export const TitleTypes = [
    'Movie',
    'TV Series',
    'TV Special',
    'TV Mini-Series',
    'Short Film',
];

export type Title = {
    id: number;
    title: string;
    year: number;
    imdb_id: string;
    tmdb_id?: number;
    tmdb_type?: 'movie';
    type: 'movie';
};

export type TitleWithDetails = Title & {
    details?: IMDbTitle;
};


