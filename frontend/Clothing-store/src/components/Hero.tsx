export function Hero() {
  return (
    <section className="relative">
      <div className="media aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" />
      <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 p-6 sm:p-10 lg:p-16">
        <span className="label-muted">New Season</span>
        <h1 className="max-w-xl">Clean lines, considered layers.</h1>
        <a href="#new-in" className="btn btn-primary">
          Shop New In
        </a>
      </div>
    </section>
  )
}
