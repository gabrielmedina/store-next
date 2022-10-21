import { render, screen } from '@testing-library/react'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import { ProductSearchList, TProductSearchListProps } from './ProductSearchList'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = ({ products }: TProductSearchListProps) => {
  return render(<ProductSearchList products={products} />)
}

describe('ProductSearchList', () => {
  beforeEach(() => {
    useCartMock.mockReturnValue(useCartMockReturn)
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
