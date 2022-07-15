import { render, screen } from '@testing-library/react'
import { Container, TContainerProps } from './Container'

const makeSut = (props?: TContainerProps) => {
  return render(<Container {...props} />)
}

describe('Container', () => {
  it('should render correctly', () => {
    makeSut()

    const container = screen.getByTestId('container')

    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('sizeMedium')
  })

  it('should accept size prop', () => {
    makeSut({ size: 'small' })

    expect(screen.getByTestId('container')).toHaveClass('sizeSmall')
  })
})
