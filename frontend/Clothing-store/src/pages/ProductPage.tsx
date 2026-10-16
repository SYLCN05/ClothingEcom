import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getProductById } from '../lib/api'
import type { Product, StockState } from '../types/product'

const stockLabel: Record<StockState, string> = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
}

export function ProductPage() {
  const cart = useCart()
  const { id } = useParams<{ id: string }>()
  const numericId = id ? Number(id) : NaN

  const [result, setResult] = useState<{ id: number; product: Product | null } | null>(null)

  useEffect(() => {
    if (Number.isNaN(numericId)) return

    let cancelled = false

    getProductById(numericId)
      .then((data) => {
        if (!cancelled) setResult({ id: numericId, product: data ?? null })
      })
      .catch(() => {
        if (!cancelled) setResult({ id: numericId, product: null })
      })

    return () => {
      cancelled = true
    }
  }, [numericId])

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)

  const effectiveProduct = Number.isNaN(numericId)
    ? null
    : result?.id === numericId
      ? result.product
      : undefined

  if (effectiveProduct === undefined) {
    return (
      <main className="container-narrow flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-[var(--color-ink-soft)]">Loading...</p>
      </main>
    )
  }

  if (!effectiveProduct) {
    return (
      <main className="container-narrow flex flex-col items-center gap-4 py-24 text-center">
        <h1>Product not found</h1>
        <p className="text-[var(--color-ink-soft)]">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn btn-outline">
          Back to Home
        </Link>
      </main>
    )
  }

  const isOutOfStock = effectiveProduct.stock === 'out-of-stock'

  return (
    <main className="container-page flex flex-col gap-10 py-10">
      <nav className="label-muted flex gap-2">
        <Link to="/" className="hover:text-[var(--color-ink)]">
          Home
        </Link>
        <span>/</span>
        <span>{effectiveProduct.category}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-3">
          <div className="media aspect-[3/4]">
            <img
              src={effectiveProduct.imageUrl}
              alt={effectiveProduct.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                type="button"
                className="media aspect-square"
                style={{
                  outline:
                    activeImage === index
                      ? '1px solid var(--color-ink)'
                      : '1px solid transparent',
                  outlineOffset: '-1px',
                }}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={effectiveProduct.imageUrl}
                  alt={effectiveProduct.name}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="label-muted">{effectiveProduct.category}</span>
            <h1>{effectiveProduct.name}</h1>
            {effectiveProduct.salePrice ? (
              <span className="flex items-baseline gap-3">
                <span className="price price-sale text-lg">
                  ${effectiveProduct.salePrice.toFixed(2)}
                </span>
                <span className="price text-base text-[var(--color-muted)] line-through">
                  ${effectiveProduct.price.toFixed(2)}
                </span>
              </span>
            ) : (
              <span className="price text-lg">
                ${effectiveProduct.price.toFixed(2)}
              </span>
            )}
            <span className={`stock stock-${effectiveProduct.stock}`}>
              {stockLabel[effectiveProduct.stock]}
            </span>
          </div>

          <hr className="divider" />

          <p className="text-[var(--color-ink-soft)]">
            {effectiveProduct.description}
          </p>

          <div className="flex flex-col gap-3">
            <span className="label-muted">Size</span>
            <div className="flex flex-wrap gap-2">
              {effectiveProduct.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    selectedSize === size ? 'btn btn-primary' : 'btn btn-outline'
                  }
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary w-full"
            disabled={isOutOfStock || !selectedSize}
            onClick={() => selectedSize && cart.addItem(effectiveProduct, selectedSize, 1)}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
          </button>

          <hr className="divider" />

          <details className="group">
            <summary className="label flex cursor-pointer list-none items-center justify-between py-1">
              Composition &amp; Care
            </summary>
            <p className="pt-3 text-sm text-[var(--color-ink-soft)]">
              {effectiveProduct.composition}
            </p>
          </details>

          <hr className="divider" />

          <details className="group">
            <summary className="label flex cursor-pointer list-none items-center justify-between py-1">
              Shipping &amp; Returns
            </summary>
            <p className="pt-3 text-sm text-[var(--color-ink-soft)]">
              Standard delivery in 3–5 business days. Free returns within 30
              days of purchase.
            </p>
          </details>
        </div>
      </div>
    </main>
  )
}
