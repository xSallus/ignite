import Stripe from 'stripe'
import { version } from '../../package.json'
const secret = process.env.STRIPE_API_KEY as string;

export const stripe = new Stripe(
	secret,
	{
		apiVersion: '2020-08-27',
		appInfo: {
			name: 'igNews',
			version
		}
	}
)
