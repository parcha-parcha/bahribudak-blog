import BrandLogo from '@/components/BrandLogo'

export default function BBHomeLogoCard() {
  return (
    <div className="flex min-h-[220px] w-full items-center justify-center lg:justify-end">
      <BrandLogo
        variant="full"
        tone="light"
        className="h-auto w-full max-w-[520px]"
        priority
      />
    </div>
  )
}
