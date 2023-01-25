import { render, screen } from '@testing-library/react'
import {
  useProductCartStateMock,
  useProductCartStateMockReturn,
} from 'test/_mocks/useProductCartStateMock'
import { ProductSearchList, TProductSearchListProps } from './ProductSearchList'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = (props: TProductSearchListProps) => {
  return render(<ProductSearchList {...props} />)
}

describe('ProductSearchList', () => {
  beforeEach(() => {
    useProductCartStateMock.mockReturnValue(useProductCartStateMockReturn)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const products = ProductsStub
    // @ts-ignore
    makeSut({ products, total: products.length })

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText(/All products/)).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(products.length)
  })

  it('should render with headline', () => {
    const products = ProductsStub
    // @ts-ignore
    makeSut({ products, total: products.length, headline: 'caps' })

    expect(screen.getByText(/Search results for: caps/)).toBeInTheDocument()
  })
})
