import Image from 'next/image'
import Link from 'next/link'

interface AboutProps {
  params: Promise<{ lang: string }>
}

const experience = [
  {
    company: 'Rota Tekstil San. Tic. A.Ş.',
    role: 'Genel Müdür Yardımcısı',
    note: 'Üst düzey operasyon ve üretim yönetimi',
  },
  {
    company: 'Karagözlüler Tekstil San. Tic. Ltd. Şti.',
    role: 'İşletme Müdürü',
    note: '',
  },
  {
    company: 'İnternet Tekstil San. Tic. A.Ş.',
    role: 'İşletme Müdürü',
    note: '',
  },
  {
    company: 'Halis Tekstil San. Tic. Ltd. Şti.',
    role: 'İşletme Müdürü',
    note: '',
  },
  {
    company: 'Botaş Nehir Tekstil',
    role: 'İşletme Müdürü',
    note: '',
  },
  {
    company: 'Birlik Örme San. Tic. A.Ş.',
    role: 'Fabrika Müdürü',
    note: '',
  },
  {
    company: 'Tübaş Tekstil',
    role: 'İşletme Müdürü',
    note: '',
  },
  {
    company: 'Turbo Tekstil San. Tic. A.Ş.',
    role: 'Boyahane Müdürü',
    note: '',
  },
  {
    company: 'Senova Tekstil San. Tic. A.Ş.',
    role: 'Gece Müdürü',
    note: '',
  },
  {
    company: 'Yupak Boyama San. Tic. A.Ş.',
    role: 'İşletme Şefi',
    note: '',
  },
]

const skills = [
  'Pamuk, polyester, naylon ve karışım kumaş boyama',
  'Boyahane ve apre proses yönetimi',
  'Kasar, boyama, yıkama, ramöz ve sanfor uygulamaları',
  'Reçete, maliyet, kapasite ve verimlilik hesaplamaları',
  'Kalite kontrol ve laboratuvar sistemleri',
  'Fabrika kurulumu, makine seçimi ve yerleşim planlaması',
  'Teknik dokümantasyon ve üretim izlenebilirliği',
  'Enerji, su ve yardımcı işletmeler yönetimi',
  'Vardiya organizasyonu ve insan odaklı yönetim',
  'Teknik eğitim, yayın ve saha danışmanlığı',
]

const pillars = [
  {
    mark: '01',
    label: 'Tekstil ve Teknik Yayınlar',
    desc: 'Boyama, apre, laboratuvar ve proses bilgisi',
  },
  {
    mark: '02',
    label: 'Üretim ve Yönetim Sistemleri',
    desc: 'Fabrika düzeni, maliyet, verimlilik ve izlenebilirlik',
  },
  {
    mark: '03',
    label: 'Kişisel Gelişim',
    desc: 'Mesleki gelişim, liderlik ve çalışma kültürü',
  },
  {
    mark: '04',
    label: 'Sektörel ve Güncel Analizler',
    desc: 'Tekstil sektörü, ekonomi ve üretim gündemi',
  },
]

const stats = [
  { number: '35+', unit: 'Yıl', label: 'Tekstil Sektörü Deneyimi' },
  { number: '10+', unit: 'İşletme', label: 'Yönetim ve Saha Tecrübesi' },
  { number: '360°', unit: '', label: 'Üretim ve Yönetim Yaklaşımı' },
]

