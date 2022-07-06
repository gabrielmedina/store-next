import classNames from 'classnames'
import Link from 'next/link'
import styles from './Breadcrumb.module.scss'

export type TBreadcrumbProps = {
  items: Array<TBreadcrumbItem>
}

type TBreadcrumbItem = {
  title: string
  path: string
  isCurrent?: boolean
}

export const Breadcrumb: React.FC<TBreadcrumbProps> = ({ items }) => {
  if (items?.length === 0) return null

  return (
    <ol className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          <Link href={item.path}>
            <a
              className={classNames(styles.link, {
                [styles.current]: item.isCurrent,
              })}
            >
              {item.title}
            </a>
          </Link>
        </li>
      ))}
    </ol>
  )
}
