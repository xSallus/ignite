import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { Stripe } from "stripe";

import { stripe } from "services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!(req.method === "POST")) {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }

  const secret = req.headers["stripe-signature"] as string;
  const buff = await buffer(req);

  let stripeEvent: Stripe.Event;

  stripeEvent = stripe.webhooks.constructEvent(buff, secret, webhookSecret);

  const eventType = stripeEvent.type;

  if (relevantEvents.has(eventType)) {
    try {
      switch (eventType) {
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = stripeEvent.data.object as Stripe.Subscription;
          await saveSubscription(
            subscription.id,
            subscription.customer.toString(),
            false
          ).catch((err) => console.log(err));
          break;
        case "checkout.session.completed":
          const checkoutSession = stripeEvent.data
            .object as Stripe.Checkout.Session;

          await saveSubscription(
            `${checkoutSession?.subscription?.toString()}`,
            `${checkoutSession?.customer?.toString()}`,
            true
          ).catch((err) => console.log(err));
          break;
        default:
          throw new Error("Unhandled event ;(");
      }
    } catch (err) {
      return res.json({
        error: "Webhook handler crashed ;(",
      });
    }
  }

  return res.json({ received: true });
}

// fake card: 4242 4242 4242 4242
