import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'

interface PostCardProps {
  post: PostMeta
  lang: Lang
}

export default function PostCard({ post, lang }: PostCardProps) {
  const t = useTranslations(lang)
  return (
    <article className="post-card group relative bg-white text-navy">
      {/* Kurumsal mavi üst çizgi */}
      <div className="post-card-accent h-1 w-full" />

      <div className="p-6">
        {/* Category + Reading time */}
        <div className="flex items-center justify-between mb-4">
          <span className="cat-badge post-card-category relative z-10">
            {t(`cat.${post.category}` as any)}
          </span>
          <span className="post-card-readtime text-xs font-medium">
            {post.readingTime} {t('blog.readingTime')}
          </span>
        </div>

        {/* Title — after:absolute after:inset-0 tüm kartı tıklanabilir yapıyor */}
        <h2 className="post-card-title text-xl mb-3 leading-snug transition-colors">
          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="post-card-excerpt text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-border">
          <time className="post-card-readtime text-xs font-medium">
            {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </time>

          <span className="post-card-readmore text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
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
