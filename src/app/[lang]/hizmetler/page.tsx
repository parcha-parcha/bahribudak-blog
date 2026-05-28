import type { Lang } from '@/lib/i18n'
import Link from 'next/link'

interface HizmetlerProps {
  params: Promise<{ lang: string }>
}

const services = [
  {
    emoji: '🧵',
    title: 'Tekstil Danışmanlığı',
    subtitle: 'Boyahane · Terbiye · Fabrika Yönetimi',
    description: 'Tekstil fabrikalarında boyahane ve terbiye proses yönetimi, üretim verimliliği, maliyet kontrolü ve kriz yönetimi konularında 35 yıllık saha deneyimiyle danışmanlık.',
    items: [
      'Boyahane & terbiye proses yönetimi',
      'Fabrika & işletme yönetimi',
      'Proses optimizasyonu & verimlilik analizi',
      'Maliyet kontrolü & kriz yönetimi',
      'Vardiya organizasyonu & operasyonel süreklilik',
    ],
  },
  {
    emoji: '🎨',
    title: 'Görsel İçerik Tasarımı',
    subtitle: 'Photoshop · Illustrator · InDesign · CorelDraw',
    description: 'Adobe Creative Suite araçlarıyla profesyonel grafik tasarım hizmetleri. Tekstil sektörüne özgü katalog, marka kimliği ve kurumsal tasarım çözümleri.',
    items: [
      'Tekstil katalog tasarımı (InDesign)',
      'Marka kimliği & logo tasarımı (Illustrator)',
      'Ürün görseli düzenleme (Photoshop)',
      'Dergi & broşür tasarımı (InDesign + CorelDraw)',
      'Afiş, poster & el ilanı',
    ],
  },
  {
    emoji: '✍️',
    title: 'İçerik & Blog Yazarlığı',
    subtitle: 'LinkedIn · Blog · Tekstil · Kişisel Gelişim',
    description: 'Sektörel bilgi ile felsefi derinliği bir araya getiren, SEO uyumlu özgün blog yazıları ve LinkedIn içerik yönetimi.',
    items: [
      'LinkedIn içerik yönetimi & strateji',
      'Sektörel blog yazarlığı (tekstil, felsefe, gündem)',
      'Tekstil teknik içerik üretimi',
      'Kişisel marka danışmanlığı',
    ],
  },
]

const reasons = [
  { emoji: '🏭', title: '35 Yıl Saha Deneyimi', desc: 'Boyahane, terbiye ve fabrika yönetiminde fiilen edinilmiş birikim' },
  { emoji: '🎯', title: 'Sonuç Odaklı Yaklaşım', desc: 'Teori değil, uygulamaya dayalı pratik çözümler' },
  { emoji: '🇹🇷', title: 'Sektör Hakimiyeti', desc: 'Ergene/Tekirdağ tekstil havzasında derin alan bilgisi' },
  { emoji: '💻', title: 'Dijital Yetkinlik', desc: 'Adobe Creative Suite + Excel ile desteklenen modern yaklaşım' },
]

export default async function HizmetlerPage({ params }: HizmetlerProps) {
  const { lang } = await params

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-8">

      {/* ── HEADER ── */}
      <div className="mb-14">
        <p className="section-label">Hizmetler</p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          Birlikte <span className="text-yellow-bb">büyüyelim</span>
        </h1>
        <div className="w-12 h-1 bg-yellow-bb mb-6" />
        <p className="text-navy/70 text-lg leading-relaxed">
          35 yıllık tekstil deneyimini dijital yetkinlikle harmanlayan profesyonel destek.
        </p>
      </div>

      {/* ── HİZMET KARTLARI ── */}
      <div className="flex flex-col gap-6 mb-14">
        {services.map((s) => (
          <div key={s.title} className="border border-gray-border rounded-2xl p-8 hover:border-navy hover:shadow-card transition-all group">
            {/* Başlık */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl flex-shrink-0">{s.emoji}</div>
              <div>
                <h2 className="text-xl font-bold text-navy">{s.title}</h2>
                <p className="text-xs text-navy/40 font-medium mt-0.5 tracking-wide">{s.subtitle}</p>
              </div>
            </div>

            {/* Sarı çizgi */}
            <div className="w-8 h-1 bg-yellow-bb mb-4 group-hover:w-14 transition-all" />

            {/* Açıklama */}
            <p className="text-navy/70 leading-relaxed mb-5 text-sm">{s.description}</p>

            {/* Hizmet maddeleri */}
            <ul className="space-y-2.5">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy/80">
                  <span className="text-yellow-bb mt-0.5 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── NEDEN BAHRİ BUDAK ── */}
      <div className="rounded-2xl p-8 mb-14" style={{ background: '#08080c' }}>
        <h2 className="text-white text-2xl font-bold mb-1">
          Neden <span style={{ color: '#f5c518' }}>Bahri Budak?</span>
        </h2>
        <p className="text-white/40 text-sm mb-8">Deneyim, birikim ve güven.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div key={r.title}
              className="rounded-xl px-5 py-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{r.emoji}</span>
                <span className="text-white font-bold text-sm">{r.title}</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="my-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-border" />
        <div className="w-2 h-2 rounded-full bg-yellow-bb" />
        <div className="flex-1 h-px bg-gray-border" />
      </div>

      {/* ── CTA ── */}
      <div className="text-center pb-4">
        <p className="text-navy/60 mb-6 text-sm">Projenizi konuşmak için hemen iletişime geçin.</p>
        <a
          href="mailto:bahribudak@gmail.com?subject=Hizmet Talebi"
          className="btn-primary inline-flex"
        >
          İletişime Geç →
        </a>
        <p className="text-navy/40 text-xs mt-4">bahribudak@gmail.com</p>
      </div>

    </div>
  )
}
