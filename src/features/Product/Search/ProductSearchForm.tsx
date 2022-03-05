import { useForm } from 'react-hook-form'

type TProductSearchFormData = {
  search: string
}

export const ProductSearchForm: React.FC = () => {
  const { register, handleSubmit } = useForm<TProductSearchFormData>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="search">Search</label>
      <input type="search" id="search" {...register('search')} />
    </form>
  )
}
