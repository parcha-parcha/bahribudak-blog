type BrandLogoVariant =
  | 'symbol'
  | 'compact'
  | 'full'
  | 'short'
  | 'labeled'

type BrandLogoProps = {
  variant?: BrandLogoVariant
  className?: string
  priority?: boolean
  tone?: 'dark' | 'light'
}

export default function BrandLogo({
  variant = 'compact',
  className = '',
  tone = 'dark',
}: BrandLogoProps) {
  const normalizedVariant =
    variant === 'short'
      ? 'symbol'
      : variant === 'labeled'
        ? 'full'
        : variant

  const ink = tone === 'light' ? '#FFFFFF' : '#111315'
  const muted = tone === 'light' ? 'rgba(255,255,255,0.82)' : '#6F7782'
  const divider =
    tone === 'light' ? 'rgba(255,255,255,0.30)' : '#D8D5CD'
  const accent = '#E45A2B'

  const viewBox =
    normalizedVariant === 'symbol'
      ? '0 0 80 80'
      : normalizedVariant === 'compact'
        ? '0 0 300 80'
        : '0 0 470 80'

  const defaultClass =
    normalizedVariant === 'symbol'
      ? 'h-12 w-12'
      : normalizedVariant === 'compact'
        ? 'h-14 w-auto max-w-full'
        : 'h-28 w-auto max-w-full'

  const title =
    normalizedVariant === 'symbol'
      ? 'Bahri Budak'
      : 'Bahri Budak — Teknik Yayınlar, Danışmanlık ve Tekstil Sistemleri'

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={title}
      className={`${className || defaultClass} shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      style={{ display: 'block', maxWidth: '100%', overflow: 'visible' }}
    >
      <g
        fill="none"
        strokeLinecap="square"
        strokeWidth={normalizedVariant === 'full' ? 10 : 7}
        aria-hidden="true"
      >
        <path d="M8 18H60" stroke={ink} />
        <path d="M8 38H60" stroke={ink} />
        <path d="M8 58H46" stroke={ink} />
        <path d="M54 58H68" stroke={accent} />
      </g>

      {normalizedVariant !== 'symbol' && (
        <>
          <line
            x1="84"
            y1={normalizedVariant === 'full' ? 6 : 10}
            x2="84"
            y2={normalizedVariant === 'full' ? 72 : 68}
            stroke={divider}
            strokeWidth="2"
            aria-hidden="true"
          />

          <text
            x="104"
            y={normalizedVariant === 'full' ? 39 : 35}
            fill={ink}
            fontFamily="Acumin Pro, Inter, Arial, sans-serif"
            fontSize={normalizedVariant === 'full' ? 35 : 25}
            fontWeight="600"
            letterSpacing={normalizedVariant === 'full' ? 4.5 : 3.4}
            aria-hidden="true"
          >
            BAHRİ BUDAK
          </text>

          {normalizedVariant === 'full' && (
            <>
              <text
                x="105"
                y="68"
                fill={muted}
                fontFamily="Acumin Pro, Inter, Arial, sans-serif"
                fontSize="11.4"
                fontWeight="600"
                letterSpacing="1.45"
                aria-hidden="true"
              >
                TEKNİK YAYINLAR · DANIŞMANLIK · TEKSTİL SİSTEMLERİ
              </text>

            </>
          )}
        </>
      )}
    </svg>
  )
}
