import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import { ProductCart } from './ProductCart'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = () => {
  return render(<ProductCart />)
}

describe('ProductCart', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    useCartMock.mockReturnValue(useCartMockReturn)

    makeSut()

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.queryByText('Go to checkout')).toBeFalsy()
  })

  it('should display products quantity when has one product on cart', () => {
    useCartMock.mockReturnValue({
      ...useCartMockReturn,
      cartProducts: [ProductsStub[0]],
    })

    makeSut()

    expect(screen.getByText('With 1 product')).toBeInTheDocument()
  })

  it('should display products quantity when has products on cart', () => {
    const products = ProductsStub

    useCartMock.mockReturnValue({
      ...useCartMockReturn,
      cartProducts: products,
    })

    makeSut()

    expect(
      screen.getByText(`With ${products.length} products`)
    ).toBeInTheDocument()
  })

  it('should display Go to checkout when has products on cart', () => {
    useCartMock.mockReturnValue({
      ...useCartMockReturn,
      cartProducts: ProductsStub,
    })

    makeSut()

    expect(screen.queryByText('Go to checkout')).toBeTruthy()
  })

  it('should hide Dialog when close button has clicked', async () => {
    useCartMock.mockReturnValue(useCartMockReturn)

    makeSut()

    const close = screen.getByTitle('Close')

    await waitFor(() => {
      fireEvent.click(close)
    })

    expect(useCartMockReturn.setCartIsOpen).toBeCalledWith(false)
  })
})
