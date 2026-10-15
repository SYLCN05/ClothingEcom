import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { GarmentIllustration } from './GarmentIllustration'

type ProductSectionProps = {
  id?: string
  title: string
  products: Product[]
}

export function ProductSection({ id, title, products }: ProductSectionProps) {
  return (
    <section id={id} className="container-page flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <h2>{title}</h2>
        <a href="#" className="nav-link">
          Shop All
        </a>
      </div>

      <div className="grid-products">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card-product"
          >
            <div className="card-product-media">
              <GarmentIllustration
                variant={product.variant}
                className="m-auto h-1/2 w-1/2 text-[var(--color-ink-soft)]"
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
        ))}
      </div>
    </section>
  )
}
