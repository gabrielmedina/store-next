import { act, fireEvent, render, screen } from '@testing-library/react'
import { ReactChild } from 'react'
import {
  useCartStateMock,
  useCartStateMockReturn,
} from 'test/_mocks/useCartStateMock'
import { LayoutSearch } from './Search'

const pushMock = jest.fn()

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockImplementation(() => ({
    push: pushMock,
  })),
}))

const makeSut = (children?: ReactChild) => {
  return render(<LayoutSearch>{children}</LayoutSearch>)
}

describe('LayoutSearch', () => {
  beforeEach(() => {
    useCartStateMock.mockReturnValue(useCartStateMockReturn)
  })

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

  it('should open product cart when button cart has clicked', () => {
    makeSut()

    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(useCartStateMockReturn.setIsVisible).toBeCalledWith(true)
  })
})
