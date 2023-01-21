import Link from 'next/link'
import { Logo, Button, IconCart, Badge } from 'src/components'
import { ProductSearchForm } from 'src/features/Product/components'
import { useCartState } from 'src/features/Product/states'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const { setIsVisible, products } = useCartState()

  const productsQuantity = products.length

  return (
    <header data-testid="header" className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </h1>

        <ProductSearchForm className={styles.search} />

        <nav className={styles.nav}>
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
        </nav>
      </div>
    </header>
  )
}
