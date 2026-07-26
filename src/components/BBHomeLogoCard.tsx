import BrandLogo from '@/components/BrandLogo'

export default function BBHomeLogoCard() {
  return (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center px-3 lg:min-h-[430px] lg:justify-center lg:px-0">
      <BrandLogo
        variant="full"
        tone="light"
        className="h-auto w-[92vw] max-w-[780px] md:w-[68vw] lg:w-[42vw] xl:w-[38vw]"
        priority
      />
    </div>
  )
}
