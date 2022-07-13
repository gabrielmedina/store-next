import React from 'react'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { getAlgoliaClient } from 'src/lib'
import { StateSearchItems } from '../SearchState'
import styles from './ProductSearchForm.module.scss'

type TProductSearchFormData = {
  search: string
}

export const ProductSearchForm: React.FC<React.HTMLAttributes<any>> = ({
  ...props
}) => {
  const { register, handleSubmit } = useForm<TProductSearchFormData>()
  const setStateSearchItems = useSetRecoilState(StateSearchItems)
  const algoliaClient = getAlgoliaClient({ index: 'dev_store' })

  const onSubmit = handleSubmit(async ({ search }) => {
    const { hits } = await algoliaClient.search(search)
    // @ts-ignore: Unreachable code error
    setStateSearchItems(hits)
  })

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
