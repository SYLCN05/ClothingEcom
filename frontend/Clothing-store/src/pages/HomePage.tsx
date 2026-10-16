import { useEffect, useState } from 'react'
import { CategoryTiles } from '../components/CategoryTiles'
import { Hero } from '../components/Hero'
import { Newsletter } from '../components/Newsletter'
import { ProductSection } from '../components/ProductSection'
import { getProducts } from '../lib/api'
import type { Product } from '../types/product'

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>('loading')

  useEffect(() => {
    let cancelled = false

    getProducts()
      .then((data) => {
        if (cancelled) return
        setProducts(data)
        setStatus('loaded')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="flex flex-col gap-16 py-16">
      <Hero />
      <CategoryTiles />
      {status === 'error' ? (
        <p className="container-page text-[var(--color-ink-soft)]">
          Couldn't load products right now. Please try again later.
        </p>
      ) : (
        <ProductSection
          id="new-in"
          title="New In"
          products={products.filter((product) => product.isNew)}
          viewAllHref="/new-in"
        />
      )}
      <Newsletter />
    </main>
  )
}
