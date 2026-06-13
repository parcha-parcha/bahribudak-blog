export type Lang = 'tr' | 'en'

export const langs: Lang[] = ['tr', 'en']
export const defaultLang: Lang = 'tr'

export const ui = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.blog': 'Blog',
    'nav.about': 'Hakkımda',
    'nav.contact': 'İletişim',

    // Categories
    'cat.kisisel-gelisim': 'Kişisel Gelişim',
    'cat.tekstil': 'Tekstil',
    'cat.turkiye-gundemi': 'Türkiye Gündemi',
    'cat.all': 'Tümü',

    // Category descriptions
    'cat.kisisel-gelisim.desc': 'Büyüme, alışkanlıklar ve zihinsel güç üzerine düşünceler.',
    'cat.tekstil.desc': 'Boyahane, proses, kalite, eğitim notu ve saha uygulamaları.',
    'cat.turkiye-gundemi.desc': 'Ekonomi, politika ve toplumsal meseleler.',

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
    'hero.tagline': 'Tekstil yöneticisi. Saha deneyimiyle içerik üreticisi.',
    'hero.description': 'Fabrika yönetimi ve tekstil saha deneyimimi; sektör analizi, kişisel gelişim ve Türkiye gündemiyle birleştiriyorum. Her yazı gerçek bir ihtiyaçtan doğar.',
    'hero.cta': 'Yazıları Keşfet',

    // About snippet
    'about.title': 'Hakkımda',
    'about.text': 'Tekstil fabrikası yöneticisiyim. İşimin içinde büyüdüm, her vardiyada hem üretim hem insan yönettim. Bu blog; saha deneyimini, kişisel gelişimi ve sektörel bakışı birleştirdiğim yerdir.',

    // Footer
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.linkedin': 'LinkedIn',
    'footer.tagline': 'Düşün. Üret. Paylaş.',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'cat.kisisel-gelisim': 'Personal Growth',
    'cat.tekstil': 'Textile',
    'cat.turkiye-gundemi': 'Turkey Today',
    'cat.all': 'All',

    'cat.kisisel-gelisim.desc': 'Thoughts on growth, habits, and mental strength.',
    'cat.tekstil.desc': 'Industry analysis, production and sustainability.',
    'cat.turkiye-gundemi.desc': 'Economy, politics and social issues.',

    'blog.readMore': 'Read More',
    'blog.readingTime': 'min read',
    'blog.latestPosts': 'Latest Posts',
    'blog.allPosts': 'All Posts',
    'blog.by': 'By',
    'blog.publishedAt': 'Published',
    'blog.switchLang': 'Türkçe Oku',

    'hero.greeting': 'Hello, I am',
    'hero.name': 'Bahri Budak',
    'hero.tagline': 'Textile manager. Field-experience content creator.',
    'hero.description': 'I combine factory management and textile field experience with industry analysis, personal growth and Turkey-focused commentary. Every post starts from a real need.',
    'hero.cta': 'Explore Posts',

    'about.title': 'About Me',
    'about.text': 'I am a textile factory manager. I grew up inside the industry, managing both production and people through every shift. This blog is where field experience meets personal development and sector-level thinking.',

    'footer.rights': 'All rights reserved.',
    'footer.linkedin': 'LinkedIn',
    'footer.tagline': 'Think. Create. Share.',
  },
} as const

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key] || key
  }
}

export const categories = [
  { slug: 'tekstil',         color: '#0B2343' },
  { slug: 'kisisel-gelisim', color: '#5D5F63' },
  { slug: 'turkiye-gundemi', color: '#5D5F63' },
] as const

export type Category = typeof categories[number]['slug']
