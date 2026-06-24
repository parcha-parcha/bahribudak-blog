import BrandLogo from '@/components/BrandLogo'

export default function BBHomeLogoCard() {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center rounded-[30px] border border-white/30 bg-[#F5F7FA] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
      <BrandLogo variant="labeled" className="h-full max-h-[310px] w-full" priority />
    </div>
  )
}
