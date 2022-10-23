import App, { AppContext, AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { getApolloClient } from 'src/libs'

import '../styles/globals.scss'
import '../styles/variables.css'

function StoreApp({ Component, pageProps }: AppProps) {
  const apolloClient = getApolloClient()

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ApolloProvider>
  )
}

StoreApp.getInitialProps = async (appContext: AppContext) => {
  const pageProps = await App.getInitialProps(appContext)

  return {
    ...pageProps,
  }
}

export default StoreApp
