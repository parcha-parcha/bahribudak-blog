import Link from 'next/link'

import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import type { PostMeta } from '@/lib/posts'
import {
  documentStatusLabel,
  processAreaLabel,
  resolveDocumentStatus,
} from '@/lib/posts'

interface PostCardProps {
  post: PostMeta
  lang: Lang
}

function formatDate(value: string, lang: Lang): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return lang === 'tr' ? 'Tarih belirtilmedi' : 'Date not specified'
  }

  return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function PostCard({
  post,
  lang,
}: PostCardProps) {
  const t = useTranslations(lang)
  const processLabel = processAreaLabel(post.processArea, lang)
  const documentStatus = resolveDocumentStatus(post.documentStatus)
  const statusLabel = documentStatusLabel(post.documentStatus, lang)

  const publicationLabel =
    lang === 'tr' ? 'Teknik Yayın' : 'Technical Publication'

  const downloadableLabel =
    lang === 'tr' ? 'İndirilebilir dosya' : 'Downloadable file'

  return (
    <article className="post-card group relative flex h-full flex-col overflow-hidden bg-white text-[#111315]">
      <div
        className={`post-card-accent h-1 w-full ${
          documentStatus === 'archive'
            ? 'bg-[#8C96A3]'
            : 'bg-[#E45A2B]'
        }`}
        aria-hidden="true"
      />

      {post.coverImage && (
        <div
          className="relative w-full overflow-hidden bg-[#F6F4EF]"
          style={{ aspectRatio: '16 / 9' }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.01] group-hover:opacity-95"
          />
        </div>
      )}

      <div className="flex h-full flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="cat-badge post-card-category relative z-10">
              {t(`cat.${post.category}` as any)}
            </span>

            {post.technicalPublication && (
              <span className="rounded-md border border-[#E5E2DA] bg-[#F6F4EF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] text-[#111315]">
                {publicationLabel}
              </span>
            )}

            {post.technicalPublication && processLabel && (
              <span className="rounded-md border border-[#EDB9A7] bg-[#F8E4DC] px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] text-[#A53C18]">
                {processLabel}
              </span>
            )}

            {post.technicalPublication && (
              <span
                className={`rounded-md border px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] ${
                  documentStatus === 'archive'
                    ? 'border-[#B7BEC8] bg-[#F0F2F5] text-[#59616C]'
                    : 'border-[#EDB9A7] bg-[#FFF3EE] text-[#A53C18]'
                }`}
              >
                {statusLabel}
              </span>
            )}

            {post.hasDownloads && (
              <span className="rounded-md border border-[#D9B85F]/40 bg-[#FFF8DF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] text-[#6B5415]">
                {downloadableLabel}
              </span>
            )}
          </div>

          <span className="post-card-readtime shrink-0 pt-1 text-xs font-medium">
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

        <p className="post-card-excerpt mb-5 line-clamp-3 text-sm leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#E5E2DA] pt-4">
          <time
            dateTime={post.date}
            className="post-card-readtime text-xs font-medium"
          >
            {formatDate(post.date, lang)}
          </time>

          <span className="post-card-readmore flex shrink-0 items-center gap-1 text-xs font-bold transition-all group-hover:gap-2">
            {t('blog.readMore')}

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
