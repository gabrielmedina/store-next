import gql from 'graphql-tag'

export const GET_PRODUCTS_QUERY = gql`
  query GetProduts {
    products {
      id
      name
      description
      price
      cover {
        id
        url
        height
        width
      }
    }
  }
`
