export type Lang = 'tr' | 'en'

export const langs: Lang[] = ['tr', 'en']
export const defaultLang: Lang = 'tr'

export const ui = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.blog': 'Teknik Yayınlar',
    'nav.about': 'Hakkımda',
    'nav.services': 'Hizmetler',
    'nav.news': 'Haberler',
    'nav.shop': 'Şablonlar',
    'nav.contact': 'İletişim',

    // Categories
    'cat.kisisel-gelisim': 'Kişisel Gelişim',
    'cat.tekstil': 'Tekstil ve Teknik Yayınlar',
    'cat.uretim-yonetim': 'Üretim ve Yönetim Sistemleri',
    'cat.sektorel-analiz': 'Sektörel ve Güncel Analizler',
    
    'cat.all': 'Tümü',

    // Category descriptions
    'cat.kisisel-gelisim.desc': 'Kişisel gelişim, alışkanlıklar ve üretkenlik üzerine yazılar.',
    'cat.tekstil.desc': 'Örgü, boya, apre, laboratuvar, reçete, proses, kalite, enerji ve formüller.',
    'cat.uretim-yonetim.desc': 'Organizasyon, norm kadro, planlama, maliyet, verimlilik ve insan odaklı yönetim.',
    'cat.sektorel-analiz.desc': 'Tekstil ekonomisi, ihracat, mevzuat, pazar ve güncel gelişmeler.',
    

    // Blog
    'blog.readMore': 'Devamını Oku',
    'blog.readingTime': 'dk okuma',
    'blog.latestPosts': 'Son Yazılar',
    'blog.allPosts': 'Tüm Yazılar',
    'blog.by': 'Yazan',
    'blog.publishedAt': 'Yayınlanma',
    'blog.switchLang': 'Read in English',

    // Hero
    'hero.greeting': 'Merhaba, ben',
    'hero.name': 'Bahri Budak',
    'hero.tagline': 'Tekstil proses danışmanlığı, eğitim ve teknik dokümantasyon.',
    'hero.description': '35 yıllık tekstil saha deneyimini; boyahane, terbiye, proses kontrol, eğitim notları ve teknik doküman sistemiyle paylaşıyorum.',
    'hero.cta': 'Teknik Yazıları Keşfet',

    // About snippet
    'about.title': 'Hakkımda',
    'about.text': 'Tekstil sektöründe 35 yıllık üretim ve yönetim deneyimine sahibim. Boyahane, terbiye, proses kontrol ve fabrika yönetimi alanındaki saha birikimimi teknik eğitim ve uygulanabilir doküman sistemine dönüştürüyorum.',

    // Footer
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.linkedin': 'LinkedIn',
    'footer.tagline': 'Düşün. Üret. Paylaş.',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Technical Publications',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.news': 'News',
    'nav.shop': 'Templates',
    'nav.contact': 'Contact',

    'cat.kisisel-gelisim': 'Personal Growth',
    'cat.tekstil': 'Textile and Technical Publications',
    'cat.uretim-yonetim': 'Production and Management Systems',
    'cat.sektorel-analiz': 'Industry and Current Analysis',
    
    'cat.all': 'All',

    'cat.kisisel-gelisim.desc': 'Personal development, habits and productivity.',
    'cat.tekstil.desc': 'Knitting, dyeing, finishing, laboratory, recipes, process, quality, energy and formulas.',
    'cat.uretim-yonetim.desc': 'Organization, staffing, planning, cost, efficiency and people-oriented management.',
    'cat.sektorel-analiz.desc': 'Textile economics, exports, regulation, markets and current developments.',
    

    'blog.readMore': 'Read More',
    'blog.readingTime': 'min read',
    'blog.latestPosts': 'Latest Posts',
    'blog.allPosts': 'All Posts',
    'blog.by': 'By',
    'blog.publishedAt': 'Published',
    'blog.switchLang': 'Türkçe Oku',

    'hero.greeting': 'Hello, I am',
    'hero.name': 'Bahri Budak',
    'hero.tagline': 'Textile process consulting, training and technical documentation.',
    'hero.description': 'I share 35 years of textile field experience through dyehouse, finishing, process control, training notes and technical documentation systems.',
    'hero.cta': 'Explore Technical Posts',

    'about.title': 'About Me',
    'about.text': 'I have 35 years of production and management experience in the textile sector. I turn field experience in dyehouse, finishing, process control and factory management into practical training and documentation systems.',

    'footer.rights': 'All rights reserved.',
    'footer.linkedin': 'LinkedIn',
    'footer.tagline': 'Think. Create. Share.',
  },
} as const

export function isLang(value: unknown): value is Lang {
  return value === 'tr' || value === 'en'
}

export function normalizeLang(value: unknown): Lang {
  return isLang(value) ? value : defaultLang
}

export function useTranslations(lang: Lang | string | undefined) {
  const safeLang = normalizeLang(lang)

  return function t(key: keyof typeof ui[typeof defaultLang] | string): string {
    const dict = ui[safeLang] ?? ui[defaultLang]
    const fallback = ui[defaultLang]
    return (dict as Record<string, string>)[key] || (fallback as Record<string, string>)[key] || String(key)
  }
}

export const categories = [
  { slug: 'tekstil', color: '#2EA6D9' },
  { slug: 'uretim-yonetim', color: '#12365E' },
  { slug: 'kisisel-gelisim', color: '#3B9C8C' },
  { slug: 'sektorel-analiz', color: '#B7832F' },
] as const

export type Category = typeof categories[number]['slug']
