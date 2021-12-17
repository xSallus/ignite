import { AppProps } from 'next/app';
import { PostsProvider } from '../contexts/Posts';
import { Header } from '../components/Header';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PostsProvider>
      <Header />
      <Component {...pageProps} />
    </PostsProvider>
  );
}

export default MyApp;
