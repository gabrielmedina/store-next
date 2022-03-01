import Image from 'next/image'

import { TProduct } from './types'

type TProductsListingItemProps = {
  product: TProduct
}

export const ProductsListingItem: React.FC<TProductsListingItemProps> = ({
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
