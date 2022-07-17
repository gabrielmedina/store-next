import React from 'react'
import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { getAlgoliaClient } from 'src/lib'
import { StateSearchItems } from '../SearchState'
import styles from './ProductSearchForm.module.scss'

type TProductSearchFormData = {
  search: string
}

export const ProductSearchForm: React.FC<
  React.HTMLAttributes<HTMLFormElement>
> = ({ ...props }) => {
  const { register, handleSubmit } = useForm<TProductSearchFormData>()
  const setStateSearchItems = useSetRecoilState(StateSearchItems)
  const algoliaClient = getAlgoliaClient({ index: 'dev_store' })

  const onSubmit = async ({ search }: TProductSearchFormData) => {
    const { hits } = await algoliaClient.search(search)
    // @ts-ignore: Unreachable code error
    setStateSearchItems(hits)
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
