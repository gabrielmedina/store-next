import { Header, Footer } from '@components'

export const LayoutDefault: React.FC = ({ ...props }) => {
  const { children } = props

  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  )
}
