/* eslint-disable no-console */
import { useEffect, MouseEventHandler } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Prismic from "@prismicio/client";

import { Post } from '../components/PostCard';
import { usePosts } from '../contexts/Posts'; 
import { getPrismicClient } from '../services/prismic';
import { HomeProps } from '../@types';

import styles from './home.module.scss';

const Home: NextPage<HomeProps> = ({ postsPagination }) => {
  const { posts, setPosts } = usePosts();

  const loadMorePosts: MouseEventHandler<HTMLButtonElement> = async () => {
    const { next_page } = postsPagination;
    await fetch(next_page)
      .then(res => res.json())
      .then(({ results }) => {
        const updatedPosts = results.map(post => {
          return {
            data: {
              title: post.data.title,
              subtitle: post.data.subtitle,
              author: post.data.author,
            },
            uid: post.uid,
            first_publication_date: post.first_publication_date,
          };
        });
        const allPosts = [...posts, ...updatedPosts];
        setPosts(allPosts);
      });
  };

  useEffect(() => {
    const { results } = postsPagination;
    setPosts([...results]);
  }, []);

  return (
    <main className={styles['content-container']}>
      {posts.map(post => (
        <Post key={post.uid} post={post} />
      ))}
      {postsPagination.next_page && (
        <button type="button" onClick={loadMorePosts}>
          Carregar mais posts
        </button>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(Prismic.Predicates.at('document.type', 'post'));
  const posts = postsResponse.results.map(post => {
    return {
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      uid: post.uid,
      first_publication_date: post.first_publication_date,
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
  };
};

export default Home;
