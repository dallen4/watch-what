import { useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { post } from '@lib/client';
import { SearchInput, SearchResult, SortBy, TitleWithDetails } from 'types/general';
import { TITLES_PAGE_SIZE } from 'api/data/watchmode';

export type UseSearchInput = Omit<SearchInput, 'sort_by'> & {
    sort: {
        field: string;
        order: 'asc' | 'desc';
    };
};

const fetcher = async (path: string, args: SearchInput) => {
    if (args.sources.length === 0 || args.genres.length === 0) return { titles: [] };

    const data = await post<SearchResult>(path, args);

    return data;
};

export default function useSearch(options: UseSearchInput) {
    const { query, sources, types, genres, sort } = options;

    const [loadingMore, setLoadingMore] = useState(false);

    const input: SearchInput = useMemo(() => {
        const { field, order } = sort;

        const sortKey = field.toLowerCase().replace(/ /g, '_') + '_' + order;
        const titleTypes = types.map((type) =>
            type.toLowerCase().replace(/ /g, '_').replace(/\-/g, ''),
        );

        return {
            sources: sources.sort(),
            types: titleTypes.sort(),
            genres: genres.sort(),
            sort_by: sortKey as SortBy,
        };
    }, [sources, genres, sort]);

    const { data, error, setSize } = useSWRInfinite((index, prev) => {
        if (prev && prev.length < TITLES_PAGE_SIZE) return null;

        return ['/api/search', { ...input, page: index + 1 }];
    }, fetcher);

    const loadMore = async () => {
        setLoadingMore(true);
        await setSize(size => ++size);
        setLoadingMore(false);
    };

    const titles: TitleWithDetails[] =
        data?.reduce((agg, curr) => [...agg, ...curr.titles], [] as TitleWithDetails[]) ??
        [];

    const canLoadMore = data && data[data.length - 1].titles.length === TITLES_PAGE_SIZE;

    return {
        titles,
        loading: !data && !error,
        loadMore,
        canLoadMore,
        loadingMore,
        error,
    };
}
