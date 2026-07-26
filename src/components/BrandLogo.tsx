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
    ? 'h-14 w-auto max-w-full'
    : 'h-12 w-12'

  return (
    <svg
      viewBox={isLabeled ? '0 0 640 96' : '0 0 96 96'}
      role="img"
      aria-labelledby={isLabeled ? 'bb-logo-title-full' : 'bb-logo-title-short'}
      className={`${className || defaultClass} shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      style={{ display: 'block', maxWidth: '100%', overflow: 'visible' }}
    >
      <title id={isLabeled ? 'bb-logo-title-full' : 'bb-logo-title-short'}>
        {isLabeled
          ? 'Bahri Budak — Teknik Yayınlar, Danışmanlık ve Tekstil Sistemleri'
          : 'Bahri Budak'}
      </title>

      {/* BB-OS sembolü: yayın, süreç ve ilerleme */}
      <g
        fill="none"
        strokeLinecap="square"
        strokeWidth="8"
        aria-hidden="true"
      >
        <path d="M12 24H74" stroke="#111315" />
        <path d="M12 46H74" stroke="#111315" />
        <path d="M12 68H58" stroke="#111315" />
        <path d="M66 68H82" stroke="#E45A2B" />
      </g>

      {isLabeled && (
        <g aria-hidden="true">
          <line
            x1="108"
            y1="16"
            x2="108"
            y2="80"
            stroke="#D8D5CD"
            strokeWidth="2"
          />

          <text
            x="132"
            y="44"
            fill="#111315"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="29"
            fontWeight="600"
            letterSpacing="4.6"
          >
            BAHRİ BUDAK
          </text>

          <text
            x="133"
            y="68"
            fill="#6F7782"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="9.5"
            fontWeight="600"
            letterSpacing="1.6"
          >
            TEKNİK YAYINLAR · DANIŞMANLIK · TEKSTİL SİSTEMLERİ
          </text>
        </g>
      )}
    </svg>
  )
}