export default async function AboutPage({ params }: AboutProps) {
  const { lang } = await params

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* HEADER */}
        <div className="mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2EA6D9]">
            Hakkımda
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight text-[#0B2343]">
            Tekstil Boyama ve Apre Uzmanı
          </h1>

          <p className="max-w-2xl text-base font-medium leading-relaxed text-[#12365E]/80">
            Proses Yönetimi · Fabrika Sistemleri · Teknik Yayınlar
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-[#2EA6D9]" />
        </div>

        {/* PROFİL KARTI */}
        <div className="mb-14 flex flex-col items-start gap-8 rounded-2xl border border-[#D7E0EA] bg-white p-8 shadow-sm sm:flex-row">
          <div className="relative h-28 w-28 flex-shrink-0">
            <Image
              src="/images/bahri-budak.jpeg"
              alt="Bahri Budak"
              fill
              className="rounded-2xl object-cover object-top"
              priority
            />
          </div>

          <div>
            <h2 className="mb-1 text-2xl font-bold text-[#0B2343]">
              Bahri Budak
            </h2>

            <p className="mb-3 text-sm font-semibold text-[#2EA6D9]">
              Tekstil Boyama ve Apre Uzmanı
            </p>

            <p className="mb-4 text-sm leading-relaxed text-[#0B2343]/85">
              Örme, boyahane, apre, kalite kontrol, laboratuvar, planlama ve
              fabrika yönetimi alanlarında 35 yılı aşkın saha ve yönetim
              deneyimine sahibim. Edindiğim birikimi; uygulanabilir teknik
              sistemlere, eğitim içeriklerine ve sektörel yayınlara
              dönüştürüyorum.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                'Ergene / Tekirdağ',
                'bahribudak.com',
                'bahribudak@gmail.com',
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E0EA] bg-[#F3F6FA] px-3 py-1 text-xs text-[#0B2343]/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#D7E0EA] bg-white p-5 text-center shadow-sm"
            >
              <div className="mb-1 flex items-end justify-center gap-1">
                <span className="text-3xl font-bold text-[#0B2343]">
                  {stat.number}
                </span>

                {stat.unit && (
                  <span className="mb-0.5 text-sm font-semibold text-[#12365E]/70">
                    {stat.unit}
                  </span>
                )}
              </div>

              <p className="text-xs leading-snug text-[#0B2343]/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* PROFESYONEL PROFİL */}
        <section className="mb-14">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#0B2343]">
            <span className="h-6 w-1 rounded-full bg-[#2EA6D9]" />
            Profesyonel Profil
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#0B2343]/80">
            <p>
              Tekstil sektöründeki mesleki yolculuğum; üretimin içinden
              başlayarak işletme ve fabrika yönetimine uzanan, saha temelli bir
              deneyime dayanmaktadır. Boyahane ve apre süreçlerinde yalnızca
              reçete veya makine ayarlarını değil, üretim sisteminin tamamını
              birlikte değerlendiriyorum.
            </p>

            <p>
              Uzmanlık alanım; pamuk, polyester, naylon ve karışım kumaşların
              boyama ve terbiye proseslerinin doğru kurulması, süreçlerin
              ölçülebilir hâle getirilmesi, kalite sürekliliğinin sağlanması ve
              üretim kayıplarının azaltılmasıdır.
            </p>

            <p>
              Çalışmalarımda proses yönetimi, maliyet kontrolü, kapasite
              planlama, enerji ve su kullanımı, kalite kontrol, laboratuvar,
              teknik dokümantasyon, üretim izlenebilirliği ve insan odaklı
              yönetimi bütünsel bir sistem olarak ele alıyorum.
            </p>

            <p>
              Saha tecrübemi anlaşılır ve uygulanabilir teknik bilgiye
              dönüştürerek tekstil profesyonelleriyle paylaşmaya devam
              ediyorum.
            </p>
          </div>
        </section>

        {/* YAKLAŞIM */}
        <section className="mb-14 rounded-2xl bg-[#0B2343] p-8 text-white">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#5BBBE6]">
            Çalışma Yaklaşımım
          </p>

          <h2 className="mb-4 text-2xl font-bold">
            Bilgiyle Kurulur. Sistemle Büyür.
          </h2>

          <p className="text-sm leading-relaxed text-white/75">
            Kalıcı başarı; doğru proses, ölçülebilir hedefler, güvenilir veri,
            nitelikli insan kaynağı ve sürdürülebilir yönetim sistemlerinin
            birlikte çalışmasıyla oluşur.
          </p>
        </section>

        {/* PROFESYONEL DENEYİM */}
        <section className="mb-14">
          <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#0B2343]">
            <span className="h-6 w-1 rounded-full bg-[#2EA6D9]" />
            Profesyonel Deneyim
          </h2>

          <p className="mb-4 text-xs italic text-[#0B2343]/60">
            Çalışma tarihleri ve referanslar talep doğrultusunda sunulur.
          </p>

          <div className="flex flex-col gap-3">
            {experience.map((item, index) => (
              <div
                key={`${item.company}-${item.role}`}
                className="flex items-start gap-4 rounded-xl border border-[#D7E0EA] bg-white p-4 transition-all hover:border-[#2EA6D9]/50 hover:shadow-sm"
              >
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EAF6FC]">
                  <span className="text-xs font-bold text-[#0B2343]/75">
                    {index + 1}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#0B2343]">
                    {item.company}
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-[#2EA6D9]">
                    {item.role}
                  </p>

                  {item.note && (
                    <p className="mt-0.5 text-xs italic text-[#0B2343]/60">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YETKİNLİKLER */}
        <section className="mb-14">
          <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#0B2343]">
            <span className="h-6 w-1 rounded-full bg-[#2EA6D9]" />
            Uzmanlık ve Yetkinlikler
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-2 rounded-full border border-[#D7E0EA] bg-white px-4 py-2 text-sm text-[#0B2343]"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2EA6D9]" />
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* İÇERİK ALANLARI */}
        <section className="mb-14">
          <h2 className="mb-2 flex items-center gap-3 text-xl font-bold text-[#0B2343]">
            <span className="h-6 w-1 rounded-full bg-[#2EA6D9]" />
            Yayın ve İçerik Alanları
          </h2>

          <p className="mb-6 text-sm text-[#0B2343]/70">
            bahribudak.com üzerindeki içerikler dört ana başlık altında
            yayımlanmaktadır.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <Link
                key={pillar.label}
                href={`/${lang}/blog`}
                className="group flex flex-col rounded-xl border border-[#D7E0EA] bg-white p-5 transition-all hover:border-[#2EA6D9] hover:shadow-md"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#2EA6D9]/30 bg-[#EAF6FC] text-xs font-bold text-[#0B2343]">
                  {pillar.mark}
                </span>

                <span className="text-sm font-bold text-[#0B2343] transition-colors group-hover:text-[#2EA6D9]">
                  {pillar.label}
                </span>

                <span className="mt-2 text-xs leading-relaxed text-[#0B2343]/65">
                  {pillar.desc}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#D7E0EA]" />
          <div className="h-2 w-2 rounded-full bg-[#2EA6D9]" />
          <div className="h-px flex-1 bg-[#D7E0EA]" />
        </div>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-6 text-sm text-[#0B2343]/80">
            Teknik danışmanlık, eğitim, fabrika sistemi veya yayınlarla ilgili
            iletişime geçebilirsiniz.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/contact`}
              className="rounded-xl bg-[#0B2343] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12365E]"
            >
              İletişime Geç →
            </Link>

            <Link
              href={`/${lang}/hizmetler`}
              className="rounded-xl border border-[#0B2343] bg-white px-6 py-3 text-sm font-semibold text-[#0B2343] transition-colors hover:bg-[#EAF6FC]"
            >
              Hizmetleri İncele
            </Link>
          </div>

          <p className="mt-6 text-xs text-[#0B2343]/60">
            bahribudak@gmail.com · bahribudak.com · Ergene / Tekirdağ
          </p>
        </section>
      </div>
    </main>
  )
}
