import { act, fireEvent, render, screen } from '@testing-library/react'
import { ProductCartItem, TProductCartItemProps } from './ProductCartItem'
import { formatyMoney } from 'src/utils'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = (props?: TProductCartItemProps) => {
  return render(<ProductCartItem {...props} />)
}

describe('ProductCartItem', () => {
  it('should render correctly', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    const { container } = makeSut({ product })

    expect(container).toBeDefined()
    expect(screen.getByTestId('item')).toBeInTheDocument()
    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(formatyMoney(product.price))).toBeInTheDocument()
    expect(screen.getByTestId('count').textContent).toEqual('1')
  })

  it('should no render when product is not provided', () => {
    makeSut()

    expect(screen.queryByTestId('item')).toBeFalsy()
  })

  it('should increase count when add button has clicked', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    const count = screen.getByTestId('count')

    act(() => {
      fireEvent.click(screen.getByTitle('Increase'))
    })

    expect(count.textContent).toEqual('2')
  })

  it('should decrease count when remove button has clicked', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    const count = screen.getByTestId('count')

    act(() => {
      fireEvent.click(screen.getByTitle('Increase'))
    })

    expect(count.textContent).toEqual('2')

    act(() => {
      fireEvent.click(screen.getByTitle('Decrease'))
    })

    expect(count.textContent).toEqual('1')
  })

  it('should not decrease count when value is 1', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product })

    const count = screen.getByTestId('count')

    act(() => {
      fireEvent.click(screen.getByTitle('Decrease'))
    })

    expect(count.textContent).toEqual('1')
  })
})
