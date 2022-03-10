import type { AppProps } from 'next/app'

import '../styles/globals.scss'
import '../styles/variables.css'

function StoreApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default StoreApp
