import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'

const root = process.cwd()
const errors = []
const registryPath = path.join(root, 'config', 'bb-os-publication-gates.json')

function fail(message) {
  errors.push(message)
}

function read(relativePath) {
  const fullPath = path.join(root, relativePath)
  if (!fs.existsSync(fullPath)) {
    fail(`Zorunlu dosya bulunamadı: ${relativePath}`)
    return ''
  }
  return fs.readFileSync(fullPath, 'utf8')
}

let registry = null
try {
  registry = JSON.parse(read('config/bb-os-publication-gates.json'))
} catch (error) {
  fail(`BB-OS yayın gate registry okunamadı: ${error.message}`)
}

const resourcesSource = [
  read('src/lib/resources.base.ts'),
  read('src/lib/resources.ts'),
].join('\n')

const memberDownloadRoute = read('src/app/api/member-download/route.ts')
if (!memberDownloadRoute.includes('.storage') || !memberDownloadRoute.includes("from('resources')")) {
  fail('member-download rotası Supabase resources + private Storage akışını doğrulamıyor.')
}

const publications = Array.isArray(registry?.publications)
  ? registry.publications
  : []

if (registry && registry.gate !== 'BB-OS G13-YED') {
  fail(`Beklenmeyen gate kodu: ${String(registry.gate)}`)
}

if (publications.length === 0) {
  fail('BB-OS yayın gate registry boş.')
}

const seenIds = new Set()

for (const publication of publications) {
  const publicationId = String(publication.id || '')
  if (!publicationId) {
    fail('Registry kaydında publication id eksik.')
    continue
  }
  if (seenIds.has(publicationId)) {
    fail(`Mükerrer publication id: ${publicationId}`)
  }
  seenIds.add(publicationId)

  const requiredDownloads = Array.isArray(publication.requiredDownloads)
    ? publication.requiredDownloads
    : []
  const resourceIds = Array.isArray(publication.resourceIds)
    ? publication.resourceIds
    : []

  if (requiredDownloads.length === 0) {
    fail(`${publicationId}: requiredDownloads boş.`)
  }
  if (resourceIds.length !== requiredDownloads.length) {
    fail(`${publicationId}: resourceIds ve requiredDownloads sayısı eşleşmiyor.`)
  }

  const mdxEntries = [
    ['tr', publication.trSlug],
    ['en', publication.enSlug],
  ]

  for (const [lang, slug] of mdxEntries) {
    if (!slug) {
      fail(`${publicationId}: ${lang} slug eksik.`)
      continue
    }

    const mdxPath = `src/content/${lang}/${slug}.mdx`
    const raw = read(mdxPath)
    if (!raw) continue

    const parsed = matter(raw)
    if (parsed.data.technicalPublication !== true) {
      fail(`${publicationId}: ${mdxPath} technicalPublication=true değil.`)
    }
    if (parsed.data.hasDownloads !== true) {
      fail(`${publicationId}: ${mdxPath} hasDownloads=true değil.`)
    }
    if (String(parsed.data.accessLevel || '') !== String(publication.accessLevel || '')) {
      fail(`${publicationId}: ${mdxPath} accessLevel registry ile eşleşmiyor.`)
    }
    if (String(parsed.data.documentCode || '') !== String(publication.documentCode || '')) {
      fail(`${publicationId}: ${mdxPath} documentCode registry ile eşleşmiyor.`)
    }

    const mdxDownloads = Array.isArray(parsed.data.downloadLinks)
      ? parsed.data.downloadLinks.map(item => item?.href).filter(Boolean)
      : []

    for (const downloadPath of requiredDownloads) {
      if (!mdxDownloads.includes(downloadPath)) {
        fail(`${publicationId}: ${mdxPath} downloadLinks içinde eksik: ${downloadPath}`)
      }
    }
  }

  for (let index = 0; index < requiredDownloads.length; index += 1) {
    const downloadPath = requiredDownloads[index]
    const resourceId = resourceIds[index]

    if (
      typeof downloadPath !== 'string' ||
      !downloadPath.startsWith('/downloads/') ||
      downloadPath.includes('..')
    ) {
      fail(`${publicationId}: geçersiz download path: ${String(downloadPath)}`)
      continue
    }

    if (!resourcesSource.includes(`id: '${resourceId}'`) && !resourcesSource.includes(`id: \"${resourceId}\"`)) {
      fail(`${publicationId}: resource catalog id bulunamadı: ${resourceId}`)
    }
    if (!resourcesSource.includes(`href: '${downloadPath}'`) && !resourcesSource.includes(`href: \"${downloadPath}\"`)) {
      fail(`${publicationId}: resource catalog href bulunamadı: ${downloadPath}`)
    }
  }
}

console.log('BB-OS G13-YED yayın erişim doğrulaması')
console.log(`- Registry yayın sayısı: ${publications.length}`)

if (errors.length > 0) {
  console.error('\nYayın gate doğrulaması başarısız:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('- Registry / TR-EN MDX / resource catalog: PASS')
console.log('Doğrulama başarılı.')
