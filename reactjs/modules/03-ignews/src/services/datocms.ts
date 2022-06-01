import axios from 'axios'
const URI = "https://graphql.datocms.com/"

interface IPost {
  title: string,
  content: {
    author: string,
		preview: string,
    full: string
  },
  id: string
}

interface CMSResponse {
	data: any;
}

type ICmsData = () => Promise<IPost[]>
type ICmsSingleData = (id: string) => Promise<IPost>

const token = process.env.CMS_TOKEN

const getDataFromCMS:ICmsData = async () => {
	const query = '{ allPosts { title, content, id } }'

  const { data: { data } } = await axios.post<CMSResponse>(
    URI,
		{ query },
		{ headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
    }}
  )
  .catch(err => console.log(err)) as CMSResponse;
	const posts = data.allPosts;
	return posts
}

const getSinglePost:ICmsSingleData = async (id: string) => {
	const query = `query { post (filter: { id: { eq: "${id}" }}) {
		title
		id
		content
		createdAt
	} }`
	const { data: { data } } = await axios.post<CMSResponse>(
		URI,
		{ query },
		{ headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Authorization": `Bearer ${token}`,
		}}
	).catch(err => console.log(err)) as CMSResponse;

	return data.post
}

export { getDataFromCMS, getSinglePost };
