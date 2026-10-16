import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../lib/api'
import type { Product } from '../types/product'

export type CategorySlug = 'new-in' | 'women' | 'men' | 'sale'

const categoryConfig: Record<
  CategorySlug,
  {
    title: string
    banner: string
    bannerAlt: string
    filter: (product: Product) => boolean
  }
> = {
  'new-in': {
    title: 'New In',
    banner:
      'https://images.pexels.com/photos/16470015/pexels-photo-16470015.jpeg?cs=tinysrgb&dpr=1&w=1600',
    bannerAlt: 'Coats arranged in neat rows on racks in a clothing store',
    filter: (product) => product.isNew,
  },
  women: {
    title: 'Women',
    banner:
      'https://images.pexels.com/photos/8386663/pexels-photo-8386663.jpeg?cs=tinysrgb&dpr=1&w=1600',
    bannerAlt: 'Women browsing clothing in a boutique',
    filter: (product) => product.category.startsWith('Women'),
  },
  men: {
    title: 'Men',
    banner:
      'https://images.pexels.com/photos/9558897/pexels-photo-9558897.jpeg?cs=tinysrgb&dpr=1&w=1600',
    bannerAlt: 'Man in a minimalist studio holding a sweater on a hanger',
    filter: (product) => product.category.startsWith('Men'),
  },
  sale: {
    title: 'Sale',
    banner:
      'https://images.pexels.com/photos/30254262/pexels-photo-30254262/free-photo-of-outdoor-sale-display-of-fashionable-clothing.jpeg?cs=tinysrgb&dpr=1&w=1600',
    bannerAlt: 'Outdoor rack of clothing marked for sale',
    filter: (product) => product.salePrice != null,
  },
}

type CategoryPageProps = {
  slug: CategorySlug
}

export function CategoryPage({ slug }: CategoryPageProps) {
  const config = categoryConfig[slug]
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    getProducts()
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const items = products?.filter(config.filter) ?? []

  return (
    <main className="flex flex-col gap-10 py-10">
      <section className="media aspect-[16/9] sm:aspect-[21/9]">
        <img
          src={config.banner}
          alt={config.bannerAlt}
          className="h-full w-full object-cover"
        />
      </section>

      <div className="container-page flex flex-col gap-8">
        <h1>{config.title}</h1>

        {error ? (
          <p className="text-[var(--color-ink-soft)]">
            Couldn't load products right now. Please try again later.
          </p>
        ) : products === null ? (
          <p className="text-[var(--color-ink-soft)]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-[var(--color-ink-soft)]">No items here yet.</p>
        ) : (
          <div className="grid-products">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
