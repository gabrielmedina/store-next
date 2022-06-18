import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

const makeSut = () => {
  return render(<Footer />)
}

describe('Footer', () => {
  it('should render correctly', () => {
    makeSut()

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByTitle('Store')).toBeInTheDocument()
  })
})
