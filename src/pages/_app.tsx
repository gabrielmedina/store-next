import '../styles/globals.css'
import type { AppProps } from 'next/app'

function StoreApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default StoreApp
