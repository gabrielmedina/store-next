import { gql } from '@apollo/client'

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String) {
    category(where: { slug: $slug }) {
      id
      name
      description
    }
  }
`
