import { client, q } from 'services/fauna'
import { stripe } from 'services/stripe'

export async function saveSubscription (
	subscriptionId: string,
	customerId: string,
	createAction = false
) {
	try {
		const userRef = await client.query(
			q.Select(
				"ref",
				q.Get(
					q.Match(
						q.Index('user_by_customer_id'),
						customerId
					)
				)
			)
		)

		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId
		)

		const subsData = {
			id: subscriptionId,
			userId: userRef,
			status: subscription.status,
			price_id: subscription.items.data[0].price.id,
		}

		console.log('SubsData: ', subsData)

		if (createAction) {
			await client.query(
				q.Create(
					q.Collection('Subscriptions'),
					{ data: subsData }
				)
			)
		} else {
			await client.query(
				q.Replace(
					q.Select(
						'ref',
						q.Get(
							q.Match(
								q.Index('subscription_by_id'),
								subscriptionId
							)
						)
					),
					{ data: subsData }
				)
			)
		}
	} catch (err) {
		throw err;
	}
}
