import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

interface AboutProps {
  params: Promise<{ lang: string }>
}

export default async function AboutPage({ params }: AboutProps) {
  const { lang } = await params
  const t = useTranslations(lang as Lang)

  const bioTR = [
    "Tekstil sektöründe 35 yılı aşkın bir kariyere sahip olarak; geleneksel üretim deneyimini dijital uzmanlıkla harmanlayan özgün bir profil sunuyorum. Genel Müdür Yardımcılığı pozisyonuna kadar yükselerek idari liderlik, teknik üretim ve stratejik yönetim alanlarında derin bir birikim edindim.",
    "Beni farklı kılan şey, 35 yıllık 'saha' deneyimiyle modern tasarım teknolojisini buluşturabilmem. Adobe Creative Suite (Photoshop, Illustrator, InDesign) konusunda ileri düzeyde yetkinim; Rhino, Maya ve Cinema 4D ile 3D modelleme yapabiliyorum. Bu beceriler, üretim süreçlerini ve teknik tasarımları makineye girmeden önce hassasiyetle görselleştirmemi sağlıyor.",
    "Teknik yetkinliklerimin ötesinde, hem solo hem de uluslararası sergi deneyimine sahip bir fotoğrafçıyım. Bu sanatsal bakış açısı, mesleki geçmişimle birleşerek tekstil ve grafik tasarıma özgün bir estetik anlayışla yaklaşmamı mümkün kılıyor.",
    "Onlarca yıllık deneyimimi, liderlik birikimimi ve dijital tasarım becerilerimi ileri görüşlü organizasyonlara veya danışmanlık projelerine taşımayı hedefliyorum."
  ]

  const bioEN = [
    "With a career spanning over 35 years in the textile industry, I offer a unique blend of traditional manufacturing wisdom and cutting-edge digital expertise. Having risen to the rank of Vice General Manager, I possess a deep understanding of administrative leadership, technical production, and strategic management.",
    "What sets me apart is my ability to bridge the gap between 35 years of hands-on factory experience and modern design technology. I am highly proficient in the Adobe Creative Suite (Photoshop, Illustrator, InDesign) and skilled in 3D modeling using Rhino, Maya, and Cinema 4D. This allows me to visualize production cycles and technical designs with surgical precision before they ever hit the machines.",
    "Beyond my technical skills, I am an accomplished photographer with both solo and international exhibition credits. This artistic vision, combined with my vocational background, allows me to approach textile and graphic design with a unique aesthetic flair.",
    "I am looking to bring my decades of experience, leadership, and digital design skills to forward-thinking organizations or consultancy projects."
  ]

  const bio = lang === 'tr' ? bioTR : bioEN

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="section-label">{t('about.title')}</p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          {lang === 'tr' ? 'Merhaba, ben Bahri Budak.' : "Hello, I'm Bahri Budak."}
        </h1>
        <div className="w-12 h-1 bg-yellow-bb" />
      </div>

      {/* BB Card */}
      <div className="flex items-center gap-6 mb-12 p-8 bg-navy rounded-xl">
        <div className="w-20 h-20 rounded-full border-2 border-yellow-bb flex items-center justify-center flex-shrink-0">
          <span style={{fontFamily: "'Poppins', sans-serif", fontWeight: 700}} className="text-yellow-bb text-2xl leading-none tracking-wide">BB</span>
        </div>
        <div>
          <p style={{fontFamily: "'Poppins', sans-serif", fontWeight: 700}} className="text-white text-xl mb-1 tracking-wide">Bahri Budak</p>
          <p className="text-white/60 text-sm">
            {lang === 'tr'
              ? 'Kişisel Gelişim · Felsefe · Türkiye Gündemi · Tekstil'
              : 'Personal Development · Philosophy · Turkey Agenda · Textile'}
          </p>
          <a
            href=https:"//www.linkedin.com/in/bahri-budak-052ab5b8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-bb text-sm font-bold mt-2 inline-block hover:underline"
          >
            linkedin.com/in/bahribudak →
          </a>
        </div>
      </div>

      {/* Skills badges */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Adobe Creative Suite', 'Rhino · Maya · Cinema 4D', lang === 'tr' ? 'Tekstil Üretimi' : 'Textile Production', lang === 'tr' ? 'Stratejik Yönetim' : 'Strategic Management', lang === 'tr' ? 'Fotoğrafçılık' : 'Photography'].map(skill => (
          <span key={skill} className="text-xs font-semibold bg-yellow-pale text-navy border border-yellow-bb/30 px-3 py-1.5 rounded-full">
            {skill}
          </span>
        ))}
      </div>

      {/* Bio paragraphs */}
      <div className="space-y-6">
        {bio.map((paragraph, i) => (
          <p key={i} className="text-[17px] leading-[1.85] text-navy/80">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-border" />
        <div className="w-2 h-2 rounded-full bg-yellow-bb" />
        <div className="flex-1 h-px bg-gray-border" />
      </div>

      {/* CTA */}
      <div className="flex gap-4 flex-wrap">
        <Link href={`/${lang}/blog`} className="btn-primary">
          {lang === 'tr' ? 'Yazıları Oku' : 'Read Posts'}
        </Link>
        <a
          href="https://linkedin.com/in/bahribudak"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}
