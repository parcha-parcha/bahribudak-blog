import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Üyelik Koşulları',
  description: 'Bahri Budak ücretsiz teknik üyelik sistemi üyelik koşulları.',
  robots: { index: false, follow: true },
}

export default async function MembershipTermsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (lang !== 'tr') redirect('/en/membership-terms')

  return (
    <main className="min-h-screen bg-[#F6F4EF] px-4 py-10 text-[#111315] md:px-6 md:py-16">
      <article className="mx-auto max-w-4xl rounded-[14px] border border-[#E5E2DA] bg-white p-7 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
          ÜYELİK VE ERİŞİM
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-5xl">
          Üyelik Koşulları
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#6F7782]">
          Son güncelleme: 17 Ağustos 2026
        </p>

        <div className="mt-8 space-y-8 text-[15px] leading-7 text-[#39414A]">
          <section>
            <h2 className="text-xl font-black text-[#111315]">1. Üyeliğin kapsamı</h2>
            <p className="mt-2">
              Bahri Budak teknik yayın sistemindeki üyelik ücretsizdir. Doğrulanmış üyelik hesabı; teknik yayınlara, kontrol listelerine, proses formlarına ve sunulan indirilebilir dosyalara erişim sağlar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">2. Hesap oluşturma ve doğrulama</h2>
            <p className="mt-2">
              Üyelik için geçerli bir e-posta adresi kullanılması ve gerekli kayıt alanlarının doğru bilgilerle doldurulması beklenir. E-posta doğrulaması tamamlanmadan bazı üye özellikleri kullanılamayabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">3. Hesap güvenliği</h2>
            <p className="mt-2">
              Üye, hesabına ait parola ve erişim bilgilerinin güvenliğinden sorumludur. Hesabın yetkisiz kişilerle paylaşılmaması gerekir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">4. Teknik içeriklerin kullanımı</h2>
            <p className="mt-2">
              Yayınlar mesleki ve bilgilendirme amaçlı sunulur. İçeriklerin izinsiz biçimde toplu olarak yeniden yayımlanması, satılması veya farklı bir hizmetin parçası olarak dağıtılması uygun değildir. Kaynak gösterilerek yapılan makul alıntılar saklıdır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">5. Teknik sorumluluk</h2>
            <p className="mt-2">
              Yayınlardaki teknik bilgiler genel değerlendirme ve saha uygulamalarını desteklemek amacıyla hazırlanır. İşletmeye özgü proses, ekipman, kimyasal, iş güvenliği ve mevzuat koşulları ayrıca değerlendirilmelidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">6. Hizmetin sürekliliği</h2>
            <p className="mt-2">
              Sistem bakım, güvenlik, teknik güncelleme veya zorunlu işletim nedenleriyle geçici olarak erişilemez olabilir. Yayın ve dosya yapısı gerekli görüldüğünde güncellenebilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">7. Üyeliğin sonlandırılması</h2>
            <p className="mt-2">
              Üye, hesabıyla ilgili destek veya üyelik sonlandırma talebini iletişim kanalı üzerinden iletebilir. Sistemin kötüye kullanılması, güvenlik riski oluşturulması veya erişim kurallarının ağır biçimde ihlal edilmesi durumunda hesap erişimi sınırlandırılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">8. Güncellemeler</h2>
            <p className="mt-2">
              Üyelik koşulları hizmet yapısındaki değişikliklere göre güncellenebilir. Güncel metin bu sayfada yayımlanır.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-[#E5E2DA] pt-6">
          <Link
            href="/tr/kayit"
            className="font-black text-[#111315] underline decoration-[#E45A2B] decoration-2 underline-offset-4"
          >
            Kayıt sayfasına dön
          </Link>
        </div>
      </article>
    </main>
  )
}
