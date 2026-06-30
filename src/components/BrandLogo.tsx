type BrandLogoProps = {
  variant?: 'short' | 'labeled'
  className?: string
  priority?: boolean
}

export default function BrandLogo({
  variant = 'short',
  className = '',
  priority = false,
}: BrandLogoProps) {
  const src =
    variant === 'labeled'
      ? '/brand/bb-logo-tanimli-kurumsal.svg'
      : '/brand/bb-logo-kisa-kurumsal.svg'

  const alt =
    variant === 'labeled'
      ? 'Bahri Budak - Tekstil Proses Danışmanlığı resmî logosu'
      : 'Bahri Budak resmî logosu'

  const defaultClass =
    variant === 'labeled'
      ? 'h-64 w-64 max-w-full'
      : 'h-20 w-20'

  return (
    <img
      src={src}
      alt={alt}
      className={`${className || defaultClass} shrink-0 object-contain`}
      style={{ display: 'block', maxWidth: '100%' }}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
