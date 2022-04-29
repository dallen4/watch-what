import { client } from '@lib/client';
import getStripe from '@lib/payments';
import { AxiosResponse } from 'axios';
import useNotification from './use-notification';

export default function useCheckout() {
    const { pushErrorMessage } = useNotification();

    const startCheckout = async () => {
        const resp: AxiosResponse<{ id: string }> = await client.post(
            '/api/checkout-sessions',
        );

        const sessionId = resp.data.id;

        const stripe = await getStripe();

        const { error } = await stripe!.redirectToCheckout({ sessionId });

        if (error) {
            console.error(error);
            pushErrorMessage('Failed to redirect to checkout page');
        }
    };

    return { startCheckout };
}
