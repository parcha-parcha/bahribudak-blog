import type { Metadata } from 'next'
import Link from 'next/link'
import { isLang, type Lang } from '@/lib/i18n'

interface Props {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'
  const title =
    lang === 'tr'
      ? 'Teknik Hizmetler | Bahri Budak'
      : 'Technical Services | Bahri Budak'
  const description =
    lang === 'tr'
      ? 'Tekstil işletmeleri için teknik ön değerlendirme, uzaktan proses analizi, saha incelemesi ve teknik sistem kurulumu.'
      : 'Technical assessment, remote process analysis, on-site review and technical system implementation for textile enterprises.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/teknik-hizmetler`,
      languages: {
        tr: `${siteUrl}/tr/teknik-hizmetler`,
        en: `${siteUrl}/en/teknik-hizmetler`,
      },
    },
  }
}

export default async function TechnicalServicesPage({ params }: Props) {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'
  const withLang = (path: string) => `/${lang}${path}`

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'TEKNİK İNCELEME • PROSES ANALİZİ • SİSTEM KURULUMU',
          title:
            'Tekstil proses sorunlarını ölçülebilir çalışma sistemlerine dönüştürüyoruz.',
          summary:
            'Örgü kumaş, boya, apre, laboratuvar, kalite ve teknik dokümantasyon alanlarında proses sorunlarını veriler, saha gözlemleri ve kontrol kayıtları üzerinden değerlendiriyoruz.',
          primaryCta: 'Teknik Ön Değerlendirme Talep Et',
          secondaryCta: 'Hizmetleri İncele',
          areasTitle: 'Teknik çalışma alanları',
          areas: [
            ['Boya Prosesleri', 'Ton farkı, abraj, tekrar boya, reçete standardı, pH, tuz, alkali ve dozaj yönetimi.'],
            ['Apre Prosesleri', 'En, gramaj, çekmezlik, tuşe, ramöz, kompaktör ve boyutsal stabilite.'],
            ['Su ve Enerji', 'Su kalitesi, bikarbonat, RO, buhar, sıcaklık, izolasyon ve enerji kayıpları.'],
            ['Makine ve Bakım', 'Düze, filtre, baca, kanal, temizlik, bakım periyodu ve kayıt sistemleri.'],
            ['Kalite Sistemi', 'Kontrol noktaları, kabul kriterleri, sapma yönetimi ve düzeltici faaliyet.'],
            ['Teknik Dokümantasyon', 'SOP, proses formu, kontrol listesi, eğitim notu ve revizyon sistemi.'],
          ],
          servicesTitle: 'Hizmet paketleri',
          services: [
            ['01', 'Teknik Ön Değerlendirme', 'Problemin kapsamı, mevcut veriler ve ihtiyaç duyulan çalışma yöntemi belirlenir.', ['Ön değerlendirme notu', 'Eksik veri listesi', 'Önerilen çalışma kapsamı']],
            ['02', 'Uzaktan Proses Analizi', 'Reçete, makine parametreleri, analiz sonuçları ve üretim kayıtları uzaktan incelenir.', ['Kök neden analizi', 'Düzeltici faaliyet planı', 'Revize kontrol formu']],
            ['03', 'Saha Teknik İncelemesi', 'Üretim akışı, makine, uygulama ve kayıt sistemi işletmede yerinde değerlendirilir.', ['Saha inceleme raporu', 'Risk ve uygunsuzluk listesi', 'Öncelikli faaliyet planı']],
            ['04', 'Teknik Sistem Kurulumu', 'İşletmeye özel SOP, kontrol listesi, proses formu ve teknik doküman sistemi hazırlanır.', ['Düzenlenebilir DOCX/XLSX dosyaları', 'Kontrollü PDF seti', 'Eğitim ve uygulama materyalleri']],
          ],
          methodTitle: 'Çalışma yöntemi',
          steps: ['Teknik talep', 'Ön değerlendirme', 'Kapsam belirleme', 'Veri veya saha incelemesi', 'Kök neden analizi', 'Uygulama planı', 'Sonuç doğrulama'],
          privacyTitle: 'Gizlilik ve teknik veri',
          privacy:
            'İşletme tarafından paylaşılan reçete, maliyet, üretim, analiz ve proses bilgileri yalnızca teknik değerlendirme amacıyla kullanılır. Firma adı ve ticari veriler yazılı izin olmadan yayımlanmaz veya üçüncü taraflarla paylaşılmaz.',
          finalTitle: 'Teknik sorununuzu tanımlayarak başlayın.',
          finalText:
            'Mevcut problemi, ilgili prosesi ve elinizde bulunan kayıtları paylaşın. Uygun çalışma yöntemi ön değerlendirme sonucunda belirlensin.',
          finalCta: 'Teknik Talep Oluştur',
          deliverables: 'Teslimatlar',
        }
      : {
          eyebrow: 'TECHNICAL REVIEW • PROCESS ANALYSIS • SYSTEM IMPLEMENTATION',
          title: 'We convert textile process problems into measurable working systems.',
          summary:
            'We assess problems in knitting, dyeing, finishing, laboratory, quality and technical documentation through data, field observations and control records.',
          primaryCta: 'Request a Preliminary Assessment',
          secondaryCta: 'Explore Services',
          areasTitle: 'Technical work areas',
          areas: [
            ['Dyeing Processes', 'Shade variation, barré, re-dyeing, recipe standards, pH, salt, alkali and dosing.'],
            ['Finishing Processes', 'Width, GSM, shrinkage, handle, stenter, compactor and dimensional stability.'],
            ['Water and Energy', 'Water quality, bicarbonate, RO, steam, temperature, insulation and energy losses.'],
            ['Machinery and Maintenance', 'Nozzles, filters, chimneys, ducts, cleaning, maintenance intervals and records.'],
            ['Quality Systems', 'Control points, acceptance criteria, deviation management and corrective actions.'],
            ['Technical Documentation', 'SOPs, process forms, checklists, training notes and revision systems.'],
          ],
          servicesTitle: 'Service packages',
          services: [
            ['01', 'Preliminary Technical Assessment', 'The scope of the problem, available data and required work method are defined.', ['Assessment note', 'Missing-data list', 'Recommended work scope']],
            ['02', 'Remote Process Analysis', 'Recipes, machine parameters, analysis results and production records are reviewed remotely.', ['Root-cause analysis', 'Corrective action plan', 'Revised control form']],
            ['03', 'On-Site Technical Review', 'Production flow, machinery, practices and records are assessed at the facility.', ['Site review report', 'Risk and nonconformity list', 'Prioritised action plan']],
            ['04', 'Technical System Implementation', 'Company-specific SOPs, checklists, process forms and documentation systems are prepared.', ['Editable DOCX/XLSX files', 'Controlled PDF set', 'Training and implementation materials']],
          ],
          methodTitle: 'Working method',
          steps: ['Technical request', 'Preliminary assessment', 'Scope definition', 'Data or site review', 'Root-cause analysis', 'Action plan', 'Result verification'],
          privacyTitle: 'Confidentiality and technical data',
          privacy:
            'Recipes, cost data, production records, analyses and process information are used only for technical assessment. Company names and commercial data are not published or shared with third parties without written permission.',
          finalTitle: 'Start by defining your technical problem.',
          finalText:
            'Share the problem, related process and available records. The appropriate work method will be determined after the preliminary assessment.',
          finalCta: 'Create a Technical Request',
          deliverables: 'Deliverables',
        }

  return (
    <>
      <section className="bg-[#111315] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="border-l-4 border-[#E45A2B] pl-4 text-xs font-black uppercase tracking-[0.2em] text-white/75">
            {copy.eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight tracking-[-0.04em] text-white md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
            {copy.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={withLang('/contact')} className="btn-primary">
              {copy.primaryCta} →
            </Link>
            <a
              href="#hizmetler"
              className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 font-bold transition hover:bg-white hover:text-[#111315]"
            >
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F4EF] text-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="section-label">{copy.areasTitle}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.areas.map(([title, text]) => (
              <article key={title} className="rounded-[16px] border border-[#E5E2DA] bg-white p-7">
                <h2 className="text-2xl font-bold text-[#111315]">{title}</h2>
                <p className="mt-4 leading-7 text-gray-text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="hizmetler" className="bg-white text-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="section-label">{copy.servicesTitle}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {copy.services.map(([no, title, text, items]) => (
              <article key={no as string} className="rounded-[18px] border border-[#E5E2DA] bg-[#F6F4EF] p-7">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#111315] font-black text-white">
                    {no as string}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#111315]">{title as string}</h2>
                    <p className="mt-3 leading-7 text-gray-text">{text as string}</p>
                  </div>
                </div>
                <div className="mt-7 border-t border-[#DDD8CF] pt-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
                    {copy.deliverables}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {(items as string[]).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#E45A2B]" />
                        <span className="leading-7">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111315] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="section-label text-white/60">{copy.methodTitle}</p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.steps.map((step, index) => (
              <article key={step} className="rounded-[14px] border border-white/15 bg-white/5 p-6">
                <span className="text-sm font-black tracking-[0.18em] text-[#F09A7C]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 font-bold">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F4EF] text-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <h2 className="text-3xl font-bold md:text-4xl">{copy.privacyTitle}</h2>
          <p className="rounded-[16px] border border-[#E5E2DA] bg-white p-7 leading-8 text-gray-text">
            {copy.privacy}
          </p>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{copy.finalTitle}</h2>
            <p className="mt-4 max-w-3xl leading-8 text-gray-text">{copy.finalText}</p>
          </div>
          <Link href={withLang('/contact')} className="btn-primary whitespace-nowrap">
            {copy.finalCta} →
          </Link>
        </div>
      </section>
    </>
  )
}
