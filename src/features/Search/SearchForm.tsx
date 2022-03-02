import { useForm } from 'react-hook-form'

type FormData = {
  search: string
}

export const SearchForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="search">Search</label>
      <input type="search" id="search" {...register('search')} />
    </form>
  )
}
