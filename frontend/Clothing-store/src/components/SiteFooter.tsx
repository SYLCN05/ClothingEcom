const columns = [
  { heading: "Help", links: ["Contact Us", "Shipping", "Returns", "FAQ"] },
  { heading: "About", links: ["Our Story", "Sustainability", "Careers"] },
  { heading: "Legal", links: ["Terms of Use", "Privacy Policy", "Cookies"] },
];

export function SiteFooter() {
  return (
    <footer className="container-page flex flex-col gap-10 py-16">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 ml-[20vw]">
        {columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-4">
            <span className="label">{column.heading}</span>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider flex flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="label-muted">
          © {new Date().getFullYear()} Clothing Store
        </span>
        <span className="label-muted">United States / English</span>
      </div>
    </footer>
  );
}
