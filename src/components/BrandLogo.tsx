type BrandLogoProps = {
  variant?: 'short' | 'labeled'
  className?: string
  priority?: boolean
}

export default function BrandLogo({
  variant = 'short',
  className = '',
}: BrandLogoProps) {
  const isLabeled = variant === 'labeled'

  const defaultClass = isLabeled
    ? 'h-16 w-auto max-w-full'
    : 'h-12 w-12'

  return (
    <svg
      viewBox={isLabeled ? '0 0 350 84' : '0 0 80 80'}
      role="img"
      aria-labelledby={isLabeled ? 'bb-logo-title-full' : 'bb-logo-title-short'}
      className={`${className || defaultClass} shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      style={{ display: 'block', maxWidth: '100%' }}
    >
      <title id={isLabeled ? 'bb-logo-title-full' : 'bb-logo-title-short'}>
        {isLabeled
          ? 'Bahri Budak — Teknik Yayınlar, Danışmanlık ve Tekstil Sistemleri'
          : 'Bahri Budak'}
      </title>

      <g
        transform={isLabeled ? 'translate(0 4)' : undefined}
        fill="none"
        strokeLinecap="square"
        strokeWidth="7"
        aria-hidden="true"
      >
        <path d="M8 19H60" stroke="#111315" />
        <path d="M8 39H60" stroke="#111315" />
        <path d="M8 59H46" stroke="#111315" />
        <path d="M54 59H68" stroke="#E45A2B" />
      </g>

      {isLabeled && (
        <g transform="translate(0 4)" aria-hidden="true">
          <line
            x1="84"
            y1="12"
            x2="84"
            y2="68"
            stroke="#D8D5CD"
            strokeWidth="2"
          />

          <text
            x="102"
            y="36"
            fill="#111315"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="25.5"
            fontWeight="650"
            letterSpacing="3.4"
          >
            BAHRİ BUDAK
          </text>

          <text
            x="103"
            y="57"
            fill="#6F7782"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="7.8"
            fontWeight="650"
            letterSpacing="1.05"
          >
            TEKNİK YAYINLAR · DANIŞMANLIK · TEKSTİL SİSTEMLERİ
          </text>
        </g>
      )}
    </svg>
  )
}
