import { render, screen } from '@testing-library/react'
import { ReactChild } from 'react'
import { LayoutDefault } from './Default'

const makeSut = (children?: ReactChild) => {
  return render(<LayoutDefault>{children}</LayoutDefault>)
}

describe('LayoutDefault', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut()

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should accept children prop', () => {
    makeSut(<>Children</>)

    expect(screen.getByText('Children')).toBeInTheDocument()
  })
})
