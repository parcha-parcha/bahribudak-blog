import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const tr = params.lang === 'tr'
  return {
    title: tr ? 'Magazam | Bahri Budak' : 'My Store | Bahri Budak',
    description: tr
      ? 'Boyahane ve tekstil üretimi için profesyonel teknik dökümanlar, eğitim materyalleri ve danışmanlık hizmetleri.'
      : 'Professional technical documents, training materials and consulting services for dyehouse and textile production.',
  }
}

type Lang = 'tr' | 'en'

interface Product {
  id: string
  badge: string
  title: { tr: string; en: string }
  desc: { tr: string; en: string }
  price: { tr: string; en: string }
  gumroadUrl?: string
  highlight?: boolean
}

const products: Product[] = [
  {
    id: 'rys-belge-serisi',
    badge: '🏆',
    title: {
      tr: 'Boyahanelerde Renk İlavesi Yönetim Sistemi — RYS Belge Serisi',
      en: 'Dyehouse Colour Addition Management System — RYS Document Series',
    },
    desc: {
      tr: '35 yıllık saha deneyimiyle hazırlanmış renk ilavesi yönetim sistemi. 28 sayfa PDF + 17 ayrı .docx dosyası. Bölüm 1: İlk 6 bölüm. Bölüm 2: Maliyet hesaplama ve tasarruf analizi.',
      en: 'Colour addition management system prepared with 35 years of field experience. 28-page PDF + 17 separate .docx files. Part 1: First 6 sections. Part 2: Cost calculation and savings analysis.',
    },
    price: { tr: '₺990', en: '$29' },
    gumroadUrl: 'https://6762449615620.gumroad.com/l/pzpaal',
    highlight: true,
  },
  {
    id: 'tam-arsiv',
    badge: '📂',
    title: {
      tr: 'Tam Arşiv — 88 Teknik Döküman',
      en: 'Complete Archive — 88 Technical Documents',
    },
    desc: {
      tr: 'Boyahane yönetimi için hazırlanmış 88 adet A4 teknik döküman. Prosedürler, formlar, iş talimatları ve kontrol listeleri tek ZIP dosyasında.',
      en: '88 A4 technical documents prepared for dyehouse management. Procedures, forms, work instructions and checklists in a single ZIP file.',
    },
    price: { tr: '₺990', en: '$29' },
  },
  {
    id: 'aylik-gonderi',
    badge: '📬',
    title: {
      tr: 'Aylık Özel Gönderi',
      en: 'Monthly Special Report',
    },
    desc: {
      tr: 'Her ay bir konuda derinlemesine teknik analiz, vaka çalışması veya saha raporu. Boyahane, finishing ve üretim yönetimi.',
      en: 'An in-depth technical analysis, case study or field report on one topic each month. Dyehouse, finishing and production management.',
    },
    price: { tr: '₺199 / ay', en: '$6 / month' },
  },
  {
    id: 'ozel-siparis',
    badge: '🎯',
    title: {
      tr: 'Özel Sipariş & Danışmanlık',
      en: 'Custom Order & Consulting',
    },
    desc: {
      tr: 'Fabrikanıza özel prosedür, eğitim materyali veya teknik döküman hazırlanması. 35 yıllık boyahane deneyimiyle.',
      en: 'Custom procedure, training material or technical document preparation for your facility. With 35 years of dyehouse experience.',
    },
    price: { tr: 'Fiyat teklifi alın', en: 'Get a quote' },
  },
]

const content = {
  tr: {
    hero: 'Magazam',
    heroSub: 'Boyahane ve tekstil üretimi için teknik dökümanlar',
    heroDesc:
      '35 yıllık saha deneyiminden damıtılmış prosedürler, formlar ve analiz araçları. Hazır kullan, zaman kazan.',
    paymentTitle: 'Nasıl Satın Alınır?',
    paymentDesc: 'İki farklı ödeme seçeneği sunuyorum. Dilediğinizi seçebilirsiniz.',
    gumroad: 'Gumroad ile Öde',
    gumroadDesc: 'Kredi kartı veya PayPal ile anında teslim.',
    manual: 'IBAN ile Öde',
    manualDesc: 'Havale/EFT sonrası WhatsApp veya e-posta ile bildirin, dosyayı hemen gönderirim.',
    whatsapp: 'WhatsApp',
    email: 'E-posta',
    contact: 'İletişim',
    buyBtn: 'Satın Al',
    quoteBtn: 'Teklif Al',
    highlight: 'Yeni',
  },
  en: {
    hero: 'My Store',
    heroSub: 'Technical documents for dyehouse and textile production',
    heroDesc:
      'Procedures, forms and analysis tools distilled from 35 years of field experience. Ready to use, save time.',
    paymentTitle: 'How to Purchase?',
    paymentDesc: 'Two payment options are available. Choose whichever suits you.',
    gumroad: 'Pay with Gumroad',
    gumroadDesc: 'Instant delivery via credit card or PayPal.',
    manual: 'Pay via Bank Transfer',
    manualDesc: 'After transfer, notify me via WhatsApp or email and I will send the file immediately.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    contact: 'Contact',
    buyBtn: 'Buy Now',
    quoteBtn: 'Get a Quote',
    highlight: 'New',
  },
}

