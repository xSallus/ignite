import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface PostPreview {
  data: {
    author: string;
    subtitle: string;
    title: string;
  };
  first_publication_date: string;
  uid: string;
}

export interface PostPagination {
  next_page: string | null;
  results: PostPreview[];
}

export interface HomeProps {
  postsPagination: PostPagination;
}

export interface FullPost {
  uid: string;
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: Record<string, unknown>[];
    }[];
  };
}

export interface PostCardProps {
  post: PostPreview;
}

export interface PostProps {
  post: FullPost;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface PostsContextData {
  posts: PostPreview[];
  setPosts: Dispatch<SetStateAction<PostPreview[]>>;
}
