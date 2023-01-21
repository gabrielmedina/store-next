import { fireEvent, render, screen } from '@testing-library/react'
import {
  useCartStateMock,
  useCartStateMockReturn,
} from 'test/_mocks/useCartStateMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { formatyMoney } from 'src/utils'
import { ProductDetail, TProductDetailProps } from './ProductDetail'

const makeSut = ({ product }: TProductDetailProps) => {
  return render(<ProductDetail product={product} />)
}

describe('ProductDetail', () => {
  beforeEach(() => {
    useCartStateMock.mockReturnValue(useCartStateMockReturn)
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

    expect(useCartStateMockReturn.addProduct).toHaveBeenCalledWith(product)
  })

  it('should open the cart when user click in Add to cart', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    fireEvent.click(screen.getByText('Add to cart'))

    expect(useCartStateMockReturn.addProduct).toHaveBeenCalledWith(product)
  })
})