export default function MagazamPage({
  params,
}: {
  params: { lang: string }
}) {
  const lang = (params.lang === 'en' ? 'en' : 'tr') as Lang
  const t = content[lang]

  return (
    <main
      style={{ fontFamily: "'Poppins', sans-serif", background: '#f9fafb', minHeight: '100vh' }}
    >
      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f1a3a 0%, #1a3a5c 100%)',
          padding: '80px 24px 64px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              background: '#f5c518',
              color: '#0f1a3a',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              padding: '4px 14px',
              borderRadius: 4,
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            bahribudak.com
          </div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 800,
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {t.hero}
          </h1>
          <p style={{ color: '#f5c518', fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>
            {t.heroSub}
          </p>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* ÜRÜNLER */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: '32px 28px',
                border: p.highlight ? '2px solid #f5c518' : '1px solid #e5e7eb',
                position: 'relative',
                boxShadow: p.highlight
                  ? '0 8px 32px rgba(245,197,24,0.15)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {p.highlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: 28,
                    background: '#f5c518',
                    color: '#0f1a3a',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '3px 12px',
                    borderRadius: 20,
                    textTransform: 'uppercase',
                  }}
                >
                  {t.highlight}
                </div>
              )}

              <div>
                <span style={{ fontSize: 28 }}>{p.badge}</span>
                <h2
                  style={{
                    color: '#0f1a3a',
                    fontSize: 18,
                    fontWeight: 700,
                    margin: '8px 0 0',
                    lineHeight: 1.3,
                  }}
                >
                  {p.title[lang]}
                </h2>
              </div>

              <p
                style={{
                  color: '#374151',
                  fontSize: 14,
                  lineHeight: 1.7,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {p.desc[lang]}
              </p>

              <div
                style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    color: '#0f1a3a',
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.price[lang]}
                </span>

                {p.id === 'ozel-siparis' ? (
                  <a
                    href="mailto:bahribudak@gmail.com"
                    style={{
                      background: '#0f1a3a',
                      color: '#ffffff',
                      fontSize: 13,
                      fontWeight: 600,
                      padding: '10px 20px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.quoteBtn}
                  </a>
                ) : (
                  <a
                    href={p.gumroadUrl || '#iletisim'}
                    target={p.gumroadUrl ? '_blank' : undefined}
                    rel={p.gumroadUrl ? 'noopener noreferrer' : undefined}
                    style={{
                      background: '#f5c518',
                      color: '#0f1a3a',
                      fontSize: 13,
                      fontWeight: 700,
                      padding: '10px 20px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.buyBtn}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÖDEME YÖNTEMLERİ */}
      <section
        id="iletisim"
        style={{
          background: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2
            style={{
              color: '#0f1a3a',
              fontSize: 28,
              fontWeight: 800,
              margin: '0 0 8px',
              textAlign: 'center',
            }}
          >
            {t.paymentTitle}
          </h2>
          <p
            style={{
              color: '#6b7280',
              fontSize: 15,
              textAlign: 'center',
              margin: '0 0 40px',
            }}
          >
            {t.paymentDesc}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {/* Gumroad */}
            <div
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: '28px 24px',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>💳</div>
              <h3 style={{ color: '#0f1a3a', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>
                {t.gumroad}
              </h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
                {t.gumroadDesc}
              </p>
              <a
                href="https://6762449615620.gumroad.com/l/pzpaal"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#0f1a3a',
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '10px 20px',
                  borderRadius: 8,
                  textDecoration: 'none',
                }}
              >
                Gumroad →
              </a>
            </div>

            {/* IBAN */}
            <div
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: '28px 24px',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>🏦</div>
              <h3 style={{ color: '#0f1a3a', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>
                {t.manual}
              </h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>
                {t.manualDesc}
              </p>
              <p
                style={{
                  background: '#e5e7eb',
                  color: '#374151',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '8px 12px',
                  borderRadius: 6,
                  margin: '0 0 16px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                }}
              >
                TR26 0013 4000 0179 1847 2000 01
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/905433382690"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25d366',
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '9px 16px',
                    borderRadius: 8,
                    textDecoration: 'none',
                  }}
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:bahribudak@gmail.com"
                  style={{
                    background: '#f5c518',
                    color: '#0f1a3a',
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '9px 16px',
                    borderRadius: 8,
                    textDecoration: 'none',
                  }}
                >
                  E-posta
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section style={{ padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af', fontSize: 13, margin: 0 }}>
          © {new Date().getFullYear()} Bahri Budak ·{' '}
          <Link href={`/${lang}`} style={{ color: '#1a3a5c', textDecoration: 'none' }}>
            bahribudak.com
          </Link>
        </p>
      </section>
    </main>
  )
}
