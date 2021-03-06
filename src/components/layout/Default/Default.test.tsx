import { render, screen } from '@testing-library/react'
import { ButtonHTMLAttributes } from 'react'
import { LayoutDefault } from './Default'

const makeSut = (props?: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return render(<LayoutDefault>{props?.children}</LayoutDefault>)
}

describe('LayoutDefault', () => {
  it('should render correctly', () => {
    makeSut()

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should accept children prop', () => {
    makeSut({ children: <>Children</> })

    expect(screen.getByText('Children')).toBeInTheDocument()
  })
})
