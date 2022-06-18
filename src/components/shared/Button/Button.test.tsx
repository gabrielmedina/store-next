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
    const { container } = makeSut({ variant: 'secondary' })

    expect(container.firstChild).toHaveClass('secondary')
  })

  it('should accept rounded props', () => {
    const { container } = makeSut({ rounded: true })

    expect(container.firstChild).toHaveClass('rounded')
  })

  it('should accept fullWidth props', () => {
    const { container } = makeSut({ fullWidth: true })

    expect(container.firstChild).toHaveClass('fullWidth')
  })
})
