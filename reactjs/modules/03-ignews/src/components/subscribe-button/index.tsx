import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from 'services/api'
import { getStripeJS } from 'services/stripe-js'
import style from './style.module.scss'

interface IButtonProps {
	title: string;
	priceId: string;
}
export const SubscribeButton = ({ title, priceId }: IButtonProps) => {
	const router = useRouter()
	const { data: session } = useSession() as any

	async function handleSubscribe() {
		if(!session) {
			signIn('github')
			return;
		}

		if (session?.user?.activeSubscription) {
			router.push('/posts')
			return;
		}

		// ciracao da checkout session
		try {
			const { data } = await api.post('/subscribe')
			const stripe = await getStripeJS()
			await stripe?.redirectToCheckout({ sessionId: data.checkoutId })
		} catch(err) {
			console.log(err);
		}
		
	}

	return (
		<button
			className={style.subscribe}
			onClick={handleSubscribe}
		>
	   { title }
		</button>
	)
}
