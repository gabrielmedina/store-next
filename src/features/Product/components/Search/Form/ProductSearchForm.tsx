import React, { FormEvent, HTMLAttributes, useRef } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import styles from './ProductSearchForm.module.scss'

type TProductSearchFormProps = HTMLAttributes<HTMLFormElement>

export const ProductSearchForm: React.FC<TProductSearchFormProps> = ({
  ...props
}) => {
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (event: FormEvent<EventTarget>) => {
    event.preventDefault()
    const search = searchRef.current?.value

    router.push({
      pathname: '/products',
      query: { search },
    })
  }

  const onChange = debounce(onSubmit, 300)

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
        id="search"
        type="search"
        name="search"
        ref={searchRef}
        className={styles.input}
        defaultValue={router.query?.search}
        placeholder="What are you searching for?"
        onChange={onChange}
      />
    </form>
  )
}
