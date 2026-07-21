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

for (const relativeDownload of [...downloadReferences].sort()) {
  const publicFile = path.join(root, 'public', 'downloads', relativeDownload)
  if (!fs.existsSync(publicFile)) {
    fail(`Kırık indirme bağlantısı: /downloads/${relativeDownload}`)
  }
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
      warn(`${lang}/${publication.slug}.mdx translatedRoutes.ts içinde eşleştirilmemiş.`)
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
console.log(`- Doğrulanan indirme bağlantısı: ${downloadReferences.size}`)
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
