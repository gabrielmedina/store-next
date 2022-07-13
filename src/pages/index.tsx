import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ProductCart, ProductSearchList, StateSearchItems } from 'src/features'
import { Container, LayoutDefault } from 'src/components'
import { getAlgoliaClient } from 'src/lib'
import { Product } from 'src/graphql'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const getServerSideProps: GetServerSideProps = async () => {
  const algoliaClient = getAlgoliaClient({
    index: 'dev_store',
  })

  const { hits } = await algoliaClient.search('')

  return {
    props: {
      loading: false,
      products: hits,
    },
  }
}

type TPageHomeProps = {
  loading?: boolean
  products: Array<Product>
}

const Home: NextPage<TPageHomeProps> = ({ loading, products }) => {
  const [searchItems, setSearchItems] = useRecoilState(StateSearchItems)

  useEffect(() => {
    setSearchItems(products)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Store | The best of New York</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <LayoutDefault>
        {!loading && (
          <Container>
            <ProductSearchList products={searchItems} />
          </Container>
        )}
      </LayoutDefault>

      <ProductCart />
    </>
  )
}

export default Home
