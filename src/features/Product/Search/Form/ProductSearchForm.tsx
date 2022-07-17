import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { debounce } from 'lodash'
import styles from './ProductSearchForm.module.scss'

type TProductSearchFormData = {
  search: string
}

export const ProductSearchForm: React.FC<
  React.HTMLAttributes<HTMLFormElement>
> = ({ ...props }) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<TProductSearchFormData>()

  const onSubmit = async ({ search }: TProductSearchFormData) => {
    router.push({
      pathname: '/',
      query: { search },
    })
  }

  const onChange = debounce(onSubmit, 300)

  return (
    <form
      name="product-search-form"
      className={styles.form}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className={styles.label} htmlFor="search">
        Search
      </label>
      <input
        className={styles.input}
        type="search"
        id="search"
        placeholder="What are you searching for?"
        {...register('search')}
        onChange={(e) => onChange({ search: e.target.value })}
      />
    </form>
  )
}
