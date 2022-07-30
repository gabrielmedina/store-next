import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './Button'
import { TButtonProps } from './Button.types'

const onClick = jest.fn()

const makeSut = (props?: TButtonProps) => {
  return render(<Button {...props}>{props?.children || 'Button'}</Button>)
}

describe('Button', () => {
  it('should render correctly', () => {
    makeSut()

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('sizeMedium')
    expect(button).toHaveClass('variantPrimary')
  })

  it('should accept children', () => {
    makeSut({ children: <>Children</> })

    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  it('should accept element "a"', () => {
    makeSut({ element: 'a', href: '/' })

    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('should accept variant "secondary"', () => {
    makeSut({ variant: 'secondary' })

    expect(screen.getByRole('button')).toHaveClass('variantSecondary')
  })

  it('should accept size "small"', () => {
    makeSut({ size: 'small' })

    expect(screen.getByRole('button')).toHaveClass('sizeSmall')
  })

  it('should accept size "tiny"', () => {
    makeSut({ size: 'tiny' })

    expect(screen.getByRole('button')).toHaveClass('sizeTiny')
  })

  it('should accept rounded prop', () => {
    makeSut({ rounded: true })

    expect(screen.getByRole('button')).toHaveClass('rounded')
  })

  it('should accept fullWidth prop', () => {
    makeSut({ fullWidth: true })

    expect(screen.getByRole('button')).toHaveClass('fullWidth')
  })

  it('should accept className prop', () => {
    makeSut({ className: 'class' })

    expect(screen.getByRole('button')).toHaveClass('class')
  })

  it('should accept onClick prop', () => {
    makeSut({ onClick })

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toBeCalled()
  })
})
