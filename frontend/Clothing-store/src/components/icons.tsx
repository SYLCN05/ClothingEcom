type IconProps = {
  className?: string
}

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="8.75" cy="8.75" r="5.75" />
      <path d="M17 17l-3.9-3.9" />
    </svg>
  )
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="10" cy="6.5" r="3.5" />
      <path d="M3.5 17c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" />
    </svg>
  )
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M5.5 7h9l.7 10.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1z" />
      <path d="M7.25 7V5.5a2.75 2.75 0 0 1 5.5 0V7" />
    </svg>
  )
}
