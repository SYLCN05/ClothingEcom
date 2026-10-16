import { Link } from 'react-router-dom'
import type { Product } from '../types/product'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="card-product">
      <div className="card-product-media">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="label-muted">{product.name}</span>
      {product.salePrice ? (
        <span className="flex gap-2">
          <span className="price price-sale">
            ${product.salePrice.toFixed(2)}
          </span>
          <span className="price text-[var(--color-muted)] line-through">
            ${product.price.toFixed(2)}
          </span>
        </span>
      ) : (
        <span className="price">${product.price.toFixed(2)}</span>
      )}
    </Link>
  )
}
