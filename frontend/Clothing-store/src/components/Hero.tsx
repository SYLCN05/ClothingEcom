import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative">
      <div className="media aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        <img
          src="https://images.pexels.com/photos/8453662/pexels-photo-8453662.jpeg?cs=tinysrgb&dpr=1&w=1600"
          alt="A woman in a minimalist studio with a trench coat, ribbed knit sweater, and soft white fabric draped over her shoulder"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 p-6 sm:p-10 lg:p-16">
        <span className="label-muted text-[var(--color-paper)]">New Season</span>
        <h1 className="max-w-xl text-[var(--color-paper)]">
          Clean lines, considered layers.
        </h1>
        <Link to="/new-in" className="btn btn-primary">
          Shop New In
        </Link>
      </div>
    </section>
  )
}
