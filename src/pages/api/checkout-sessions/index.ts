import Stripe from 'stripe';
import { getUserById } from 'supertokens-node/recipe/passwordless';
import { ApiRequest, ApiResponse } from 'types/general';
import { init } from 'api/auth';
import { auth } from 'api/middleware/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
});

init();

async function startCheckoutSession(req: ApiRequest, res: ApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    const userId = req.session!.getUserId();
    const user = await getUserById({ userId });

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
            customer_email: user?.email,
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

export default auth(startCheckoutSession, true);
