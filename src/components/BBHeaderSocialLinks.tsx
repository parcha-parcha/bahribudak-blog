const LINKEDIN_URL = 'https://www.linkedin.com/in/bahri-budak-052ab5b8'
const INSTAGRAM_URL = 'https://www.instagram.com/bahribudak/'

const socialLinks = [
  {
    href: LINKEDIN_URL,
    label: 'LinkedIn',
    shortLabel: 'in',
  },
  {
    href: INSTAGRAM_URL,
    label: 'Instagram',
    shortLabel: 'ig',
  },
]

export default function BBHeaderSocialLinks() {
  return (
    <div className="flex items-center gap-1.5">
      {socialLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D7E0EA] bg-white/80 text-[11px] font-black uppercase tracking-tight text-navy shadow-sm transition-colors hover:border-[#2EA6D9] hover:bg-[#2EA6D9] hover:text-white"
        >
          {item.shortLabel}
        </a>
      ))}
    </div>
  )
}