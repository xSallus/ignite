import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { stripe } from 'services/stripe'

import { SubscribeButton } from 'components/subscribe-button'
import styles from'styles/home.module.scss'

interface IProduct {
 priceId: string;
 amount: number;
}
interface IHomeProps {
	product: IProduct;
}

const Home: NextPage<IHomeProps> = ({ product }) => {
	const price = 4.91

  return (
		<>
			<Head>
				<title>Home | Ignews&copy;</title>
			</Head>
			<div className={styles.container}>
				<h3>Hey welcome,</h3>
				<h1>News about<p>the <span>Dev</span> world</p></h1>
				<h2>Get access to all publications<p>for {product.amount}/month</p></h2>
				<SubscribeButton
					title="Subscribe now"
					priceId={product.priceId}
				/>
			</div>
		</>
  )
}

export const getStaticProps:GetStaticProps = async (ctx) => {
	const id = 'price_1KalaREpxbZJDbGjkZSNnhFB'
	const price = await stripe.prices.retrieve(id)

	const product = {
		priceId: price.id,
		amount: new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(Number(price?.unit_amount) / 100)
	}

	return {
		props: { product },
		revalidate: 24*60*60*180
	}
}

export default Home
