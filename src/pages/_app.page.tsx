import App, { AppContext, AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { getApolloClient } from 'src/libs'

import '../styles/globals.scss'
import '../styles/variables.css'

function StoreApp({ Component, pageProps }: AppProps) {
  const apolloClient = getApolloClient()

  return (
    <>
      <NextNProgress color="#13171a" />
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ApolloProvider>
    </>
  )
}

StoreApp.getInitialProps = async (appContext: AppContext) => {
  const pageProps = await App.getInitialProps(appContext)

  return {
    ...pageProps,
  }
}

export default StoreApp
