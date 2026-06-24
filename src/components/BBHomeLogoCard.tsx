import BrandLogo from '@/components/BrandLogo'

export default function BBHomeLogoCard() {
  return (
    <div className="flex min-h-[260px] w-full items-center justify-center rounded-[24px] border border-white/30 bg-[#F5F7FA] p-4 shadow-[0_20px_56px_rgba(0,0,0,0.20)]">
      <BrandLogo variant="labeled" className="h-full max-h-[225px] w-full" priority />
    </div>
  )
}
