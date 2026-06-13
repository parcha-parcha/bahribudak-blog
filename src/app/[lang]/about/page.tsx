import type { Lang } from '@/lib/i18n'
import Image from 'next/image'
import Link from 'next/link'

interface AboutProps {
  params: Promise<{ lang: string }>
}

const experience = [
  { company: 'Rota Tekstil San. Tic. A.Ş.', role: 'Genel Müdür Yardımcısı', note: 'Üst düzey operasyon yönetimi' },
  { company: 'Karagözlüler Tekstil San. Tic. Ltd. Şti.', role: 'İşletme Müdürü', note: '' },
  { company: 'İnternet Tekstil San. Tic. A.Ş.', role: 'İşletme Müdürü', note: '' },
  { company: 'Halis Tekstil San. Tic. Ltd. Şti.', role: 'İşletme Müdürü', note: '' },
  { company: 'Botaş Nehir Tekstil', role: 'İşletme Müdürü', note: '' },
  { company: 'Birlik Örme San. Tic. A.Ş.', role: 'Fabrika Müdürü', note: '' },
  { company: 'Tübaş Tekstil', role: 'İşletme Müdürü', note: '' },
  { company: 'Turbo Tekstil San. Tic. A.Ş.', role: 'Boyahane Müdürü', note: '' },
  { company: 'Senova Tekstil San. Tic. A.Ş.', role: 'Gece Müdürü', note: '' },
  { company: 'Yupak Boyama San. Tic. A.Ş.', role: 'İşletme Şefi', note: '' },
]

const skills = [
  'Boyahane & terbiye proses yönetimi',
  'Fabrika & işletme yönetimi',
  'Proses optimizasyonu & verimlilik analizi',
  'Maliyet kontrolü & kriz yönetimi',
  'Vardiya organizasyonu',
  'MS Excel & raporlama',
  'Adobe Photoshop & Illustrator',
]

const pillars = [
  { emoji: '🧵', label: 'Tekstil', desc: '35 yıllık saha deneyimi' },
  { emoji: '🇹🇷', label: 'Türkiye', desc: 'Gündem ve sektör analizi' },
  { emoji: '🌱', label: 'Kişisel Gelişim', desc: 'İlham ve motivasyon' },
]

const stats = [
  { number: '35', unit: 'Yıl', label: 'Tekstil Deneyimi' },
  { number: '10+', unit: 'Şirket', label: 'Yönetici Rolü' },
  { number: 'GMY', unit: '', label: 'Genel Müdür Yrd.' },
  { number: '3', unit: 'Sütun', label: 'İçerik Kategorisi' },
]

