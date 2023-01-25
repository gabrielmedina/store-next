import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  fetchCategoryFromApollo,
  fetchProductsByCategoryFromAlgolia,
} from 'src/features/Product/api'
import { getServerSideProps } from './index.page'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/products/caps`,
    }
  },
}))

jest.mock('src/features/Product/api')

describe('ProductsByCategoryPage', () => {
  it('should call fetchProductsByCategoryFromAlgolia and fetchCategoryFromApollo in getServerSideProps', async () => {
    const context = {
      query: {
        page: '0',
        category: 'caps',
      } as ParsedUrlQuery,
    }

    await getServerSideProps(context as GetServerSidePropsContext)

    expect(fetchProductsByCategoryFromAlgolia).toBeCalledWith(context)
    expect(fetchCategoryFromApollo).toBeCalledWith(context)
  })
})
