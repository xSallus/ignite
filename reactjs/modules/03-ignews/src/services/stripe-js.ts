import { loadStripe } from '@stripe/stripe-js'

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
export async function getStripeJS() {
	const stripeJs = await loadStripe(key)

	return stripeJs;
}
