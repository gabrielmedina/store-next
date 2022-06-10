import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import '../styles/globals.scss'
import '../styles/variables.css'

function StoreApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default StoreApp
