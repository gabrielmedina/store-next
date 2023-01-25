import { Category } from 'src/graphql'
import styles from './ProductSearchHeadline.module.scss'

export type TProductSearchHeadlineProps = {
  category: Category
}

export const ProductSearchHeadline: React.FC<TProductSearchHeadlineProps> = ({
  category,
}) => {
  return (
    <header>
      <h1 className={styles.title}>{category.name}</h1>
      <p className={styles.description}>{category.description}</p>
    </header>
  )
}
