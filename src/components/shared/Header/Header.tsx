import Link from 'next/link'
import { Logo, Button, IconCart, Badge } from 'src/components'
import { ProductSearchForm } from 'src/features/Product/components'
import { useCart } from 'src/features/Product/hooks'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const { cartSetIsOpen, cartProductsQuantity } = useCart()

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
            onClick={() => cartSetIsOpen(true)}
            className={styles.cartButton}
          >
            <IconCart title="Open cart" />
            {cartProductsQuantity > 0 && (
              <Badge className={styles.cartButtonCount}>
                {cartProductsQuantity}
              </Badge>
            )}
          </Button>
        </nav>
      </div>
    </header>
  )
}
