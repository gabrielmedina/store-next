import { render, screen } from '@testing-library/react'
import { ProductCartList, TProductCartListProps } from './ProductCartList'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = (props?: TProductCartListProps) => {
  return render(<ProductCartList {...props} />)
}

describe('ProductCartList', () => {
  it('should render correctly', () => {
    const products = ProductsStub
    // @ts-ignore
    makeSut({ products })

    expect(screen.queryByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(products.length)
  })

  it('should no render when products is not provided', () => {
    makeSut()

    expect(screen.queryByRole('list')).toBeFalsy()
  })
})
