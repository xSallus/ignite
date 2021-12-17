/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-danger */
import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import Prismic from "@prismicio/client";
import ReactUtterences from 'react-utterances'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { usePosts } from '../../contexts/Posts';
import { getReadTime, formatDate, formatUpdateDate } from '../../utils';
import { getPrismicClient } from '../../services/prismic';
import { PostProps, FullPost } from '../../@types';
import styles from './post.module.scss';

interface PaginationData {
  uid: string;
  title: string;
}

interface PostPagination {
  next_post: PaginationData | null;
  prev_post: PaginationData | null;
}

const repo = 'xSallus/ignite-desafio-04'
const Post: NextPage<PostProps> = ({ post }) => {
  const { isFallback } = useRouter();
  const { posts } = usePosts();

  const [pagination, setPagination] = useState<PostPagination>({
    prev_post: null,
    next_post: null,
  });

  const setPostsPagination = () => {
    const { uid } = post;
    const index = posts.findIndex(item => item.uid === uid);

    let paginated = {
      prev_post: null,
      next_post: null,
    }

    if (index < 0)  {
      setPagination(paginated);
      return;
    }

    if (index == 0) {
      paginated = {
        prev_post: null,
        next_post: {
          uid: posts[1]?.uid,
          title: posts[1]?.data.title,
        },
      };
      setPagination(paginated);
      return;
    }

    
    paginated = {
      prev_post: {
        uid: posts[index - 1]?.uid,
        title: posts[index - 1]?.data.title,
      },
      next_post: {
        uid: posts[index + 1]?.uid,
        title: posts[index + 1]?.data.title,
      },
    };

    setPagination(paginated);
  }



  useEffect(() => {
    setPostsPagination();
  }, []);

  return (
    <>
      {!isFallback ? (
        <>
          <div
            className={styles['post-banner']}
            style={{
              backgroundImage: `url('${post.data.banner.url ?? 'https://picsum.photos/1480/720'
                }')`,
            }}
          />
          <main className={styles['post-container']}>
            <h1>{post.data.title}</h1>
            <section>
              <div>
                <FiCalendar />
                <span>{formatDate(post.first_publication_date)}</span>
              </div>
              <div>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
              <div>
                <FiClock />
                <span>{`${getReadTime(post)} min`}</span>
              </div>
            </section>
            <p>{`*atualizado em ${formatUpdateDate(post.last_publication_date)}`}</p>
            <article>
              {post.data.content.map(content => (
                <div key={content.heading}>
                  <h3>{content.heading}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(content.body)
                        .replace(/\<br \/\>/g, '')
                        .replace(/\<br \>/g, ''),
                    }}
                  />
                </div>
              ))}
            </article>
            <footer>
              {pagination.prev_post && (
                <Link href={`/post/${pagination.prev_post.uid}`}>
                  <a>
                    <h3>{pagination.prev_post.title}</h3>
                    <p>Post anterior</p>
                  </a>
                </Link>
              )}

              {pagination.next_post && (
                <Link href={`/post/${pagination.next_post.uid}`}>
                  <a>
                    <h3>{pagination.next_post.title}</h3>
                    <p>Proximo Post</p>
                  </a>
                </Link>
              )}
            </footer>
            <section>
              <ReactUtterences repo={repo} type={'url'} />
            </section>
          </main>
        </>
      ) : (
        <h2>Carregando...</h2>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query(Prismic.Predicates.at('document.type', 'post'));

  const slugs = results.map(post => ({
    params: {
      slug: post.uid,
    }
  }));

  return {
    paths: slugs ?? [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params.slug?.toString() ?? (params.slug as string);

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', uid, {});
  const post: FullPost = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(section => ({
        heading: section.heading,
        body: section.body,
      })),
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 5,
  };
};

export default Post;
