import { NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { ApiRequest } from 'types/general';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
    api: {
        bodyParser: false,
    },
};

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req: ApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';

        console.log(`❌ Error message: ${errorMessage}`);

        res.status(400).send(`Webhook Error: ${errorMessage}`);
        return;
    }

    const transaction =
        event.type === 'payment_intent.succeeded'
            ? (event.data.object as Stripe.PaymentIntent)
            : event.type === 'payment_intent.payment_failed'
            ? (event.data.object as Stripe.PaymentIntent)
            : event.type === 'charge.succeeded'
            ? (event.data.object as Stripe.Charge)
            : null;

    if (!transaction) {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        res.json({ received: true });
        return;
    }

    console.log(`💰 Transaction status: ${transaction.status}`);

    const { userId } = transaction.metadata;

    await UserMetadata.updateUserMetadata(userId, {
        premium: true,
        transaction: transaction.id,
    });

    console.log(`Updated metadata for ${userId}: premium activated`);

    res.json({ received: true });
    return;
};

export default cors(webhookHandler as any);
