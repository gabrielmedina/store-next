import gql from 'graphql-tag'

export const GET_PRODUCT_BY_SLUG_QUERY = gql`
  query GetProduct($slug: String) {
    product(where: {slug: $slug}) {
      id
      name
      description
      price
      slug
      images {
        id
        url
        width
        height
      }
      cover {
        id
        url
        height
        width
      }
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: String) {
    product(where: {id: $slug}) {
      id
      name
      description
      price
      slug
      cover {
        id
        url
        height
        width
      }
    }
  }
`

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      slug
      cover {
        id
        url
        height
        width
      }
    }
  }
`
