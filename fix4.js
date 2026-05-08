const fs = require('fs')
const path = require('path')

const slugPage = path.join('src','app','[lang]','blog','[slug]','page.tsx')

fs.writeFileSync(slugPage, `import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getPost, getAllSlugs } from '@/lib/posts'
import { useTranslations, categories } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const langs: Lang[] = ['tr', 'en']
  const result: { lang: string; slug: string }[] = []
  for (const lang of langs) {
    const slugs = getAllSlugs(lang)
    for (const slug of slugs) result.push({ lang, slug })
  }
  return result
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getPost(lang as Lang, slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang, slug } = await params
  const post = getPost(lang as Lang, slug)
  if (!post) notFound()

  const t = useTranslations(lang as Lang)
  const cat = categories.find(c => c.slug === post.category)
  const htmlContent = await marked(post.content)

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <nav className="flex items-center gap-2 text-xs text-gray-text mb-10 font-medium">
        <Link href={\`/\${lang}\`} className="hover:text-navy">{t('nav.home')}</Link>
        <span>/</span>
        <Link href={\`/\${lang}/blog\`} className="hover:text-navy">{t('nav.blog')}</Link>
        <span>/</span>
        <span className="text-navy">{post.title}</span>
      </nav>

      <div className="mb-6">
        <span className="cat-badge text-white text-xs" style={{ backgroundColor: cat?.color || '#0f1a3a' }}>
          {cat?.emoji} {t(\`cat.\${post.category}\` as any)}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-navy mb-6">{post.title}</h1>
      <div className="w-16 h-1 bg-yellow-bb mb-8" />

      <div className="flex items-center gap-4 text-sm text-gray-text mb-12 pb-8 border-b border-gray-border">
        <span className="font-semibold text-navy">Bahri Budak</span>
        <span>·</span>
        <time>{new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
        <span>·</span>
        <span>{post.readingTime} {t('blog.readingTime')}</span>
      </div>

      <div className="prose-bb" dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-border">
          {post.tags.map((tag: string) => (
            <span key={tag} className="text-xs font-medium text-gray-text bg-gray-soft px-3 py-1 rounded-full border border-gray-border">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-16 bg-navy text-white rounded-xl p-8 flex items-start gap-6">
        <div className="w-16 h-16 rounded-full border-2 border-yellow-bb flex items-center justify-center flex-shrink-0">
          <span className="text-yellow-bb font-bold text-xl">BB</span>
        </div>
        <div>
          <p className="font-bold text-lg mb-1">Bahri Budak</p>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {lang === 'tr'
              ? 'Tekstil fabrikası yöneticisi. Kişisel gelişim, felsefe ve sektör yazıları üzerine içerik üretici.'
              : 'Textile factory manager. Content creator on personal growth, philosophy and industry.'}
          </p>
          <a href="https://linkedin.com/in/bahribudak" target="_blank" rel="noopener noreferrer" className="text-yellow-bb text-sm font-bold">
            linkedin.com/in/bahribudak →
          </a>
        </div>
      </div>

      <div className="mt-10">
        <Link href={\`/\${lang}/blog\`} className="text-sm font-bold text-navy">
          ← {lang === 'tr' ? 'Tüm yazılara dön' : 'Back to all posts'}
        </Link>
      </div>
    </article>
  )
}
`, 'utf8')

console.log('Yazıldı:', slugPage)
console.log('Kontrol:', fs.existsSync(slugPage) ? 'DOSYA VAR ✓' : 'DOSYA YOK ✗')
