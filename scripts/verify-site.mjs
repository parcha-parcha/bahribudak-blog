import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'

const root = process.cwd()
const errors = []
const warnings = []

const requiredFiles = [
  'VERSION',
  'public/release-manifest.json',
  'public/brand/bb-logo-kisa-kurumsal.svg',
  'public/brand/bb-logo-tanimli-kurumsal.svg',
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  'src/lib/translatedRoutes.ts',
  'src/lib/resources.ts',
  'config/private-downloads.json',
  'config/bb-os-publication-gates.json',
]

function fail(message) {
  errors.push(message)
}

function warn(message) {
  warnings.push(message)
}

function walk(directory, extensions = null) {
  const output = []
  if (!fs.existsSync(directory)) return output

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      output.push(...walk(fullPath, extensions))
      continue
    }

    if (!extensions || extensions.some(extension => entry.name.endsWith(extension))) {
      output.push(fullPath)
    }
  }

  return output
}

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`Zorunlu dosya bulunamadı: ${relativePath}`)
  }
}

const version = fs.existsSync(path.join(root, 'VERSION'))
  ? fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim()
  : ''

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  fail(`VERSION semantik sürüm biçiminde değil: "${version}"`)
}

const manifestPath = path.join(root, 'public/release-manifest.json')
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    if (manifest.siteVersion !== version) {
      fail(`VERSION (${version}) ile release-manifest siteVersion (${manifest.siteVersion}) eşleşmiyor.`)
    }
  } catch (error) {
    fail(`release-manifest.json okunamadı: ${error.message}`)
  }
}

for (const fileName of ['package-lock.json', 'package.json']) {
  const filePath = path.join(root, fileName)
  if (!fs.existsSync(filePath)) continue
  const content = fs.readFileSync(filePath, 'utf8')
  if (/applied-caas|internal\.api\.openai\.org|packages\.[^/]*internal/i.test(content)) {
    fail(`${fileName} içinde üretim dışı özel paket kaynağı bulundu.`)
  }
}

const sourceFiles = walk(path.join(root, 'src'), ['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx'])
const downloadReferences = new Set()

