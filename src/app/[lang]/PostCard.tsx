import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import { processAreaLabel } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'

interface PostCardProps {
  post: PostMeta
  lang: Lang
}

export default function PostCard({ post, lang }: PostCardProps) {
  const t = useTranslations(lang)
  const processLabel = processAreaLabel(post.processArea, lang)

  return (
    <article className="post-card group relative bg-white text-navy">
      <div className="post-card-accent h-1 w-full" />

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="cat-badge post-card-category relative z-10">
              {t(`cat.${post.category}` as any)}
            </span>
            {post.technicalPublication && processLabel && (
              <span className="rounded-full border border-[#2EA6D9]/35 bg-[#EAF6FC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B2343]">
                {processLabel}
              </span>
            )}
          </div>
          <span className="post-card-readtime shrink-0 text-xs font-medium">
            {post.readingTime} {t('blog.readingTime')}
          </span>
        </div>

        <h2 className="post-card-title mb-3 text-xl leading-snug transition-colors">
          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>

        <p className="post-card-excerpt mb-6 line-clamp-3 text-sm leading-relaxed">
          {post.excerpt}
        </p>

        {post.technicalPublication && post.documentCode && (
          <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-[#4C5561]">
            <span>{post.documentCode}</span>
            {post.revision && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.revision}</span>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-border pt-4">
          <time className="post-card-readtime text-xs font-medium">
            {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>

          <span className="post-card-readmore flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2">
            {t('blog.readMore')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
