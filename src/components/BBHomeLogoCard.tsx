import BrandLogo from '@/components/BrandLogo'

export default function BBHomeLogoCard() {
  return (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center px-4 lg:min-h-[420px] lg:-translate-y-3 lg:translate-x-2 lg:px-0">
      <BrandLogo
        variant="full"
        tone="light"
        className="h-auto w-full max-w-[720px]"
        priority
      />
    </div>
  )
}
