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

  const defaultClass = variant === 'mark'
    ? 'h-16 w-16'
    : variant === 'vertical'
      ? 'h-80 md:h-[380px] w-auto max-w-full'
      : 'w-[9cm] h-[2.5cm] max-w-full'

  return (
    <img
      src={src}
      alt={alt}
      className={`${className || defaultClass} object-contain shrink-0`}
      style={{ display: 'block', maxWidth: '100%' }}
      loading="eager"
      decoding="async"
    />
  )
}
