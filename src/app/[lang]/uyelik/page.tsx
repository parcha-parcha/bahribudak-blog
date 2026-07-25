import type { Metadata } from 'next'
import Link from 'next/link'

import type { Lang } from '@/lib/i18n'

const siteUrl = 'https://bahribudak.com'
const bb507Price = 399

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  const title =
    lang === 'tr'
      ? 'Üyelik ve Profesyonel Teknik Dosya Erişimi'
      : 'Membership and Professional Technical File Access'

  const description =
    lang === 'tr'
      ? 'Ücretsiz üyelik kapsamını, BB-507 Ram Bacası Temizliği Profesyonel Paketini ve teknik dosyalara erişim modelini inceleyin.'
      : 'Review free membership access, the BB-507 Stenter Exhaust Cleaning Professional Package and the technical file access model.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/uyelik`,
      languages: {
        tr: `${siteUrl}/tr/uyelik`,
        en: `${siteUrl}/en/uyelik`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}/uyelik`,
      title,
      description,
    },
  }
}

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const tr = lang === 'tr'

  const registerHref = tr ? '/tr/kayit' : '/en/register'
  const loginHref = tr ? '/tr/giris' : '/en/login'
  const publicationsHref = `/${lang}/blog`
  const accountHref = tr ? '/tr/hesabim' : '/en/account'
  const paymentHref =
    process.env.NEXT_PUBLIC_BB507_PAYMENT_URL?.trim() || ''

  const formattedPrice = new Intl.NumberFormat(
    tr ? 'tr-TR' : 'en-US',
    {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    },
  ).format(bb507Price)

  const copy = tr
    ? {
        eyebrow: 'BB-DMS • ÜYELİK VE SATIN ALMA',
        title:
          'Teknik bilgiye ücretsiz erişim, profesyonel dosyalara kontrollü satın alma',
        summary:
          'Makaleleri ve PDF yayınları inceleyin; düzenlenebilir teknik dokümanları tek seferlik profesyonel paketlerle edinin.',
        noticeTitle: 'Başlangıç satış modeli',
        noticeText:
          'Ücretsiz üyelik devam eder. İlk ücretli ürün tek seferlik satın alma modeliyle sunulur; otomatik yenilenen abonelik değildir.',
        freePlan: 'Ücretsiz Üyelik',
        freePrice: 'Ücretsiz',
        freeText:
          'Teknik yayın sistemine kayıt olun, hesabınızı yönetin ve üyelik korumalı ücretsiz dosyalara erişin.',
        freeFeatures: [
          'Teknik makalelere ve açık PDF yayınlarına erişim',
          'Ücretsiz olarak sunulan DOCX ve PPTX dosyalarına giriş sonrası erişim',
          'İndirme geçmişi ve tekrar indirme',
          'Masaüstü ve mobil uyumlu hesap sistemi',
        ],
        freeButton: 'Ücretsiz Hesap Oluştur',
        loginButton: 'Zaten Hesabım Var',
        productLabel: 'İLK PROFESYONEL PAKET',
        productCode: 'BB-507',
        productTitle:
          'Tekstilde Ram Bacalarının Temizliği Profesyonel Paket',
        oneTime: 'Tek seferlik satın alma',
        productText:
          'Ramöz baca ve kanal temizliğini yangın önleme, bakım planlama, saha kontrolü ve kurumsal kayıt disipliniyle ele alan düzenlenebilir teknik doküman seti.',
        productFeatures: [
          'Teknik Master PDF',
          'Düzenlenebilir Teknik Master DOCX',
          'Düzenlenebilir eğitim ve sunum PPTX',
          'Kontrol listeleri ve uygulama kayıt yapısı',
          'Hesap üzerinden tekrar indirme erişimi',
        ],
        buyNow: 'Profesyonel Paketi Satın Al',
        paymentPreparing: 'Ödeme Bağlantısı Hazırlanıyor',
        securePayment:
          'Satın alma düğmesi, güvenli ödeme bağlantısı tanımlandığında otomatik olarak aktif olur.',
        previewButton: 'Teknik Yayınları İncele',
        accessTitle: 'Erişim ve ürün modeli',
        accessCards: [
          {
            no: '01',
            title: 'Açık teknik içerik',
            text: 'Makaleler ve açık erişimli PDF yayınları üyelik gerektirmeden incelenebilir.',
          },
          {
            no: '02',
            title: 'Ücretsiz üye dosyaları',
            text: 'Ücretsiz olarak işaretlenen düzenlenebilir dosyalar giriş sonrasında indirilebilir.',
          },
          {
            no: '03',
            title: 'Profesyonel paketler',
            text: 'Ücretli teknik paketler satın alma kaydı bulunan hesaba tanımlanır.',
          },
        ],
        workflowTitle: 'Satın alma akışı',
        workflowSteps: [
          {
            title: 'Hesap',
            text: 'Kullanıcı ücretsiz hesabıyla giriş yapar veya yeni hesap oluşturur.',
          },
          {
            title: 'Ödeme',
            text: 'Profesyonel paket için tek seferlik güvenli ödeme tamamlanır.',
          },
          {
            title: 'Erişim',
            text: 'Satın alınan paket kullanıcı hesabına tanımlanır ve yeniden indirilebilir.',
          },
        ],
        futureLabel: 'SONRAKİ FAZ',
        futureTitle: 'Profesyonel üyelik aboneliği',
        futureText:
          'Yeni yayın bildirimleri, revizyon güncellemeleri, toplu paketler ve genişletilmiş arşiv erişimi için abonelik modeli satış verileri oluştuktan sonra değerlendirilecektir.',
        comingSoon: 'Planlanıyor',
        accountButton: 'Hesabımı Aç',
        faqTitle: 'Sık Sorulan Sorular',
        faqs: [
          {
            q: 'Ücretsiz üyelik devam edecek mi?',
            a: 'Evet. Ücretsiz üyelik ve ücretsiz olarak işaretlenen dosyalara erişim devam edecektir.',
          },
          {
            q: '399 TL aylık ücret mi?',
            a: 'Hayır. BB-507 için belirlenen 399 TL, tek seferlik profesyonel paket fiyatıdır.',
          },
          {
            q: 'Satın aldığım dosyaları yeniden indirebilir miyim?',
            a: 'Evet. Satın alma kaydı hesabınıza tanımlandığında dosyalar hesap alanından yeniden indirilebilir.',
          },
          {
            q: 'Abonelik ne zaman başlayacak?',
            a: 'Abonelik modeli ilk tekil paket satışlarının sonuçları değerlendirildikten sonra ayrıca planlanacaktır.',
          },
        ],
      }
    : {
        eyebrow: 'BB-DMS • MEMBERSHIP AND PURCHASE',
        title:
          'Free access to technical knowledge, controlled purchase of professional files',
        summary:
          'Review articles and PDF publications, then obtain editable technical documents through one-time professional packages.',
        noticeTitle: 'Initial sales model',
        noticeText:
          'Free membership continues. The first paid product is offered as a one-time purchase, not an automatically renewing subscription.',
        freePlan: 'Free Membership',
        freePrice: 'Free',
        freeText:
          'Register for the technical publication system, manage your account and access protected free files.',
        freeFeatures: [
          'Access to technical articles and open PDF publications',
          'Access to free DOCX and PPTX files after sign-in',
          'Download history and repeat downloads',
          'Desktop and mobile compatible account system',
        ],
        freeButton: 'Create Free Account',
        loginButton: 'I Already Have an Account',
        productLabel: 'FIRST PROFESSIONAL PACKAGE',
        productCode: 'BB-507',
        productTitle:
          'Stenter Exhaust Cleaning Professional Package',
        oneTime: 'One-time purchase',
        productText:
          'An editable technical document set covering stenter exhaust and duct cleaning through fire prevention, maintenance planning, field control and corporate record discipline.',
        productFeatures: [
          'Technical Master PDF',
          'Editable Technical Master DOCX',
          'Editable training and presentation PPTX',
          'Checklists and implementation record structure',
          'Repeat-download access through the account',
        ],
        buyNow: 'Purchase Professional Package',
        paymentPreparing: 'Payment Link Is Being Prepared',
        securePayment:
          'The purchase button becomes active automatically when the secure payment link is configured.',
        previewButton: 'Browse Technical Publications',
        accessTitle: 'Access and product model',
        accessCards: [
          {
            no: '01',
            title: 'Open technical content',
            text: 'Articles and open-access PDF publications can be reviewed without membership.',
          },
          {
            no: '02',
            title: 'Free member files',
            text: 'Editable files marked as free can be downloaded after sign-in.',
          },
          {
            no: '03',
            title: 'Professional packages',
            text: 'Paid technical packages are assigned to the account holding the purchase record.',
          },
        ],
        workflowTitle: 'Purchase workflow',
        workflowSteps: [
          {
            title: 'Account',
            text: 'The user signs in with a free account or creates a new account.',
          },
          {
            title: 'Payment',
            text: 'A secure one-time payment is completed for the professional package.',
          },
          {
            title: 'Access',
            text: 'The purchased package is assigned to the account and remains available for repeat downloads.',
          },
        ],
        futureLabel: 'NEXT PHASE',
        futureTitle: 'Professional membership subscription',
        futureText:
          'A subscription model for publication alerts, revision updates, bundled packages and expanded archive access will be evaluated after initial sales data is available.',
        comingSoon: 'Planned',
        accountButton: 'Open My Account',
        faqTitle: 'Frequently Asked Questions',
        faqs: [
          {
            q: 'Will free membership continue?',
            a: 'Yes. Free membership and access to files marked as free will continue.',
          },
          {
            q: 'Is TRY 399 a monthly fee?',
            a: 'No. TRY 399 is the one-time price of the BB-507 professional package.',
          },
          {
            q: 'Can I download purchased files again?',
            a: 'Yes. Once the purchase record is assigned to your account, the files can be downloaded again from the account area.',
          },
          {
            q: 'When will subscriptions start?',
            a: 'The subscription model will be planned separately after the results of the first individual package sales are evaluated.',
          },
        ],
      }

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="relative overflow-hidden border-b border-[#163B68] bg-[#071E3A] text-white">
        <div
          className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#2EA6D9]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#65C6EA]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#DCE8F5]">
            {copy.summary}
          </p>

          <div className="mt-8 max-w-4xl rounded-[1.5rem] border border-[#65C6EA]/35 bg-white/[0.06] p-5">
            <p className="font-black text-white">
              {copy.noticeTitle}
            </p>
            <p className="mt-2 text-sm leading-7 text-[#DCE8F5]">
              {copy.noticeText}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="flex flex-col rounded-[2rem] border border-[#B9DFF0] bg-white p-7 shadow-[0_20px_55px_rgba(11,35,67,0.08)] md:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2A8EB8]">
                  {copy.freePlan}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {copy.freePrice}
                </h2>
              </div>

              <span className="rounded-full bg-[#EAF6FC] px-4 py-2 text-xs font-black text-[#075A7D]">
                {copy.freePlan}
              </span>
            </div>

            <p className="mt-5 leading-7 text-[#4C5561]">
              {copy.freeText}
            </p>

            <ul className="mt-7 space-y-3">
              {copy.freeFeatures.map(feature => (
                <Feature key={feature}>{feature}</Feature>
              ))}
            </ul>

            <div className="mt-auto grid gap-3 pt-8">
              <Link
                href={registerHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B2343] px-5 text-center text-sm font-black text-white transition hover:bg-[#163A64]"
              >
                {copy.freeButton}
              </Link>

              <Link
                href={loginHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9D1DC] bg-white px-5 text-center text-sm font-black text-[#0B2343] transition hover:border-[#0B2343]"
              >
                {copy.loginButton}
              </Link>
            </div>
          </article>

          <article className="relative flex flex-col overflow-hidden rounded-[2rem] border border-[#2EA6D9] bg-[#071E3A] p-7 text-white shadow-[0_26px_80px_rgba(7,30,58,0.2)] md:p-9">
            <div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#65C6EA]">
                    {copy.productLabel}
                  </p>
                  <p className="mt-3 text-sm font-black tracking-[0.18em] text-white/65">
                    {copy.productCode}
                  </p>
                </div>

                <span className="rounded-full border border-[#65C6EA]/40 bg-[#2EA6D9]/15 px-4 py-2 text-xs font-black text-[#A8E4F7]">
                  {copy.oneTime}
                </span>
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] text-white md:text-4xl">
                {copy.productTitle}
              </h2>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <p className="text-5xl font-black tracking-[-0.05em] text-white">
                  {formattedPrice}
                </p>
                <span className="pb-1 text-sm font-bold text-[#A8B9CC]">
                  {copy.oneTime}
                </span>
              </div>

              <p className="mt-5 max-w-3xl leading-7 text-[#DCE8F5]">
                {copy.productText}
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {copy.productFeatures.map(feature => (
                  <Feature key={feature} dark>
                    {feature}
                  </Feature>
                ))}
              </ul>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {paymentHref ? (
                  <a
                    href={paymentHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2EA6D9] px-5 text-center text-sm font-black text-[#071E3A] transition hover:bg-[#65C6EA]"
                  >
                    {copy.buyNow}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full bg-white/12 px-5 text-center text-sm font-black text-white/65"
                  >
                    {copy.paymentPreparing}
                  </span>
                )}

                <Link
                  href={publicationsHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-5 text-center text-sm font-black text-white transition hover:border-white hover:bg-white hover:text-[#071E3A]"
                >
                  {copy.previewButton}
                </Link>
              </div>

              <p className="mt-4 text-xs leading-6 text-[#A8B9CC]">
                {copy.securePayment}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-[#D8DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
          <h2 className="text-3xl font-black tracking-[-0.035em] md:text-4xl">
            {copy.accessTitle}
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {copy.accessCards.map(card => (
              <AccessCard
                key={card.no}
                no={card.no}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.035em] md:text-4xl">
              {copy.workflowTitle}
            </h2>

            <div className="mt-8 grid gap-4">
              {copy.workflowSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="grid gap-4 rounded-[1.5rem] border border-[#D8DEE8] bg-white p-5 sm:grid-cols-[52px_1fr]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B2343] text-sm font-black text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#0B2343]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#4C5561]">
                      {step.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <article className="rounded-[2rem] border border-[#D8DEE8] bg-[#F8FAFC] p-7 md:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66717E]">
                  {copy.futureLabel}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0B2343]">
                  {copy.futureTitle}
                </h2>
              </div>

              <span className="rounded-full border border-[#D8DEE8] bg-white px-4 py-2 text-xs font-black text-[#66717E]">
                {copy.comingSoon}
              </span>
            </div>

            <p className="mt-5 leading-7 text-[#4C5561]">
              {copy.futureText}
            </p>

            <Link
              href={accountHref}
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-[#0B2343] px-5 text-center text-sm font-black text-[#0B2343] transition hover:bg-[#0B2343] hover:text-white"
            >
              {copy.accountButton}
            </Link>
          </article>
        </div>
      </section>

      <section className="border-t border-[#D8DEE8] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-18">
          <h2 className="text-center text-3xl font-black tracking-[-0.035em] md:text-4xl">
            {copy.faqTitle}
          </h2>

          <div className="mt-8 space-y-4">
            {copy.faqs.map(item => (
              <details
                key={item.q}
                className="group rounded-[1.4rem] border border-[#D8DEE8] bg-white px-6 py-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none pr-8 font-black text-[#0B2343]">
                  {item.q}
                </summary>
                <p className="mt-3 leading-7 text-[#4C5561]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function Feature({
  children,
  dark = false,
}: {
  children: string
  dark?: boolean
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
          dark
            ? 'bg-[#2EA6D9] text-[#071E3A]'
            : 'bg-[#2EA6D9] text-white'
        }`}
        aria-hidden="true"
      >
        ✓
      </span>
      <span
        className={`text-sm font-semibold leading-6 ${
          dark ? 'text-[#DCE8F5]' : 'text-[#344152]'
        }`}
      >
        {children}
      </span>
    </li>
  )
}

function AccessCard({
  no,
  title,
  text,
}: {
  no: string
  title: string
  text: string
}) {
  return (
    <article className="rounded-[1.5rem] border border-[#D8DEE8] bg-[#F7F9FC] p-6">
      <span className="text-sm font-black tracking-[0.18em] text-[#2EA6D9]">
        {no}
      </span>
      <h3 className="mt-4 text-lg font-black text-[#0B2343]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#4C5561]">
        {text}
      </p>
    </article>
  )
}
