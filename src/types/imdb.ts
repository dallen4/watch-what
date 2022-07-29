export type TitleType = 'movie' | 'tv';

export type IMDbTitle = {
    id: number;
    type: TitleType;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    poster_path: string;
    poster?: string;
    video: boolean;
    vote_average: number;
    overview: string;
    release_date: string;
    vote_count: number;
    title?: string;
    original_name?: string;
    name?: string;
    adult: boolean;
    backdrop_path: string;
    popularity: number;

    trailer?: {
        url: string;
        official: boolean;
    };
};

export type TitleVideoType = 'Trailer' | 'Behind the Scenes' | 'Bloopers';

export type TitleVideo = {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: TitleVideoType;
    official: boolean;
    published_at: string;
};

export type VideosResponse = {
    id: number;
    results: TitleVideo[];
};

export type TitleVideoDetails = {
    title: string;
    url?: string | null;
    type: TitleVideoType;
};
