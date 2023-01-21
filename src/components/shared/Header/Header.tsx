import Link from 'next/link'
import { ReactChild } from 'react'
import { Logo } from 'src/components'
import styles from './Header.module.scss'

export type THeaderProps = {
  nav?: ReactChild
}

export const Header: React.FC<THeaderProps> = ({ children, nav }) => {
  return (
    <header data-testid="header" className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </h1>

        {children && <div className={styles.children}>{children}</div>}

        {nav && <nav className={styles.nav}>{nav}</nav>}
      </div>
    </header>
  )
}
