import { Header, Footer, Button, IconCart, Badge } from 'src/components'
import { ProductSearchForm } from 'src/features/Product/components'
import { useProductCartState } from 'src/features/Product/states'

import styles from './Search.module.scss'

export const LayoutSearch: React.FC = ({ children }) => {
  const { setIsVisible, products } = useProductCartState()

  const productsQuantity = products.length

  return (
    <div className={styles.container}>
      <Header
        nav={
          <Button
            variant="secondary"
            rounded
            onClick={() => setIsVisible(true)}
            className={styles.cartButton}
          >
            <IconCart title="Open cart" />
            {productsQuantity > 0 && (
              <Badge className={styles.cartButtonCount}>
                {productsQuantity}
              </Badge>
            )}
          </Button>
        }
      >
        <ProductSearchForm />
      </Header>

      {children}

      <Footer />
    </div>
  )
}
