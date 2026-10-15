import type { GarmentVariant } from '../components/GarmentIllustration'

export type StockState = 'in-stock' | 'low-stock' | 'out-of-stock'

export type Product = {
  id: string
  name: string
  category: string
  price: number
  salePrice?: number
  stock: StockState
  variant: GarmentVariant
  description: string
  composition: string
  sizes: string[]
}

export const newArrivals: Product[] = [
  {
    id: 'p1',
    name: 'Oversized Wool Coat',
    category: 'Women / Outerwear',
    price: 129.9,
    stock: 'in-stock',
    variant: 'coat',
    description:
      'A relaxed, oversized coat cut from a heavyweight wool blend. Dropped shoulders, side pockets, and a single-button closure.',
    composition: '80% Wool, 20% Polyamide',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p2',
    name: 'Pleated Midi Skirt',
    category: 'Women / Skirts',
    price: 49.9,
    salePrice: 34.9,
    stock: 'low-stock',
    variant: 'skirt',
    description:
      'A fluid pleated midi skirt with an elasticated waistband. Falls just below the knee for easy movement.',
    composition: '100% Polyester',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'p3',
    name: 'Cotton Poplin Shirt',
    category: 'Men / Shirts',
    price: 39.9,
    stock: 'in-stock',
    variant: 'shirt',
    description:
      'A crisp poplin shirt with a classic collar and regular fit. Finished with mother-of-pearl buttons.',
    composition: '100% Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p4',
    name: 'Tailored Wide-Leg Trousers',
    category: 'Women / Trousers',
    price: 59.9,
    stock: 'in-stock',
    variant: 'trousers',
    description:
      'High-rise tailored trousers with a wide, fluid leg and a concealed front closure. Fully lined.',
    composition: '68% Viscose, 30% Polyester, 2% Elastane',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'p5',
    name: 'Ribbed Knit Sweater',
    category: 'Women / Knitwear',
    price: 45.9,
    stock: 'out-of-stock',
    variant: 'sweater',
    description:
      'A fine-ribbed pullover with a round neckline and dropped shoulder seams. Soft, year-round weight.',
    composition: '55% Cotton, 45% Acrylic',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p6',
    name: 'Belted Trench Jacket',
    category: 'Men / Outerwear',
    price: 99.9,
    stock: 'in-stock',
    variant: 'jacket',
    description:
      'A water-resistant trench jacket with a tie belt, storm flap, and welt pockets. Lightly structured shoulders.',
    composition: '100% Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p7',
    name: 'Linen-Blend Blazer',
    category: 'Men / Blazers',
    price: 89.9,
    salePrice: 69.9,
    stock: 'low-stock',
    variant: 'jacket',
    description:
      'An unstructured blazer in a breathable linen blend. Notched lapel, two-button closure, single back vent.',
    composition: '55% Linen, 45% Viscose',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p8',
    name: 'Straight-Leg Jeans',
    category: 'Men / Denim',
    price: 55.9,
    stock: 'in-stock',
    variant: 'trousers',
    description:
      'Mid-rise straight-leg jeans in a rigid, non-stretch denim that softens with wear.',
    composition: '100% Cotton',
    sizes: ['28', '30', '32', '34', '36'],
  },
]

export function getProductById(id: string): Product | undefined {
  return newArrivals.find((product) => product.id === id)
}
