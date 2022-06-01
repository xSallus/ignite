import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

import { SubscribeButton } from 'components/subscribe-button'
import { getDataFromCMS, getSinglePost } from 'services/datocms'
import { stripe } from 'services/stripe'

import style from 'styles/post-preview.module.scss'

type IPost = {
	title: string;
	content: {
		author: string,
		preview: string,
		full: string
	},
	id: string;
	createdAt: string;
}

type IPostPreview  = Omit<IPost, 'content'> & {
  content: Omit<IPost['content'], 'full'>,
}

interface IPreviewProps {
	post: IPostPreview;
	product: string;
}

const PreviewPost: NextPage<IPreviewProps> = ({
	post, product
}) => {
	const router = useRouter()
	const { data: session } = useSession() as any;

	return (
	 <>
		<Head>
			<title>PreviewMode | Ignews&copy;</title>
		</Head>
		<div className={style.previewContainer}>
			<h3>{post.title}</h3>
			<div>
				<p>{post.content.author}</p>
				<span>{post.createdAt}</span>
			</div>
			<p>{post.content.preview}</p>
			{!session?.user?.activeSubscription?.status ? (
			  <SubscribeButton
	  			title="Subscribe now"
			  	priceId={product}  
			  />
			) : (
  			<button
					className={style.redirectButton}
				  onClick={()=>router.push(`/posts/${post.id}`)}
				>See full post</button>
			)}
		</div>
	 </>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getDataFromCMS() as IPost[];

	return {
		paths: posts.map(post => ({ params: { slug: post.id } })),
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const product = 'price_1KalaREpxbZJDbGjkZSNnhFB'

	const slug = ctx?.params?.slug as string;
	const post = await getSinglePost(slug)

	return {
		props: { post, product },
		revalidate: 24*60*60*7
	};
}

export default PreviewPost
