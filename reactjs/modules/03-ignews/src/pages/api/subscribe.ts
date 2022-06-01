import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { stripe } from 'services/stripe'
import { client, collection, index, q } from 'services/fauna'

const handler_url = `${process.env.STRIPE_HANDLER_URL}`

export default async function (
	req:NextApiRequest, 
	res:NextApiResponse
) {
	if (!(req.method === 'POST')) {
		res.setHeader('Allow', 'POST')
		return res.status(405).end('HTTP Method not allowed')
	}

	const session = await getSession({ req }) as any

	const user = await client.query(
		q.Get(
			q.Match(
				q.Index(index),
				q.Casefold(session?.user.email)
			)
		)
	) as any
	
	try {
		let customerId = user.data.stripe_customer_id

		if (!customerId) {
			const stripeCustomer = await stripe.customers.create({
				email: session?.user?.email as string,
				//metadata
			})

			await client.query(
				q.Update(
					q.Ref(
						q.Collection(collection),
						q.Casefold(session.user.id)
					),
					{ data: {
						stripe_customer_id: stripeCustomer.id 
					}}
				)
			)

			customerId = stripeCustomer.id;
		}

		const stripeCheckoutSession = await stripe.checkout.sessions.create({
			customer: customerId,
			payment_method_types: ['card'],
			billing_address_collection: 'required',
			line_items: [
				{ price: 'price_1KalaREpxbZJDbGjkZSNnhFB', quantity: 1 }
			],
			mode: 'subscription',
			allow_promotion_codes: true,
			success_url: `${handler_url}/posts`,
			cancel_url: handler_url
		})

			return res.status(200).json({ checkoutId: stripeCheckoutSession.id })
	} catch (err) { 
		console.log(err) 
	}
}
