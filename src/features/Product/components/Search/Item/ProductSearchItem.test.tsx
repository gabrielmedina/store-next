import { act, fireEvent, render, screen } from '@testing-library/react'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import { ProductSearchItem, TProductSearchItemProps } from './ProductSearchItem'
import { formatyMoney } from 'src/utils'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = ({ product }: TProductSearchItemProps) => {
  return render(<ProductSearchItem product={product} />)
}

describe('ProductSearchItem', () => {
  beforeEach(() => {
    useCartMock.mockReturnValue(useCartMockReturn)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(formatyMoney(product.price))).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src')
  })

  it('should add product to cart when button has clicked', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    act(() => {
      fireEvent.click(screen.getByTitle(`Add ${product.name} to cart`))
    })

    expect(useCartMockReturn.addProduct).toBeCalled()
    expect(useCartMockReturn.addProduct).toHaveBeenCalledWith(product)
  })
})
