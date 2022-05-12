export type IMDbTitle = {
    id: number;
    type: 'movie' | 'tv';
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
