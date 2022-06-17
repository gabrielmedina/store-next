import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ProductCartItem, TProductCartItemProps } from './ProductCartItem'
import { formatyMoney } from 'src/lib'
import products from 'test/_stubs/product.json'

const makeSut = (props?: TProductCartItemProps) => {
  const { container } = render(<ProductCartItem {...props} />)

  return {
    container,
  }
}

describe('ProductCartItem', () => {
  it('should render correctly', () => {
    const product = products[0]
    const { container } = makeSut({ product })

    expect(container).toBeDefined()
    expect(screen.getByTestId('item')).toBeInTheDocument()
    expect(screen.getByText(product.title)).toBeInTheDocument()
    expect(screen.getByText(formatyMoney(product.price))).toBeInTheDocument()
    expect(screen.getByTestId('count').textContent).toEqual('1')
  })

  it('should no render when product is not provided', () => {
    makeSut()

    expect(screen.queryByTestId('item')).toBeFalsy()
  })

  it('should increase count when add button has clicked', async () => {
    const product = products[0]
    makeSut({ product })

    const count = screen.getByTestId('count')

    fireEvent.click(screen.getByTitle('Add'))
    await waitFor(() => count)
    expect(count.textContent).toEqual('2')
  })

  it('should decrease count when remove button has clicked', async () => {
    const product = products[0]
    makeSut({ product })

    const count = screen.getByTestId('count')

    fireEvent.click(screen.getByTitle('Add'))
    await waitFor(() => count)
    expect(count.textContent).toEqual('2')

    fireEvent.click(screen.getByTitle('Remove'))
    await waitFor(() => count)
    expect(count.textContent).toEqual('1')
  })

  it('should not decrease count when value is 1', async () => {
    const product = products[0]
    makeSut({ product })

    const count = screen.getByTestId('count')

    fireEvent.click(screen.getByTitle('Remove'))
    await waitFor(() => count)
    expect(count.textContent).toEqual('1')
  })
})
