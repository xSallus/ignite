import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'

import { getDataFromCMS, getSinglePost } from 'services/datocms'
import style from 'styles/post-full.module.scss'

interface IPost {
	title: string;
	content: {
		author: string,
		preview: string,
		full: string
	},
	id: string;
	createdAt: string;
}

interface IPostFullProps {
	post: IPost;
}

const FullPost: NextPage<IPostFullProps> = ({ post }) => {
	return (
	 <>
		<Head>
			<title>Post | Ignews&copy;</title>
		</Head>
		<div className={style.container}>
			<h3>{post.title}</h3>
			<div>
				<p>{post.content.author}</p>
				<span>{post.createdAt}</span>
			</div>
			<p>{post.content.full}</p>
		</div>
	 </>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const slug = ctx?.params?.slug as string;
	const session = await getSession(ctx) as any;

	if(session?.user?.activeSubscription?.status) {
		return {
			redirect: {
				destination: `/posts/${slug}/preview`,
				permanent: false
			}
		}
	}

	const post = await getSinglePost(slug)

	return {
		props: { post: {
			...post,
			content: {
				...post.content,
				full: post.content.full.replaceAll('\n', '<br/>')
			}
		}, canRedirect: false }
	};
}

export default FullPost
