import { render, screen, act } from '@testing-library/react'
import { Header, THeaderProps } from './Header'

const makeSut = (props?: THeaderProps) => {
  return render(<Header {...props} />)
}

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut()

    expect(screen.getByTitle('Store')).toBeInTheDocument()
  })

  it('should render with navigation', () => {
    makeSut({
      nav: (
        <ul>
          <li>
            <a href="#">Link</a>
          </li>
        </ul>
      ),
    })

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
