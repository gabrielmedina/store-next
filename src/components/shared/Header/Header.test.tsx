import { fireEvent, render, screen, act } from '@testing-library/react'
import {
  useCartStateMock,
  useCartStateMockReturn,
} from 'test/_mocks/useCartStateMock'
import { Header } from './Header'

const makeSut = () => {
  return render(<Header />)
}

describe('Header', () => {
  beforeEach(() => {
    useCartStateMock.mockReturnValue(useCartStateMockReturn)
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

    expect(useCartStateMockReturn.setIsVisible).toBeCalledWith(true)
  })
})
