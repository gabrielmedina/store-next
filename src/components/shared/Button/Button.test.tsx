import { fireEvent, render, screen } from '@testing-library/react'
import { ButtonHTMLAttributes } from 'react'
import { Button, TButtonProps } from './Button'

const onClick = jest.fn()

const makeSut = (
  props?: TButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return render(<Button {...props}>{props?.children || 'Button'}</Button>)
}

describe('Button', () => {
  it('should render correctly', () => {
    makeSut()

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('variantPrimary')
  })

  it('should accept children', () => {
    makeSut({ children: <>Children</> })

    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  it('should call onClick fn when clicked', () => {
    makeSut({ onClick })

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toBeCalled()
  })

  it('should accept variants props', () => {
    makeSut({ variant: 'secondary' })

    expect(screen.getByRole('button')).toHaveClass('variantSecondary')
  })

  it('should accept rounded props', () => {
    makeSut({ rounded: true })

    expect(screen.getByRole('button')).toHaveClass('rounded')
  })

  it('should accept fullWidth props', () => {
    makeSut({ fullWidth: true })

    expect(screen.getByRole('button')).toHaveClass('fullWidth')
  })
})