export default async function AboutPage({ params }: AboutProps) {
  const { lang } = await params

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <div className="max-w-3xl mx-auto px-6 py-16">

      {/* ── HEADER ── */}
      <div className="mb-14">
        <p className="section-label">Hakkımda</p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          Tekstil —{' '}
          <span className="text-yellow-bb">Türkiye</span> — Kişisel Gelişim
        </h1>
        <div className="w-12 h-1 bg-yellow-bb mb-6" />
      </div>

      {/* ── PROFİL KARTI ── */}
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-14 p-8 rounded-2xl border border-gray-border bg-white shadow-sm">
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image
            src="/images/bahri-budak.jpeg"
            alt="Bahri Budak"
            fill
            className="object-cover object-top rounded-2xl"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-navy mb-1">Bahri Budak</h2>
          <p className="text-yellow-bb font-semibold text-sm mb-3">
            Üst Düzey Tekstil Yöneticisi · İşletme & Fabrika Müdürü
          </p>
          <p className="text-navy/90 text-sm leading-relaxed mb-4">
            Ergene / Tekirdağ tekstil havzasında boyahane, terbiye ve fabrika operasyonlarında
            35 yıllık üretim ve yönetim deneyimine sahip üst düzey yönetici.
            Operasyonel birikimini dijital içerik üretimiyle harmanlıyor.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Ergene / Tekirdağ', 'bahribudak@gmail.com'].map((tag) => (
              <span key={tag} className="text-xs bg-gray-soft border border-gray-border text-navy/90 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── İSTATİSTİKLER ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14">
        {stats.map((s) => (
          <div key={s.label}
            className="rounded-xl p-5 text-center border border-gray-border bg-white shadow-sm">
            <div className="flex items-end justify-center gap-1 mb-1">
              <span className="text-3xl font-bold text-navy">{s.number}</span>
              {s.unit && <span className="text-sm font-semibold text-navy/75 mb-0.5">{s.unit}</span>}
            </div>
            <p className="text-xs text-navy/85 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── PROFESYONEL PROFIL ── */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-3">
          <div className="w-1 h-6 bg-yellow-bb rounded-full" />
          Profesyonel Profil
        </h2>
        <div className="space-y-4 text-navy/85 leading-relaxed text-sm">
          <p>
            Tekstil sektöründe 35 yıllık üretim ve yönetim deneyimine sahip; boyahane,
            terbiye ve fabrika operasyonlarında uzman üst düzey yöneticiyim.
            İşletme ve fabrika müdürlüğü rollerinde üretim organizasyonu, vardiya yönetimi,
            proses verimliliği ve maliyet kontrolüne odaklanan saha temelli bir yönetim
            anlayışı geliştirdim.
          </p>
          <p>
            Genel Müdür Yardımcılığı deneyimiyle operasyonel birikimimi stratejik yönetim
            perspektifiyle birleştiriyorum. Ergene/Tekirdağ tekstil havzasında büyük ölçekli
            işletmelerde edindiğim alan bilgisini; tekstil, kişisel gelişim ve Türkiye gündemi
            üzerine ürettiğim içeriklerle paylaşıyorum.
          </p>
          <p>
            Adobe Creative Suite araçlarıyla dijital tasarım yetkinliği kazanarak
            teknik bilgimi görsel iletişimle destekliyorum.
          </p>
        </div>
      </div>

      {/* ── DENEYİM ── */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-3">
          <div className="w-1 h-6 bg-yellow-bb rounded-full" />
          Profesyonel Deneyim
        </h2>
        <p className="text-xs text-navy/85 mb-4 italic">
          Çalışma tarihleri ve referanslar talep doğrultusunda sunulur.
        </p>
        <div className="flex flex-col gap-3">
          {experience.map((e, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-border bg-white hover:border-navy/30 transition-all">
              <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-navy/85">{i + 1}</span>
              </div>
              <div>
                <p className="font-bold text-navy text-sm">{e.company}</p>
                <p className="text-yellow-bb text-xs font-semibold mt-0.5">{e.role}</p>
                {e.note && <p className="text-navy/85 text-xs mt-0.5 italic">{e.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── YETKİNLİKLER ── */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-3">
          <div className="w-1 h-6 bg-yellow-bb rounded-full" />
          Yetkinlikler
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="flex items-center gap-2 bg-white border border-gray-border text-navy text-sm px-4 py-2 rounded-full">
              <span className="text-yellow-bb text-xs">✦</span>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── İÇERİK SÜTUNLARI ── */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-navy mb-2 flex items-center gap-3">
          <div className="w-1 h-6 bg-yellow-bb rounded-full" />
          Blog & İçerik
        </h2>
        <p className="text-navy/75 text-sm mb-6">
          Üç ana sütun etrafında düzenli içerik üretiyorum.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <Link key={p.label} href={`/${lang}/blog`}
              className="flex flex-col items-center text-center p-5 rounded-xl border border-gray-border bg-white hover:border-navy hover:shadow-card transition-all group">
              <span className="text-3xl mb-3">{p.emoji}</span>
              <span className="font-bold text-navy text-sm group-hover:text-yellow-bb transition-colors">{p.label}</span>
              <span className="text-xs text-navy/85 mt-1 leading-snug">{p.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-border" />
        <div className="w-2 h-2 rounded-full bg-yellow-bb" />
        <div className="flex-1 h-px bg-gray-border" />
      </div>

      {/* ── CTA ── */}
      <div className="text-center">
        <p className="text-navy/90 mb-6 text-sm">İletişime geçmek veya hizmetleri incelemek için:</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={`/${lang}/contact`} className="btn-primary">
            İletişime Geç →
          </Link>
          <Link href={`/${lang}/hizmetler`} className="btn-outline">
            Hizmetler
          </Link>
        </div>
        <p className="text-navy/85 text-xs mt-6">bahribudak@gmail.com · Ergene / Tekirdağ</p>
      </div>

      </div>
    </main>
  )
}
