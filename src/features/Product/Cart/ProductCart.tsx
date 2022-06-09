import { Button, Dialog } from 'src/components'
import { TProduct } from 'src/features/Product/types'
import { ProductCartList } from './List/ProductCartList'

type TProductCartProps = {
  products?: Array<TProduct>
}

export const ProductCart: React.FC<TProductCartProps> = ({ products }) => {
  return (
    <Dialog
      isOpen={true}
      title="My cart"
      subtitle="With 4 products"
      footer={
        <Button variant="primary" fullWidth>
          Go to checkout
        </Button>
      }
    >
      {products && <ProductCartList products={products} />}
    </Dialog>
  )
}
