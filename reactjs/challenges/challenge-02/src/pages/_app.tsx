import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { MoviesProvider } from 'contexts/movies';

import 'styles/global.scss';

const client = new QueryClient()
function MyApp({ Component, ...pageProps }: AppProps<any>) {
  return (
		<QueryClientProvider client={client}>
		  <MoviesProvider>
				<Head>
					<title>igFlix</title>
				</Head>
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false} />
			</MoviesProvider>
		</QueryClientProvider>
	)
}

export default MyApp
