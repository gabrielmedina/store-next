import { Button, Dialog } from 'src/components'
import { useCartState } from 'src/features/Product/states'
import { ProductCartList } from './List/ProductCartList'

export const ProductCart: React.FC = () => {
  const { products, isVisible, setIsVisible } = useCartState()

  const productsQuantity = products.length

  const subtitle = () => {
    if (productsQuantity === 0) return 'Your cart is empty'
    if (productsQuantity === 1) return 'With 1 product'
    return `With ${productsQuantity} products`
  }

  return (
    <Dialog
      open={isVisible}
      title="My cart"
      subtitle={subtitle()}
      onClose={() => setIsVisible(false)}
      footer={productsQuantity > 0 && <Button fullWidth>Go to checkout</Button>}
    >
      {<ProductCartList products={products} />}
    </Dialog>
  )
}
