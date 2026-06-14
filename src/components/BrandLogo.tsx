type BrandLogoProps = {
  variant?: 'horizontal' | 'mark' | 'vertical'
  negative?: boolean
  className?: string
}

export default function BrandLogo({ variant = 'horizontal', negative = false, className = '' }: BrandLogoProps) {
  const src = variant === 'mark'
    ? '/brand/bb-logo-amblem.svg'
    : variant === 'vertical'
      ? (negative ? '/brand/bb-logo-dikey-negatif.svg' : '/brand/bb-logo-dikey.svg')
      : (negative ? '/brand/bb-logo-yatay-negatif.svg' : '/brand/bb-logo-yatay.svg')

  const alt = variant === 'mark'
    ? 'Bahri Budak amblem'
    : 'Bahri Budak Tekstil Danışmanlığı logo'

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  )
}
