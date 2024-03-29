import { gql } from '@apollo/client'

export const GET_PRODUCT_BY_SLUG_QUERY = gql`
  query GetProductBySlug($slug: String) {
    product(where: { slug: $slug }) {
      id
      name
      description
      price
      slug
      category {
        id
        name
        slug
      }
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
  query GetProductById($id: ID) {
    product(where: { id: $id }) {
      id
      name
      description
      price
      slug
      category {
        id
        name
        slug
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

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      slug
      category {
        id
        name
        slug
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
