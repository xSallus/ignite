import { FC } from 'react';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { formatDate } from '../../utils';
import { PostCardProps } from '../../@types';

import styles from './post_card.module.scss';

const Post: FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.uid}`}>
      <a className={styles['post-container']}>
        <h1>{post.data.title}</h1>
        <h3>{post.data.subtitle}</h3>
        <section>
          <div>
            <FiCalendar />
            <span>{formatDate(post.first_publication_date)}</span>
          </div>
          <div>
            <FiUser />
            <span>{post.data.author}</span>
          </div>
        </section>
      </a>
    </Link>
  );
};

export { Post };
