import { Link } from 'react-router-dom'
import { getCategory } from '../lib/categories'
import type { CategorySlug } from '../lib/categories'

const tileSlugs: CategorySlug[] = ['women', 'men', 'new-in']

export function CategoryTiles() {
  return (
    <section className="container-page">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tileSlugs.map((slug) => {
          const category = getCategory(slug)
          return (
            <Link key={slug} to={`/${slug}`} className="relative block">
              <div className="media aspect-[4/5]">
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
                <span className="label bg-[var(--color-paper)] px-4 py-2">
                  {category.title}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
