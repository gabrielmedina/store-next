import { Header, Footer } from '@components'

import style from './Default.module.scss'

export const LayoutDefault: React.FC = ({ ...props }) => {
  const { children } = props

  return (
    <div className={style.default}>
      <Header />

      {children}

      <Footer />
    </div>
  )
}