for (const filePath of sourceFiles) {
  const content = fs.readFileSync(filePath, 'utf8')
  for (const match of content.matchAll(/\/downloads\/([^"'`)\s?#]+)/g)) {
    downloadReferences.add(decodeURIComponent(match[1]))
  }
}

const privateDownloadManifestPath = path.join(
  root,
  'config/private-downloads.json',
)
const privateDownloadFiles = new Set()

if (fs.existsSync(privateDownloadManifestPath)) {
  try {
    const manifest = JSON.parse(
      fs.readFileSync(
        privateDownloadManifestPath,
        'utf8',
      ),
    )

    const files = Array.isArray(manifest.files)
      ? manifest.files
      : []

    if (files.length === 0) {
      fail('Private Blob manifesti boş.')
    }

    if (manifest.fileCount !== files.length) {
      fail(
        `Private Blob manifest dosya sayısı eşleşmiyor: ${manifest.fileCount} / ${files.length}`,
      )
    }

    for (const pathname of files) {
      if (
        typeof pathname !== 'string' ||
        !pathname.startsWith('downloads/') ||
        pathname.includes('..')
      ) {
        fail(
          `Private Blob manifestinde geçersiz yol: ${String(pathname)}`,
        )
        continue
      }

      privateDownloadFiles.add(pathname)
    }
  } catch (error) {
    fail(
      `Private Blob manifesti okunamadı: ${error.message}`,
    )
  }
}

const publicationGateRegistryPath = path.join(
  root,
  'config/bb-os-publication-gates.json',
)
const supabaseRegistryDownloadFiles = new Set()

if (fs.existsSync(publicationGateRegistryPath)) {
  try {
    const registry = JSON.parse(
      fs.readFileSync(publicationGateRegistryPath, 'utf8'),
    )

    const publications = Array.isArray(registry.publications)
      ? registry.publications
      : []

    for (const publication of publications) {
      const downloads = Array.isArray(publication.requiredDownloads)
        ? publication.requiredDownloads
        : []

      for (const pathname of downloads) {
        if (
          typeof pathname !== 'string' ||
          !pathname.startsWith('/downloads/') ||
          pathname.includes('..')
        ) {
          fail(`BB-OS yayın gate registry içinde geçersiz yol: ${String(pathname)}`)
          continue
        }

        supabaseRegistryDownloadFiles.add(pathname.slice(1))
      }
    }
  } catch (error) {
    fail(`BB-OS yayın gate registry okunamadı: ${error.message}`)
  }
}

const publicDownloadFiles = walk(
  path.join(root, 'public', 'downloads'),
)

if (publicDownloadFiles.length > 0) {
  fail(
    'public/downloads içinde herkese açık indirme dosyaları bulundu.',
  )
}

const memberDownloadRoutePath = path.join(
  root,
  'src/app/api/member-download/route.ts',
)

if (!fs.existsSync(memberDownloadRoutePath)) {
  fail('Üyelik kontrollü indirme rotası bulunamadı.')
} else {
  const routeSource = fs.readFileSync(
    memberDownloadRoutePath,
    'utf8',
  )

  const usesPrivateBlob =
    routeSource.includes("from '@vercel/blob'") &&
    /\bget\s*\(/.test(routeSource) &&
    /access:\s*['"]private['"]/.test(routeSource)

  const usesSupabaseStorage =
    routeSource.includes(".from('resources')") &&
    routeSource.includes('.storage') &&
    routeSource.includes('.download(')

  if (!usesPrivateBlob && !usesSupabaseStorage) {
    fail(
      'Üyelik kontrollü indirme rotası desteklenen private storage akışını kullanmıyor.',
    )
  }
}

for (
  const relativeDownload of
    [...downloadReferences].sort()
) {
  if (
    relativeDownload.includes('..') ||
    relativeDownload.includes('\\')
  ) {
    fail(
      `Geçersiz indirme yolu: /downloads/${relativeDownload}`,
    )
    continue
  }

  const privatePath = `downloads/${relativeDownload}`

  if (
    !privateDownloadFiles.has(privatePath) &&
    !supabaseRegistryDownloadFiles.has(privatePath)
  ) {
    fail(
      `Private download manifest/BB-OS registry içinde bulunmayan indirme bağlantısı: /downloads/${relativeDownload}`,
    )
  }
}

const resourcesSourcePath = path.join(root, 'src/lib/resources.ts')
const resourcesSource = fs.existsSync(resourcesSourcePath)
  ? fs.readFileSync(resourcesSourcePath, 'utf8')
  : ''

const resourceBlocks = [...resourcesSource.matchAll(/\{\s*id:[\s\S]*?\n\s*\},/g)].map(match => match[0])
const freeEditableResources = resourceBlocks
  .filter(block => /format:\s*['"](DOCX|PPTX)['"]/.test(block))
  .filter(block => /accessLevel:\s*['"]free['"]/.test(block))
  .map(block => block.match(/id:\s*['"]([^'"]+)['"]/)?.[1] || 'tanımsız-kaynak')

if (freeEditableResources.length > 0) {
  fail(`DOCX/PPTX kaynakları ücretsiz işaretlenemez: ${freeEditableResources.join(', ')}`)
}

const translatedRoutesPath = path.join(root, 'src/lib/translatedRoutes.ts')
const translatedRoutesSource = fs.existsSync(translatedRoutesPath)
  ? fs.readFileSync(translatedRoutesPath, 'utf8')
  : ''

const routePairs = [...translatedRoutesSource.matchAll(
  /tr:\s*['"]([^'"]+)['"]\s*,\s*en:\s*['"]([^'"]+)['"]/g
)].map(match => ({ tr: match[1], en: match[2] }))

if (routePairs.length === 0) {
  fail('translatedRoutes.ts içinde teknik yayın eşleştirmesi bulunamadı.')
}

const technicalByLang = new Map()

for (const lang of ['tr', 'en']) {
  const contentDirectory = path.join(root, 'src/content', lang)
  const publications = []

  for (const filePath of walk(contentDirectory, ['.mdx'])) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)

    if (parsed.data.technicalPublication !== true) continue

    const slug = path.basename(filePath, '.mdx')
    const requiredFields = [
      'title',
      'date',
    ]

    const recommendedFields = [
      ['excerpt', 'description'],
      ['revisionDate', 'updated'],
      ['processArea'],
      ['documentCode'],
      ['revision'],
      ['documentStatus'],
    ]

    for (const field of requiredFields) {
      if (!parsed.data[field]) {
        fail(`${lang}/${slug}.mdx içinde zorunlu alan eksik: ${field}`)
      }
    }

    for (const alternatives of recommendedFields) {
      const hasField = alternatives.some(field => parsed.data[field])
      if (!hasField) {
        warn(`${lang}/${slug}.mdx içinde önerilen alan eksik: ${alternatives.join(' veya ')}`)
      }
    }

    publications.push({
      slug,
      documentCode: String(parsed.data.documentCode || ''),
      processArea: String(parsed.data.processArea || ''),
      revision: String(parsed.data.revision || ''),
    })
  }

  const duplicateCodes = publications
    .map(item => item.documentCode)
    .filter((code, index, all) => code && all.indexOf(code) !== index)

  if (duplicateCodes.length > 0) {
    fail(`${lang} teknik yayınlarında mükerrer belge kodu: ${[...new Set(duplicateCodes)].join(', ')}`)
  }

  technicalByLang.set(lang, publications)
}

for (const pair of routePairs) {
  const trExists = technicalByLang.get('tr')?.some(item => item.slug === pair.tr)
  const enExists = technicalByLang.get('en')?.some(item => item.slug === pair.en)

  if (!trExists) fail(`Türkçe teknik yayın dosyası bulunamadı: ${pair.tr}.mdx`)
  if (!enExists) fail(`İngilizce teknik yayın dosyası bulunamadı: ${pair.en}.mdx`)
}

for (const lang of ['tr', 'en']) {
  for (const publication of technicalByLang.get(lang) || []) {
    const paired = routePairs.some(pair => pair[lang] === publication.slug)
    if (!paired) {
      if (lang === 'en') {
        warn(`${lang}/${publication.slug}.mdx translatedRoutes.ts içinde eşleştirilmemiş.`)
      }
    }
  }
}

const requiredExpertiseRoutes = [
  'src/app/[lang]/uzmanlik/page.tsx',
  'src/app/[lang]/uzmanlik/[slug]/page.tsx',
  'src/app/[lang]/blog/page.tsx',
  'src/app/[lang]/blog/[slug]/page.tsx',
  'src/app/[lang]/magazam/page.tsx',
]

for (const relativePath of requiredExpertiseRoutes) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`Temel rota dosyası bulunamadı: ${relativePath}`)
  }
}

if (downloadReferences.size === 0) {
  warn('Kaynak kodunda /downloads/ bağlantısı bulunamadı.')
}

console.log('Bahri Budak site doğrulama özeti')
console.log(`- Sürüm: ${version || 'tanımsız'}`)
console.log(`- Teknik yayın eşleşmesi: ${routePairs.length}`)
console.log(`- Doğrulanan özel indirme referansı: ${downloadReferences.size}`)
console.log(`- Supabase G13 registry indirme yolu: ${supabaseRegistryDownloadFiles.size}`)
console.log(`- Taranan kaynak dosyası: ${sourceFiles.length}`)

for (const warning of warnings) {
  console.warn(`UYARI: ${warning}`)
}

if (errors.length > 0) {
  console.error('\nDoğrulama başarısız:')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log('\nDoğrulama başarılı.')
