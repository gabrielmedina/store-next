import type { NextPage } from 'next'
import Head from 'next/head'
import { Footer, Header } from '@components'
import { Search } from '@features'
import { AlgoliaService } from '@services'

export async function getServerSideProps() {
  const algoliaService = new AlgoliaService('dev_store')

  const response = await algoliaService.get('')

  return {
    props: {
      products: response.hits || [],
    },
  }
}

type THomeProps = {
  products: []
}

const Home: NextPage<THomeProps> = ({ ...props }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Search products={props.products} />

      <Footer />
    </>
  )
}

export default Home
