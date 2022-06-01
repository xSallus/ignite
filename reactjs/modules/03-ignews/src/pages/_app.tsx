import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { Header } from 'components/header'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
		<SessionProvider session={session}>
			<Header title="ig.News" />
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default MyApp
