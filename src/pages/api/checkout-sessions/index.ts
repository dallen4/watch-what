import { NextApiResponse } from 'next';
import { Response } from 'express';
import Stripe from 'stripe';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { ApiRequest } from 'types/general';
import supertokens from 'supertokens-node';
import { backendConfig } from '@config/auth/backend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
});

supertokens.init(backendConfig());

export default async function handler(req: ApiRequest, res: NextApiResponse & Response) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    await superTokensNextWrapper(
        async (next) => {
            return await verifySession()(req, res, next);
        },
        req,
        res,
    );

    const userId = req.session!.getUserId();

    try {
        // create Checkout Session
        const params: Stripe.Checkout.SessionCreateParams = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID!,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
            success_url: `${req.headers.origin}/premium/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/premium/result`,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);

        res.status(200).json(checkoutSession);
    } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'Internal server error';
        res.status(500).json({ message: errorMessage });
    }
}
