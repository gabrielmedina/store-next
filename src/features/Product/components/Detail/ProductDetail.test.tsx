import { fireEvent, render, screen } from '@testing-library/react'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import { ProductDetail, TProductDetailProps } from './ProductDetail'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { formatyMoney } from 'src/utils'

const makeSut = ({ product }: TProductDetailProps) => {
  return render(<ProductDetail product={product} />)
}

describe('ProductDetail', () => {
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

    expect(screen.queryByTestId('product-detail')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      product.name
    )
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(screen.getByText(formatyMoney(product.price))).toBeInTheDocument()
    expect(screen.getByText('Add to cart')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should no render when product is not provided', () => {
    // @ts-ignore
    makeSut({ product: null })

    expect(screen.queryByTestId('product-detail')).not.toBeInTheDocument()
  })

  it('should add product to cart when user click in Add to cart', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    fireEvent.click(screen.getByText('Add to cart'))

    expect(useCartMockReturn.cartAddProduct).toHaveBeenCalledWith(product)
  })

  it('should open the cart when user click in Add to cart', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    fireEvent.click(screen.getByText('Add to cart'))

    expect(useCartMockReturn.cartAddProduct).toHaveBeenCalledWith(product)
  })
})
