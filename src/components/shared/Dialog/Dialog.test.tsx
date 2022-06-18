import { fireEvent, render, screen } from '@testing-library/react'
import { HTMLAttributes } from 'react'
import { Dialog, TDialogProps } from './Dialog'

const onClose = jest.fn()

const makeSut = (props: TDialogProps & HTMLAttributes<HTMLElement>) => {
  return render(<Dialog {...props}>{props?.children}</Dialog>)
}

const props = {
  open: true,
  title: 'A dialog',
  onClose,
}

describe('Dialog', () => {
  it('should render correctly', () => {
    const { container } = makeSut({ ...props })

    expect(container.firstChild).toHaveClass('open')
    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual(
      'A dialog'
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTitle('Close')).toBeInTheDocument()
  })

  it('should accept subtitle prop', () => {
    makeSut({ ...props, subtitle: 'Awesome dialog' })

    expect(screen.getByText('Awesome dialog')).toBeInTheDocument()
  })

  it('should accept children prop', () => {
    makeSut({ ...props, children: <>Children</> })

    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  it('should accept footer prop', () => {
    makeSut({ ...props, footer: <>Footer</> })

    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('should hide dialog when open prop is false', () => {
    const { container } = makeSut({ ...props, open: false })

    expect(container.firstChild).not.toHaveClass('open')
  })

  it('should call onClose fn when close button has clicked', () => {
    makeSut({ ...props })

    fireEvent.click(screen.getByTitle('Close'))

    expect(onClose).toBeCalled()
  })
})
