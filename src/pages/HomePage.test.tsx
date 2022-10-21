import { render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
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

const makeSut = ({
  products,
  loading = false,
  pages = {
    total: 1,
    current: 0,
  },
}: TPageHomeProps) => {
  return render(
    <HomePage products={products} pages={pages} loading={loading} />
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    useCartMock.mockReturnValue(useCartMockReturn)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut({
      products: {
        total: ProductsStub.length,
        // @ts-ignore
        data: ProductsStub,
      },
    })

    expect(screen.getByTestId('product-search-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('product-search-list-item')).toHaveLength(
      ProductsStub.length
    )
  })

  it('should display empty message when product list is empty', () => {
    // @ts-ignore
    makeSut({
      products: {
        total: 0,
        data: [],
      },
    })

    expect(screen.getByText('Ops! No results found.'))
  })

  it('should call algoliasearch search with ""', () => {
    getServerSideProps({} as GetServerSidePropsContext)

    expect(searchMethodMock).toBeCalledWith('', { page: 0 })
  })

  it('should call algoliasearch search with term when has search query', () => {
    const term = 'rolex'
    const context = {
      query: { search: term } as ParsedUrlQuery,
    }

    getServerSideProps(context as GetServerSidePropsContext)

    expect(searchMethodMock).toBeCalledWith(term, { page: 0 })
  })
})

it('should call algoliasearch search with page when has page query', () => {
  const page = '2'
  const context = {
    query: { page } as ParsedUrlQuery,
  }

  getServerSideProps(context as GetServerSidePropsContext)

  expect(searchMethodMock).toBeCalledWith('', { page: 1 })
})
