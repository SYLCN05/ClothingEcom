export type GarmentVariant =
  | 'coat'
  | 'jacket'
  | 'shirt'
  | 'sweater'
  | 'skirt'
  | 'trousers'

type GarmentIllustrationProps = {
  variant: GarmentVariant
  className?: string
}

const common = {
  viewBox: '0 0 100 120',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const paths: Record<GarmentVariant, string> = {
  coat:
    'M38 14h24l6 9v6l10 10-7 9-9-6v62a3 3 0 0 1-3 3H41a3 3 0 0 1-3-3V42l-9 6-7-9 10-10v-6zM50 23v76M35 70h30',
  jacket:
    'M40 14h20l5 8 8 4-5 11-8-5v58a3 3 0 0 1-3 3H43a3 3 0 0 1-3-3V32l-8 5-5-11 8-4zM50 22v10M44 36l6 6 6-6',
  shirt:
    'M38 16h10l2 5 4 2 4-2 2-5h10l10 9-6 9-9-6v55a3 3 0 0 1-3 3H43a3 3 0 0 1-3-3V29l-9 6-6-9zM50 23v4',
  sweater:
    'M34 22c6-6 10-8 16-8s10 2 16 8l12 10-6 9-9-6v49a3 3 0 0 1-3 3H40a3 3 0 0 1-3-3V35l-9 6-6-9zM50 18v8',
  skirt: 'M32 20h36l8 76H24zM32 20l3 20M68 20l-3 20M24 96h52',
  trousers:
    'M34 14h32l2 92h-12l-5-54-5 54H34zM34 14l-2 16M66 14l2 16',
}

export function GarmentIllustration({
  variant,
  className,
}: GarmentIllustrationProps) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      <path d={paths[variant]} />
    </svg>
  )
}
