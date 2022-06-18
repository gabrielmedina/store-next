import { render, screen } from '@testing-library/react'
import { Card, TCardProps } from './Card'

const makeSut = (props: TCardProps) => {
  return render(<Card {...props} />)
}

describe('Card', () => {
  it('should render correctly', () => {
    makeSut({ title: 'A simple card' })

    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual(
      'A simple card'
    )
  })

  it('should accept description prop', () => {
    makeSut({ title: 'A simple card', description: 'Awesome card' })

    expect(screen.getByText('Awesome card')).toBeInTheDocument()
  })

  it('should accept cta prop', () => {
    makeSut({
      title: 'A simple card',
      cta: (
        <>
          <button>CTA</button>
        </>
      ),
    })

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should accept image prop', () => {
    makeSut({
      title: 'A simple card',
      image: {
        src: '/image.jpg',
        alt: 'Image',
      },
    })

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src')
    expect(screen.getByAltText('Image')).toBeInTheDocument()
  })
})
