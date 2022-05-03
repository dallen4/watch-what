/**
 * This is a singleton to ensure we only instantiate Stripe once.
 * ref: https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/utils/get-stripejs.ts
 */
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    if (!stripePromise)
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

    return stripePromise;
};

export default getStripe;
