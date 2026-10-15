import { CategoryTiles } from '../components/CategoryTiles'
import { Hero } from '../components/Hero'
import { Newsletter } from '../components/Newsletter'
import { ProductSection } from '../components/ProductSection'
import { newArrivals } from '../data/products'

export function HomePage() {
  return (
    <main className="flex flex-col gap-16 py-16">
      <Hero />
      <CategoryTiles />
      <ProductSection id="new-in" title="New In" products={newArrivals} />
      <Newsletter />
    </main>
  )
}
