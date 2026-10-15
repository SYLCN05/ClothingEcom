import { CategoryTiles } from './components/CategoryTiles'
import { Hero } from './components/Hero'
import { Newsletter } from './components/Newsletter'
import { ProductSection } from './components/ProductSection'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { newArrivals } from './data/products'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-col gap-16 py-16">
        <Hero />
        <CategoryTiles />
        <ProductSection id="new-in" title="New In" products={newArrivals} />
        <Newsletter />
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
