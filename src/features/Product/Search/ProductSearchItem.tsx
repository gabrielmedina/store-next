import Image from 'next/image'
import { TProduct } from '../types'

type TProductSearchItemProps = {
  product: TProduct
}

export const ProductSearchItem: React.FC<TProductSearchItemProps> = ({
  ...props
}) => {
  const { product } = props

  return (
    <a href="#">
      <section>
        <header>
          <h2>{product.title}</h2>
          <p>{product.price}</p>
        </header>

        <figure>
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={500}
            height={500}
          />
        </figure>
      </section>
    </a>
  )
}
