import { SearchItem } from './SearchItem'
import { TProduct } from './types'

type TSearchProps = {
  products: Array<TProduct>
}

export const Search: React.FC<TSearchProps> = ({ ...props }) => {
  const { products } = props

  return (
    <ol>
      {products.map((product) => (
        <li key={product.id}>
          <SearchItem product={product} />
        </li>
      ))}
    </ol>
  )
}
