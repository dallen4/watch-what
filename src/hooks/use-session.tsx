import { get } from '@lib/client';
import useSWR from 'swr';

export default function useSession() {
    const { data, error } = useSWR('/api/me', get);

    return {
        session: data,
        loading: !error && !data,
        error,
    };
}
