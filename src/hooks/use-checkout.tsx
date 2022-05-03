import { post } from '@lib/client';
import getStripe from '@lib/stripe';
import useNotification from './use-notification';

export default function useCheckout() {
    const { pushErrorMessage } = useNotification();

    const startCheckout = async () => {
        const { id: sessionId } = await post<{ id: string }>('/api/checkout-sessions');

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
