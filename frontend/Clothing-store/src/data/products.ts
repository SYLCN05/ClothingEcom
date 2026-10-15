export type Product = {
  id: string
  name: string
  price: number
  salePrice?: number
}

export const newArrivals: Product[] = [
  { id: 'p1', name: 'Oversized Wool Coat', price: 129.9 },
  { id: 'p2', name: 'Pleated Midi Skirt', price: 49.9, salePrice: 34.9 },
  { id: 'p3', name: 'Cotton Poplin Shirt', price: 39.9 },
  { id: 'p4', name: 'Tailored Wide-Leg Trousers', price: 59.9 },
  { id: 'p5', name: 'Ribbed Knit Sweater', price: 45.9 },
  { id: 'p6', name: 'Belted Trench Jacket', price: 99.9 },
  { id: 'p7', name: 'Linen-Blend Blazer', price: 89.9, salePrice: 69.9 },
  { id: 'p8', name: 'Straight-Leg Jeans', price: 55.9 },
]
