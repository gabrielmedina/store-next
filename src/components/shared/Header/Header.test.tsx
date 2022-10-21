import { fireEvent, render, screen } from '@testing-library/react'
import { StateCartOpen } from 'src/features/Product'
import { RecoilMock } from 'test/_mocks/RecoilMock'
import { Header } from './Header'

const onRecoilChange = jest.fn()

const makeSut = () => {
  return render(
    <RecoilMock node={StateCartOpen} onChange={onRecoilChange}>
      <Header />
    </RecoilMock>
  )
}

describe('Header', () => {
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

    fireEvent.click(screen.getByRole('button'))

    expect(onRecoilChange).toBeCalled()
    expect(onRecoilChange).toHaveBeenNthCalledWith(2, true)
  })
})
