import { Category } from 'src/graphql'
import styles from './ProductSearchHeadline.module.scss'

export type TProductSearchHeadline = {
  category: Category
}

export const ProductSearchHeadline: React.FC<TProductSearchHeadline> = ({
  category,
}) => {
  return (
    <header>
      <h1 className={styles.title}>The best {category.name}</h1>
      <p className={styles.description}>{category.description}</p>
    </header>
  )
}
