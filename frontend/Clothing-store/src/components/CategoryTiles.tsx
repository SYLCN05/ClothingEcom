const categories = ['Women', 'Men', 'New In']

export function CategoryTiles() {
  return (
    <section className="container-page">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((name) => (
          <a key={name} href="#" className="relative block">
            <div className="media aspect-[4/5]" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
              <span className="label bg-[var(--color-paper)] px-4 py-2">
                {name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
