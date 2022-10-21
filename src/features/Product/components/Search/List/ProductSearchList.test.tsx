import { render, screen } from '@testing-library/react'
import { ProductSearchList, TProductSearchListProps } from './ProductSearchList'
import { StateCartItems } from 'src/features/Product'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { RecoilMock } from 'test/_mocks/RecoilMock'

const onRecoilChange = jest.fn()

const makeSut = ({ products }: TProductSearchListProps) => {
  return render(
    <RecoilMock node={StateCartItems} onChange={onRecoilChange}>
      <ProductSearchList products={products} />
    </RecoilMock>
  )
}

describe('ProductSearchList', () => {
  it('should render correctly', () => {
    const products = ProductsStub
    // @ts-ignore
    makeSut({ products })

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(products.length)
  })
})
