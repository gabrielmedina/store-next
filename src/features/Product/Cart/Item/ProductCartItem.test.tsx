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
    expect(screen.getByText(product.title)).toBeInTheDocument()
    expect(screen.getByText(formatyMoney(product.price))).toBeInTheDocument()
    expect(screen.getByTestId('count').textContent).toEqual('1')
  })

  it('should increase count when add button has clicked', async () => {
    const product = products[0]
    makeSut({ product })

    fireEvent.click(screen.getByTitle('Add'))

    await waitFor(() => screen.getByTestId('count'))

    expect(screen.getByTestId('count').textContent).toEqual('2')
  })
})
