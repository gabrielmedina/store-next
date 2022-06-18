import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './ProductSearchForm.module.scss'

type TProductSearchFormData = {
  search: string
}

export const ProductSearchForm: React.FC<React.HTMLAttributes<any>> = ({
  ...props
}) => {
  const { register, handleSubmit } = useForm<TProductSearchFormData>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form
      name="product-search-form"
      className={styles.form}
      onSubmit={onSubmit}
      {...props}
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
      />
    </form>
  )
}
