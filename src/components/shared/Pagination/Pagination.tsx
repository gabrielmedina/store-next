import { useRouter } from 'next/router'
import { Button } from '../Button/Button'
import styles from './Pagination.module.scss'

export type TPaginationProps = {
  total: number
  current: number
}

export const Pagination: React.FC<TPaginationProps> = ({ total, current }) => {
  const router = useRouter()

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
      {Array.from(Array(total)).map((_, index) => {
        const page = index + 1
        const isCurrent = index === current

        return (
          <li key={index} className={styles.item}>
            <Button
              rounded
              element="a"
              size="tiny"
              disabled={isCurrent}
              variant={isCurrent ? 'secondary' : 'primary'}
              aria-current={isCurrent ? 'page' : false}
              href={`?page=${page}`}
              onClick={(event) => {
                event.preventDefault()
                onPagination(page)
              }}
            >
              {page}
            </Button>
          </li>
        )
      })}
    </ol>
  )
}
