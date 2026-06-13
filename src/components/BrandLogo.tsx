type BrandLogoProps = {
  variant?: 'horizontal' | 'mark'
  negative?: boolean
  className?: string
}

export default function BrandLogo({ variant = 'horizontal', negative = false, className = '' }: BrandLogoProps) {
  const dark = '#5F6368'
  const mid = '#AEB4BC'
  const light = '#DDE3EA'
  // Yazı rengi SVG'nin className içindeki text-* renginden gelsin.
  // Böylece açık modda lacivert, koyu modda beyaz net okunur.
  const navy = negative ? '#FFFFFF' : 'currentColor'
  const sub = negative ? '#DDE3EA' : 'currentColor'
  const Mark = ({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M36 0H109V65H36C15 65 4 53 4 32.5S15 0 36 0Z" fill={dark}/>
      <path d="M120 0H190C211 0 222 12 222 32.5S211 65 190 65H120Z" fill={mid}/>
      <path d="M36 93H109V158H36C15 158 4 146 4 125.5S15 93 36 93Z" fill={light}/>
      <path d="M120 93H190C211 93 222 105 222 125.5S211 158 190 158H120Z" fill={dark}/>
      <rect x="47" y="33" width="31" height="17" rx="8.5" fill="#FFFFFF"/>
      <rect x="155" y="33" width="31" height="17" rx="8.5" fill="#FFFFFF"/>
      <rect x="43" y="107" width="31" height="17" rx="8.5" fill="#FFFFFF"/>
      <rect x="153" y="107" width="31" height="17" rx="8.5" fill="#FFFFFF"/>
    </g>
  )
  if (variant === 'mark') {
    return <svg viewBox="0 0 226 158" className={className} aria-label="Bahri Budak amblem" role="img"><Mark /></svg>
  }
  return (
    <svg viewBox="0 0 610 150" className={className} aria-label="Bahri Budak logo" role="img">
      <Mark x={0} y={15} scale={210 / 226} />
      <line x1="245" y1="20" x2="245" y2="130" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2"/>
      <text x="280" y="66" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="700" letterSpacing="1.6" fill={navy}>BAHRİ BUDAK</text>
      <text x="282" y="102" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="400" letterSpacing="2.2" fill={sub} opacity="0.78">DANIŞMANLIK • EĞİTİM • TEKSTİL</text>
      <text x="282" y="130" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill={sub} opacity="0.86">bahribudak.com</text>
    </svg>
  )
}
