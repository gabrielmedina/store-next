import { Button, Card, IconCart } from 'src/components'
import { TProduct } from 'src/features'
import { formatyMoney } from 'src/lib/FormatMoney'

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
        description={formatyMoney(product.price)}
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
