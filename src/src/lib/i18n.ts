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
    'cat.felsefe': 'Felsefe',
    'cat.tekstil': 'Tekstil',
    'cat.turkiye-gundemi': 'Türkiye Gündemi',
    'cat.all': 'Tümü',

    // Category descriptions
    'cat.kisisel-gelisim.desc': 'Büyüme, alışkanlıklar ve zihinsel güç üzerine düşünceler.',
    'cat.felsefe.desc': 'Antik filozoflardan modern hayata köprüler.',
    'cat.tekstil.desc': 'Sektör analizi, üretim ve sürdürülebilirlik.',
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
    'hero.tagline': 'Tekstil yöneticisi. Düşünür. İçerik üreticisi.',
    'hero.description': 'Fabrika deneyimimi felsefe, kişisel gelişim ve sektör analiziyle harmanlıyorum. Her yazı bir sorudan doğar.',
    'hero.cta': 'Yazıları Keşfet',

    // About snippet
    'about.title': 'Hakkımda',
    'about.text': 'Tekstil fabrikası yöneticisiyim. İşimin içinde büyüdüm, her vardiyada hem üretim hem insan yönettim. Bu blog; o deneyimi felsefe, kişisel gelişim ve sektörel bakışla birleştirdiğim yerdir.',

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
    'cat.felsefe': 'Philosophy',
    'cat.tekstil': 'Textile',
    'cat.turkiye-gundemi': 'Turkey Today',
    'cat.all': 'All',

    'cat.kisisel-gelisim.desc': 'Thoughts on growth, habits, and mental strength.',
    'cat.felsefe.desc': 'Bridges from ancient philosophers to modern life.',
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
    'hero.tagline': 'Textile manager. Thinker. Content creator.',
    'hero.description': 'I blend factory management experience with philosophy, personal growth, and industry analysis. Every post starts with a question.',
    'hero.cta': 'Explore Posts',

    'about.title': 'About Me',
    'about.text': 'I am a textile factory manager. I grew up inside the industry, managing both production and people through every shift. This blog is where that experience meets philosophy, personal development, and sector-level thinking.',

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
  { slug: 'kisisel-gelisim', color: '#3b82f6', emoji: '🧠' },
  { slug: 'felsefe',         color: '#8b5cf6', emoji: '🏛️' },
  { slug: 'tekstil',         color: '#10b981', emoji: '🧵' },
  { slug: 'turkiye-gundemi', color: '#f59e0b', emoji: '🇹🇷' },
] as const

export type Category = typeof categories[number]['slug']
