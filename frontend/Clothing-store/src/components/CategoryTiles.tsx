import { GarmentIllustration } from './GarmentIllustration'
import type { GarmentVariant } from './GarmentIllustration'

const categories: { name: string; variant: GarmentVariant }[] = [
  { name: 'Women', variant: 'skirt' },
  { name: 'Men', variant: 'shirt' },
  { name: 'New In', variant: 'coat' },
]

export function CategoryTiles() {
  return (
    <section className="container-page">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <a key={category.name} href="#" className="relative block">
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
          </a>
        ))}
      </div>
    </section>
  )
}
