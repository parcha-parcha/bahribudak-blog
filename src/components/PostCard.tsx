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

  const revisionDateLabel =
    lang === 'tr' ? 'Revizyon tarihi' : 'Revision date'

  const downloadableLabel =
    lang === 'tr' ? 'İndirilebilir dosya' : 'Downloadable file'

  return (
    <article className="post-card group relative flex h-full flex-col overflow-hidden bg-white text-navy">
      <div
        className={`post-card-accent h-1 w-full ${
          documentStatus === 'archive'
            ? 'bg-[#8C96A3]'
            : 'bg-[#2EA6D9]'
        }`}
        aria-hidden="true"
      />

      <div className="flex h-full flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="cat-badge post-card-category relative z-10">
              {t(`cat.${post.category}` as any)}
            </span>

            {post.technicalPublication && (
              <span className="rounded-full border border-[#0B2343]/15 bg-[#F3F6FA] px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] text-[#0B2343]">
                {publicationLabel}
              </span>
            )}

            {post.technicalPublication && processLabel && (
              <span className="rounded-full border border-[#2EA6D9]/35 bg-[#EAF6FC] px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] text-[#0B2343]">
                {processLabel}
              </span>
            )}

            {post.technicalPublication && (
              <span
                className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] ${
                  documentStatus === 'archive'
                    ? 'border-[#B7BEC8] bg-[#F0F2F5] text-[#59616C]'
                    : 'border-[#87CDEB] bg-[#E7F7FD] text-[#075A7D]'
                }`}
              >
                {statusLabel}
              </span>
            )}

            {post.hasDownloads && (
              <span className="rounded-full border border-[#D9B85F]/40 bg-[#FFF8DF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.11em] text-[#6B5415]">
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

        {post.technicalPublication &&
          (post.documentCode ||
            post.revision ||
            post.revisionDate) && (
            <div className="mb-5 rounded-2xl border border-[#DDE3EB] bg-[#F7F9FB] px-4 py-3">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-[#4C5561]">
                {post.documentCode && (
                  <span className="text-[#0B2343]">
                    {post.documentCode}
                  </span>
                )}

                {post.documentCode && post.revision && (
                  <span aria-hidden="true">·</span>
                )}

                {post.revision && <span>{post.revision}</span>}
              </div>

              {post.revisionDate && (
                <p className="mt-1 text-[11px] leading-relaxed text-[#6A7480]">
                  {revisionDateLabel}:{' '}
                  {formatDate(post.revisionDate, lang)}
                </p>
              )}
            </div>
          )}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-border pt-4">
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
