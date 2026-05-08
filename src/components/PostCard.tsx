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
    <article className="post-card group">
      {/* Yellow top accent */}
      <div className="h-1 bg-yellow-bb w-full" />

      <div className="p-6">
        {/* Category + Reading time */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="cat-badge text-white"
            style={{ backgroundColor: cat?.color || '#0f1a3a' }}
          >
            {cat?.emoji} {t(`cat.${post.category}` as any)}
          </span>
          <span className="text-xs text-gray-text font-medium">
            {post.readingTime} {t('blog.readingTime')}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-navy mb-3 leading-snug group-hover:text-navy-light transition-colors">
          <Link href={`/${lang}/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-text leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-border">
          <time className="text-xs text-gray-text font-medium">
            {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </time>

          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="text-xs font-bold text-navy flex items-center gap-1 hover:gap-2 transition-all"
          >
            {t('blog.readMore')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
