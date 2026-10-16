import type { Product } from '../types/product'

export type CategorySlug = 'new-in' | 'women' | 'men' | 'sale'

export type CategoryConfig = {
  slug: CategorySlug
  title: string
  image: string
  imageAlt: string
  filter: (product: Product) => boolean
}

export const categories: CategoryConfig[] = [
  {
    slug: 'new-in',
    title: 'New In',
    image:
      'https://images.pexels.com/photos/16470015/pexels-photo-16470015.jpeg?cs=tinysrgb&dpr=1&w=1600',
    imageAlt: 'Coats arranged in neat rows on racks in a clothing store',
    filter: (product) => product.isNew,
  },
  {
    slug: 'women',
    title: 'Women',
    image:
      'https://images.pexels.com/photos/8386663/pexels-photo-8386663.jpeg?cs=tinysrgb&dpr=1&w=1600',
    imageAlt: 'Women browsing clothing in a boutique',
    filter: (product) => product.category.startsWith('Women'),
  },
  {
    slug: 'men',
    title: 'Men',
    image:
      'https://images.pexels.com/photos/9558897/pexels-photo-9558897.jpeg?cs=tinysrgb&dpr=1&w=1600',
    imageAlt: 'Man in a minimalist studio holding a sweater on a hanger',
    filter: (product) => product.category.startsWith('Men'),
  },
  {
    slug: 'sale',
    title: 'Sale',
    image:
      'https://images.pexels.com/photos/30254262/pexels-photo-30254262/free-photo-of-outdoor-sale-display-of-fashionable-clothing.jpeg?cs=tinysrgb&dpr=1&w=1600',
    imageAlt: 'Outdoor rack of clothing marked for sale',
    filter: (product) => product.salePrice != null,
  },
]

export function getCategory(slug: CategorySlug): CategoryConfig {
  const category = categories.find((c) => c.slug === slug)
  if (!category) throw new Error(`Unknown category slug: ${slug}`)
  return category
}
