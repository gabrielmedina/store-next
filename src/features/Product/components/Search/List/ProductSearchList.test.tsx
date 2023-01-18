import { render, screen } from '@testing-library/react'
import {
  useCartStateMock,
  useCartStateMockReturn,
} from 'test/_mocks/useCartStateMock'
import { ProductSearchList, TProductSearchListProps } from './ProductSearchList'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = ({ products }: TProductSearchListProps) => {
  return render(<ProductSearchList products={products} />)
}

describe('ProductSearchList', () => {
  beforeEach(() => {
    useCartStateMock.mockReturnValue(useCartStateMockReturn)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const products = ProductsStub
    // @ts-ignore
    makeSut({ products })

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(products.length)
  })
})
