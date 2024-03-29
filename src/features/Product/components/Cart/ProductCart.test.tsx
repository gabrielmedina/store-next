import { fireEvent, render, screen, act, waitFor } from '@testing-library/react'
import {
  useProductCartStateMock,
  useProductCartStateMockReturn,
} from 'test/_mocks/useProductCartStateMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { ProductCart } from './ProductCart'

const makeSut = () => {
  return render(<ProductCart />)
}

describe('ProductCart', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    useProductCartStateMock.mockReturnValue(useProductCartStateMockReturn)

    makeSut()

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.queryByText('Go to checkout')).toBeFalsy()
  })

  it('should display products quantity when has one product on cart', () => {
    const products = [ProductsStub[0]]

    useProductCartStateMock.mockReturnValue({
      ...useProductCartStateMockReturn,
      products: products,
    })

    makeSut()

    expect(screen.getByText('With 1 product')).toBeInTheDocument()
  })

  it('should display products quantity when has products on cart', async () => {
    const products = ProductsStub

    useProductCartStateMock.mockReturnValue({
      ...useProductCartStateMockReturn,
      products: products,
    })

    makeSut()

    await waitFor(() =>
      expect(
        screen.getByText(`With ${products.length} products`)
      ).toBeInTheDocument()
    )
  })

  it('should display Go to checkout when has products on cart', () => {
    const products = ProductsStub

    useProductCartStateMock.mockReturnValue({
      ...useProductCartStateMockReturn,
      products: products,
    })

    makeSut()

    expect(screen.queryByText('Go to checkout')).toBeTruthy()
  })

  it('should hide Dialog when close button has clicked', () => {
    useProductCartStateMock.mockReturnValue({
      ...useProductCartStateMockReturn,
      isVisible: true,
    })

    makeSut()

    act(() => {
      const close = screen.getByTitle('Close')
      fireEvent.click(close)
    })

    expect(useProductCartStateMockReturn.setIsVisible).toBeCalledWith(false)
  })
})
