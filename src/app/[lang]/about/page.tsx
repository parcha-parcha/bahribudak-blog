import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

interface HizmetlerProps {
  params: Promise<{ lang: string }>
}

const adobeServices = [
  { name: 'Poster', price: '500 – 800 TL' },
  { name: 'Afiş', price: '500 – 800 TL' },
  { name: 'Logo', price: '1.000 – 2.000 TL' },
  { name: 'El İlanı', price: '300 – 500 TL' },
  { name: 'Broşür', price: '600 – 1.000 TL' },
  { name: 'Katalog (8-16 sayfa)', price: '1.500 – 2.500 TL' },
  { name: 'Dergi (12-24 sayfa)', price: '2.500 – 4.000 TL' },
]

const blogServices = [
  { name: 'Kısa makale (500-800 kelime)', price: '300 – 500 TL' },
  { name: 'Orta makale (800-1.500 kelime)', price: '500 – 900 TL' },
  { name: 'Uzun makale (1.500+ kelime)', price: '900 – 1.500 TL' },
]

const reasons = [
  { icon: '🏭', text: 'Yılların fabrika yönetimi deneyimi' },
  { icon: '📚', text: 'Felsefe ve kişisel gelişim birikimi' },
  { icon: '🇹🇷', text: 'Türkiye tekstil sektörüne hakimiyet' },
  { icon: '🎯', text: 'Sonuç odaklı, pratik çözümler' },
]

export default async function HizmetlerPage({ params }: HizmetlerProps) {
  const { lang } = await params

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="section-label">Hizmetler</p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          Birlikte <span className="text-yellow-bb">büyüyelim</span>
        </h1>
        <div className="w-12 h-1 bg-yellow-bb mb-6" />
        <p className="text-navy/70 text-lg leading-relaxed">
          Tekstil, tasarım, içerik ve danışmanlık alanlarında profesyonel destek sunuyorum.
        </p>
      </div>

      {/* Hizmet 1 - Danışmanlık */}
      <div className="border-2 border-navy rounded-xl p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold text-navy">🏭 Danışmanlık</p>
            <p className="text-navy/60 text-sm font-medium mt-1">Fabrika Yönetimi & Lean Üretim</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-navy">5.000 TL / ay</p>
            <span className="inline-block bg-yellow-pale border border-yellow-bb/40 text-navy text-xs font-semibold px-3 py-1 rounded-full mt-2">
              ✨ İlk görüşme ücretsiz
            </span>
          </div>
        </div>
        <div className="h-px bg-gray-border mb-4" />
        <p className="text-navy/70 leading-relaxed mb-4">
          Tekstil fabrikalarında üretim verimliliği, süreç iyileştirme ve lean yönetim konularında birebir danışmanlık hizmeti sunuyorum.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Ayda 2-4 saha ziyareti', 'Online destek dahil', 'Haftalık ilerleme raporu'].map((d) => (
            <span key={d} className="flex items-center gap-2 bg-gray-50 border border-gray-border text-navy text-sm font-medium px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-bb inline-block" />
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Hizmet 2 - İçerik */}
      <div className="border border-gray-border rounded-xl p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold text-navy">✍️ İçerik Üretimi & Sosyal Medya</p>
            <p className="text-navy/60 text-sm font-medium mt-1">LinkedIn & Instagram</p>
          </div>
          <p className="text-2xl font-bold text-navy">2.000 – 3.500 TL / ay</p>
        </div>
        <div className="h-px bg-gray-border mb-4" />
        <p className="text-navy/70 leading-relaxed mb-4">
          Markanızı büyütmek için haftalık içerik takvimi, özgün yazılar ve görsel tasarımlarla sosyal medya yönetimi yapıyorum.
        </p>
        <div className="flex flex-wrap gap-2">
          {['LinkedIn + Instagram', 'Haftalık içerik takvimi', 'Görsel tasarım dahil'].map((d) => (
            <span key={d} className="flex items-center gap-2 bg-gray-50 border border-gray-border text-navy text-sm font-medium px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-bb inline-block" />
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Hizmet 3 - Adobe */}
      <div className="border border-gray-border rounded-xl p-8 mb-6">
        <div className="mb-4">
          <p className="text-2xl font-bold text-navy">🎨 Adobe Tasarım Hizmetleri</p>
          <p className="text-navy/60 text-sm font-medium mt-1">Profesyonel Grafik Tasarım</p>
        </div>
        <div className="h-px bg-gray-border mb-4" />
        <p className="text-navy/70 leading-relaxed mb-6">
          Adobe Creative Suite ile profesyonel tasarım çözümleri. Her proje için özgün ve kurumsal kimliğinize uygun tasarımlar.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {adobeServices.map((s) => (
            <div key={s.name} className="flex items-center justify-between bg-gray-50 border border-gray-border rounded-lg px-4 py-3">
              <span className="text-navy text-sm font-medium">{s.name}</span>
              <span className="text-navy text-sm font-bold ml-4 whitespace-nowrap">{s.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hizmet 4 - Blog */}
      <div className="border border-gray-border rounded-xl p-8 mb-12">
        <div className="mb-4">
          <p className="text-2xl font-bold text-navy">📝 Blog Yazarlığı</p>
          <p className="text-navy/60 text-sm font-medium mt-1">Tekstil · Felsefe · Kişisel Gelişim · Kurumsal</p>
        </div>
        <div className="h-px bg-gray-border mb-4" />
        <p className="text-navy/70 leading-relaxed mb-6">
          SEO uyumlu, özgün ve derinlikli blog yazıları. Sektörel bilgi ile felsefi derinliği bir araya getiren içerikler.
        </p>
        <div className="flex flex-col gap-3">
          {blogServices.map((s) => (
            <div key={s.name} className="flex items-center justify-between bg-gray-50 border border-gray-border rounded-lg px-4 py-3">
              <span className="text-navy text-sm font-medium">{s.name}</span>
              <span className="text-navy text-sm font-bold ml-4 whitespace-nowrap">{s.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Neden Bahri Budak */}
      <div className="bg-navy rounded-xl p-8 mb-12">
        <h2 className="text-white text-2xl font-bold mb-2">
          Neden <span className="text-yellow-bb">Bahri Budak?</span>
        </h2>
        <p className="text-white/50 text-sm mb-6">Deneyim, birikim ve güven.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div key={r.text} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
              <span className="text-2xl">{r.icon}</span>
              <span className="text-white/80 text-sm font-medium leading-snug">{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-border" />
        <div className="w-2 h-2 rounded-full bg-yellow-bb" />
        <div className="flex-1 h-px bg-gray-border" />
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-navy/60 mb-6">Projenizi konuşmak için hemen iletişime geçin.</p>
        <a
          href="mailto:bahribudak@gmail.com?subject=Hizmet Talebi"
          className="btn-primary inline-block"
        >
          Teklif Al →
        </a>
        <p className="text-navy/40 text-sm mt-4">bahribudak@gmail.com</p>
      </div>

    </div>
  )
}
