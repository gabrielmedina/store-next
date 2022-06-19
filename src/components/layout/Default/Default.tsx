import { Header, Footer } from 'src/components'

import style from './Default.module.scss'

export const LayoutDefault: React.FC = ({ children }) => {
  return (
    <div className={style.default}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
