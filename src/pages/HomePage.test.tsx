import { render } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import HomePage, { getServerSideProps } from './index.page'

const makeSut = () => {
  return render(<HomePage />)
}

describe('HomePage', () => {
  it('should render correctly', () => {
    const { container } = makeSut()

    expect(container).toBeEmptyDOMElement()
  })

  it('should redirect to ProductsPage', async () => {
    const response = await getServerSideProps({} as GetServerSidePropsContext)

    expect(response).toEqual({
      redirect: {
        destination: '/products',
        statusCode: 301,
      },
    })
  })
})
