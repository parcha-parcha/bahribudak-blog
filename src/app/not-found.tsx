import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[#F5F7FA] px-6 py-20 text-[#0B2343]">
      <div className="mx-auto max-w-2xl rounded-[30px] border border-[#D8DDE5] bg-white p-8 text-center shadow-sm md:p-12">
        <p className="text-sm font-black tracking-[0.2em] text-[#2EA6D9]">404</p>
        <h1 className="mt-4 text-4xl font-bold">Sayfa bulunamadı / Page not found</h1>
        <p className="mt-5 leading-relaxed text-[#4C5561]">
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
