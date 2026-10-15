export function Newsletter() {
  return (
    <section className="divider border-t border-b">
      <div className="container-narrow flex flex-col items-center gap-4 py-16 text-center">
        <h2>Stay Updated</h2>
        <p className="max-w-sm text-[var(--color-ink-soft)]">
          Sign up for updates on new arrivals and exclusive offers.
        </p>
        <form
          className="flex w-full max-w-sm gap-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="input"
            type="email"
            placeholder="Email address"
            required
          />
          <button type="submit" className="btn btn-primary shrink-0">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  )
}
