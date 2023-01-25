import { render, screen } from '@testing-library/react'
import { Breadcrumb, TBreadcrumbProps } from './Breadcrumb'

const makeSut = (props: TBreadcrumbProps) => {
  return render(<Breadcrumb {...props} />)
}

describe('Breadcrumb', () => {
  it('should render correctly', () => {
    const items = [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'Product',
        path: '/product',
        isCurrent: true,
      },
    ]

    makeSut({ items })

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Product')).toHaveClass('current')
  })

  it('should no render when items is empty', () => {
    makeSut({ items: [] })

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('should no display undefined items', () => {
    const items = [
      {
        title: 'Home',
        path: '/',
      },
      undefined,
      {
        title: 'Product',
        path: '/product',
        isCurrent: true,
      },
    ]

    makeSut({ items })

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
