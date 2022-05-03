import { client } from '@lib/client';
import getStripe from '@lib/stripe';
import { AxiosResponse } from 'axios';
import useNotification from './use-notification';

export default function useCheckout() {
    const { pushErrorMessage } = useNotification();

    const startCheckout = async () => {
        const resp: AxiosResponse<{ id: string }> = await client.post(
            '/api/checkout-sessions',
        );

        const sessionId = resp.data.id;

        try {
            const stripe = await getStripe();

            const { error } = await stripe!.redirectToCheckout({ sessionId });

            if (error) throw error;
        } catch (err) {
            console.error(err);
            pushErrorMessage('Failed to redirect to checkout page');
        }
    };

    return { startCheckout };
}
