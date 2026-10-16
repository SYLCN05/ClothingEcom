export type CartLine = {
  // present only for server-backed lines (CartItem.Id); absent for guest lines
  id?: number
  productId: number
  name: string
  price: number
  salePrice?: number | null
  imageUrl: string
  size: string
  quantity: number
}
