import { render, screen } from '@testing-library/react'
import CategoriesStub from 'test/_stubs/CategoriesStub.json'
import {
  ProductSearchHeadline,
  TProductSearchHeadlineProps,
} from './ProductSearchHeadline'

const makeSut = ({ category }: TProductSearchHeadlineProps) => {
  return render(<ProductSearchHeadline category={category} />)
}

describe('categorySearchHeadline', () => {
  it('should render correctly', () => {
    const category = CategoriesStub[0]
    // @ts-ignore
    makeSut({ category })

    expect(
      screen.getByRole('heading', { level: 1, name: category.name })
    ).toBeInTheDocument()
    expect(screen.getByText(category.description)).toBeInTheDocument()
  })
})
