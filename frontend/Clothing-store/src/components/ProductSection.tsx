import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

type ProductSectionProps = {
  id?: string
  title: string
  products: Product[]
  viewAllHref?: string
}

export function ProductSection({ id, title, products, viewAllHref = '#' }: ProductSectionProps) {
  return (
    <section id={id} className="container-page flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <h2>{title}</h2>
        <Link to={viewAllHref} className="nav-link">
          Shop All
        </Link>
      </div>

      <div className="grid-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
