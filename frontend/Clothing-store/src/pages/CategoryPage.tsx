import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../lib/api'
import { getCategory } from '../lib/categories'
import type { CategorySlug } from '../lib/categories'
import type { Product } from '../types/product'

type CategoryPageProps = {
  slug: CategorySlug
}

export function CategoryPage({ slug }: CategoryPageProps) {
  const category = getCategory(slug)
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

  const items = products?.filter(category.filter) ?? []

  return (
    <main className="flex flex-col gap-10 py-10">
      <section className="media aspect-[16/9] sm:aspect-[21/9]">
        <img
          src={category.image}
          alt={category.imageAlt}
          className="h-full w-full object-cover"
        />
      </section>

      <div className="container-page flex flex-col gap-8">
        <h1>{category.title}</h1>

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
