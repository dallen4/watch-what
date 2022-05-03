import useSWR from 'swr';

const get = async (path: string) => {
    const res = await fetch(path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    return data;
};

export default function useSession() {
    const { data, error } = useSWR('/api/me', get);

    return {
        session: data,
        loading: !error && !data,
        error,
    };
}
