import { NextApiResponse } from 'next';
import Stripe from 'stripe';
import { ApiRequest } from 'types/general';

// ref: https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/pages/api/checkout_sessions/%5Bid%5D.ts

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
});

export default async function handler(req: ApiRequest, res: NextApiResponse) {
    const id: string = req.query.id as string;

    try {
        if (!id.startsWith('cs_')) throw Error('Invalid ID provided.');

        const session = await stripe.checkout.sessions.retrieve(id, {
            expand: ['payment_intent'],
        });

        res.status(200).json(session);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal server error';
        res.status(500).json({ message: errorMessage });
    }
}
