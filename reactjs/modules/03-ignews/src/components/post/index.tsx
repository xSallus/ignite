import style from './style.module.scss'

interface IPost {
	id: string,
	title: string,
	content: {
		author: string,
		preview: string,
		full: string
	}
}

interface IPostProps {
	post: IPost;
	toPost: (slug: string) => void;
}

export const Post = ({ post, toPost }: IPostProps) => {
	return (
		<div
			className={style.post}
			onClick={()=>toPost(post.id)}
		>
			<h1>{post.title}</h1>
			<span>{`by: ${post.content?.author}`}</span>
			<p>{post.content?.preview}</p>
		</div>
	)
}
