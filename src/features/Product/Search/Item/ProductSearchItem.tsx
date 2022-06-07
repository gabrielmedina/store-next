import { Button, Card, IconCart } from 'src/components'
import { TProduct } from 'src/features'

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
        cta={
          <Button onClick={() => alert('add to cart')}>
            <IconCart />
          </Button>
        }
      />
    </a>
  )
}
