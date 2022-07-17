import { render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { StateCartItems } from 'src/features'
import { RecoilMock, TRecoilMockProps } from 'test/_mocks/RecoilMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import HomePage, { getServerSideProps, TPageHomeProps } from './index.page'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/`,
    }
  },
}))

const searchMethodMock = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    hits: [],
  })
})

const indexMock = jest.fn(() => ({
  search: searchMethodMock,
}))

jest.mock('algoliasearch', () => {
  return jest.fn().mockImplementation(() => {
    return {
      initIndex: indexMock,
    }
  })
})

const onRecoilChange = jest.fn()

const makeSut = ({
  products,
  loading = false,
}: TRecoilMockProps & TPageHomeProps) => {
  return render(
    <RecoilMock node={StateCartItems} onChange={onRecoilChange}>
      <HomePage products={products} loading={loading} />
    </RecoilMock>
  )
}

describe('HomePage', () => {
  it('should render correctly', () => {
    makeSut({
      // @ts-ignore
      products: ProductsStub,
    })

    expect(screen.getByTestId('product-search-list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(ProductsStub.length)
  })

  it('should display empty message when product list is empty', () => {
    // @ts-ignore
    makeSut({ products: [] })

    expect(screen.getByText('Ops! Product list is empty.'))
  })

  it('should call algoliasearch search with ""', () => {
    getServerSideProps({} as GetServerSidePropsContext)

    expect(searchMethodMock).toBeCalledWith('')
  })

  it('should call algoliasearch search with term when has search query', () => {
    const term = 'rolex'
    const context = {
      query: { search: term } as ParsedUrlQuery,
    }

    getServerSideProps(context as GetServerSidePropsContext)

    expect(searchMethodMock).toBeCalledWith(term)
  })
})
