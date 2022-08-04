import { fireEvent, render, screen } from '@testing-library/react'
import { Pagination, TPaginationProps } from './Pagination'

const pushMock = jest.fn()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/`,
      push: pushMock,
    }
  },
}))

const makeSut = (props: TPaginationProps) => {
  return render(<Pagination {...props} />)
}

describe('Pagination', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut({ total: 3, current: 1 })

    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByText('2')).toHaveClass('disabled')
  })

  it('should update router query when item on clicked', () => {
    makeSut({ total: 3, current: 0 })

    fireEvent.click(screen.getByText('2'))

    expect(pushMock).toBeCalledWith({
      query: {
        page: 2,
      },
    })
  })
})
