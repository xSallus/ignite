import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import { Post } from 'components/post'
import { getDataFromCMS } from 'services/datocms'

import style from 'styles/posts.module.scss'

interface IPost {
	id: string,
	title: string,
	content: {
		author: string,
		preview: string,
		full: string
	}
}


interface IPostsResponse { post: IPost }

type IPosts = {
	posts: IPost[];
}

const Posts:NextPage<IPosts> = ({ posts }) => {
  const router = useRouter()

	function goToPost(slug: string) {
		router.push(`/posts/${slug}`)
	}

	return (
		<>
			<Head>
				<title>Posts | Ignews&copy;</title>
			</Head>
			<div className={style.posts}>
				<>{
					posts.length > 0 ?
					posts.map((post) => (
						<Post
							post={post}
							toPost={goToPost}
							key={post?.id}
						/>
					)) :
					<h1>No post yet <span>:D</span></h1>
				}</>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const posts = await getDataFromCMS() as IPost[]

	//const session = await getSession(ctx)

	return ({
		props: { posts }
	})
}

export default Posts;
