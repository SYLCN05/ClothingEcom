export type StockState = 'in-stock' | 'low-stock' | 'out-of-stock'

export type Product = {
  id: number
  name: string
  category: string
  price: number
  salePrice?: number | null
  stock: StockState
  description: string
  composition: string
  sizes: string[]
  imageUrl: string
  isNew: boolean
}
