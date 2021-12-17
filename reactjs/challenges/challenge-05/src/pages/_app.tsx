import type { AppProps } from 'next/app'
import { ChakraProvider, theme } from '../styles/chakra'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
