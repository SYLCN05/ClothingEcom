import { GarmentIllustration } from './GarmentIllustration'

export function Hero() {
  return (
    <section className="relative">
      <div className="media aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        <GarmentIllustration
          variant="coat"
          className="m-auto h-1/2 w-1/2 text-[var(--color-border-strong)] sm:h-2/3 sm:w-2/3"
        />
      </div>
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
