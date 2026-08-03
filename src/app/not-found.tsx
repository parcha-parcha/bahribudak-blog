import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[#F6F4EF] px-6 py-20 text-[#111315]">
      <div className="mx-auto max-w-2xl rounded-lg border border-[#E5E2DA] bg-white p-8 text-center md:p-12">
        <p className="text-sm font-black tracking-[0.2em] text-[#E45A2B]">404</p>
        <h1 className="mt-4 text-4xl font-bold">Sayfa bulunamadı / Page not found</h1>
        <p className="mt-5 leading-relaxed text-[#6F7782]">
          Aradığınız içerik taşınmış veya kaldırılmış olabilir. The content may have been moved or removed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/tr" className="btn-primary">Türkçe Ana Sayfa</Link>
          <Link href="/en" className="btn-outline">English Home</Link>
        </div>
      </div>
    </main>
  )
}
