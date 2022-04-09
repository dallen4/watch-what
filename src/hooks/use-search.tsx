import { useMemo } from 'react';
import useSWR from 'swr';
import { SearchInput, SearchResult, SortBy } from 'types/general';

export type UseSearchInput = Omit<SearchInput, 'sort_by'> & {
    sort: {
        field: string;
        order: 'asc' | 'desc';
    };
};

const fetcher = async (path: string, args: SearchInput) => {
    if (args.sources.length === 0 || args.genres.length === 0) return { titles: [] };

    const res = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    });

    const data: SearchResult = await res.json();

    return data;
};

export default function useSearch(options: UseSearchInput) {
    const { query, sources, types, genres, sort } = options;

    const input: SearchInput = useMemo(() => {
        const { field, order } = sort;

        const sortKey = field.toLowerCase().replace(/ /g, '_') + '_' + order;
        const titleTypes = types.map((type) =>
            type.toLowerCase().replace(/ /g, '_').replace(/\-/g, ''),
        );

        return {
            sources,
            types: titleTypes,
            genres,
            sort_by: sortKey as SortBy,
        };
    }, [sources, genres, sort]);

    const { data, error } = useSWR(['/api/search', input], fetcher);

    console.log(data);

    const titles = data?.titles ?? [];

    return {
        titles,
        loading: !data && !error,
        error,
    };
}
