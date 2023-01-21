import { Header, Footer } from 'src/components'

import styles from './Default.module.scss'

export const LayoutDefault: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
