import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'
import { useTranslations, categories } from '@/lib/i18n'

interface PostCardProps {
  post: PostMeta
  lang: Lang
}

export default function PostCard({ post, lang }: PostCardProps) {
  const t = useTranslations(lang)
  const cat = categories.find(c => c.slug === post.category)

  return (
    <article className="post-card group relative bg-white text-navy">
      {/* Yellow top accent */}
      <div className="h-1 bg-accent-blue w-full" />

      <div className="p-6">
        {/* Category + Reading time */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="cat-badge text-white relative z-10"
            style={{ backgroundColor: cat?.color || '#0B2343' }}
          >
            {cat?.emoji} {t(`cat.${post.category}` as any)}
          </span>
          <span className="text-xs text-gray-text font-medium">
            {post.readingTime} {t('blog.readingTime')}
          </span>
        </div>

        {/* Title — after:absolute after:inset-0 tüm kartı tıklanabilir yapıyor */}
        <h2 className="text-xl font-bold text-navy mb-3 leading-snug group-hover:text-accent-blue transition-colors">
          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-[#3E4F66] leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-border">
          <time className="text-xs text-gray-text font-medium">
            {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </time>

          <span className="text-xs font-bold text-navy flex items-center gap-1 group-hover:gap-2 transition-all">
            {t('blog.readMore')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
