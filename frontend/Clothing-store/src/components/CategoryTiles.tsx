import { Link } from 'react-router-dom'
import { GarmentIllustration } from './GarmentIllustration'
import type { GarmentVariant } from './GarmentIllustration'

const categories: { name: string; variant: GarmentVariant; href: string }[] = [
  { name: 'Women', variant: 'skirt', href: '/women' },
  { name: 'Men', variant: 'shirt', href: '/men' },
  { name: 'New In', variant: 'coat', href: '/new-in' },
]

export function CategoryTiles() {
  return (
    <section className="container-page">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.name} to={category.href} className="relative block">
            <div className="media aspect-[4/5]">
              <GarmentIllustration
                variant={category.variant}
                className="m-auto h-1/2 w-1/2 text-[var(--color-ink-soft)]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
              <span className="label bg-[var(--color-paper)] px-4 py-2">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
