import classNames from 'classnames'
import { useRouter } from 'next/router'
import styles from './Pagination.module.scss'

type TPaginationProps = {
  total: number
  current: number
}

export const Pagination: React.FC<TPaginationProps> = ({ total, current }) => {
  const router = useRouter()
  const items = new Array(total).fill(0)

  const onPagination = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    })
  }

  return (
    <ol className={styles.list}>
      {items.map((_, index) => {
        const page = index + 1

        return (
          <li key={index} className={styles.item}>
            <a
              href={`?page=${page}`}
              onClick={(e) => {
                e.preventDefault()
                onPagination(page)
              }}
              className={classNames(styles.link, {
                [styles.current]: index === current,
              })}
            >
              {page}
            </a>
          </li>
        )
      })}
    </ol>
  )
}
