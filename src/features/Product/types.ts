export type TProduct = {
  id: string
  slug: string
  name: string
  summary: string
  description: string
  price: number
  cover: TProductImage
  images?: Array<TProductImage>
}

export type TProductImage = {
  url: string
  id?: string
  width?: number
  height?: number
}
