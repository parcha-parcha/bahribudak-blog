const LINKEDIN_URL = 'https://www.linkedin.com/in/bahri-budak-052ab5b8'
const INSTAGRAM_URL = 'https://www.instagram.com/bahribudak/'

const socialLinks = [
  {
    href: LINKEDIN_URL,
    label: 'LinkedIn',
  },
  {
    href: INSTAGRAM_URL,
    label: 'Instagram',
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
          className="rounded-md border border-[#E5E2DA] bg-white px-3 py-1.5 text-[12px] font-bold text-[#111315] transition-colors hover:border-[#E45A2B] hover:bg-[#E45A2B] hover:text-[#111315] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}