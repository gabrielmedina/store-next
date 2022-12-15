import { render, screen } from '@testing-library/react'
import { Badge, TBadgeProps } from './Badge'

const makeSut = (props?: TBadgeProps) => {
  return render(<Badge {...props}>Badge</Badge>)
}

describe('Badge', () => {
  it('should render correctly', () => {
    makeSut()

    expect(screen.getByText('Badge')).toBeInTheDocument()
  })

  it('should render with title', () => {
    makeSut({ title: 'Awesome badge' })

    expect(screen.getByTitle('Awesome badge')).toBeInTheDocument()
  })
})
