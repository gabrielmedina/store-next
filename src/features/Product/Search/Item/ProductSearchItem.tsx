import Image from 'next/image'
import { Card } from 'src/components/shared/Card/Card'
import { TProduct } from 'src/features/Product/types'

type TProductSearchItemProps = {
  product: TProduct
}

export const ProductSearchItem: React.FC<TProductSearchItemProps> = ({
  product,
}) => {
  return (
    <a href="#">
      <Card
        title={product.title}
        description={product.price.toString()}
        image={product.image}
      />
    </a>
  )
}
