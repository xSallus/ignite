import { useState, useContext, createContext } from 'react';
import { PostsContextData, ProviderProps, PostPreview } from '../@types';

const PostsContext = createContext({} as PostsContextData);

const PostsProvider = ({ children }: ProviderProps) => {

  const [posts, setPosts] = useState<PostPreview[]>([]);

  return (
    <PostsContext.Provider value={{
      posts,
      setPosts
    }}>
      {children}
    </PostsContext.Provider>
  )
}

const usePosts = () => {
  return useContext(PostsContext);
}

export { PostsProvider, usePosts }
