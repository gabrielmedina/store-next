import { fireEvent, render, screen, act } from '@testing-library/react'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import { Header } from './Header'

const makeSut = () => {
  return render(<Header />)
}

describe('Header', () => {
  beforeEach(() => {
    useCartMock.mockReturnValue(useCartMockReturn)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut()

    expect(screen.getByTitle('Store')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should open product cart when button cart has clicked', () => {
    makeSut()

    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(useCartMockReturn.setCartIsOpen).toBeCalledWith(true)
  })
})
