'use client'

const quotes = [
  { text: "Bilgelik, ne bilmediğini bilmektir.", author: "Sokrates" },
  { text: "İnsan, düşündüğü gibi yaşamazsa, yaşadığı gibi düşünmeye başlar.", author: "Paul Bourget" },
  { text: "Engel, yolu göremeyenlerin gördüğü şeydir.", author: "Henry Ford" },
  { text: "Başarı, her gün tekrarlanan küçük çabaların toplamıdır.", author: "Robert Collier" },
  { text: "Değişemeyen tek şey değişimin kendisidir.", author: "Herakleitos" },
  { text: "Büyük işler, büyük cesaret ister.", author: "Thukydides" },
  { text: "Fırsatlar, hazırlıklı zihinleri tercih eder.", author: "Louis Pasteur" },
  { text: "Düşünmek zordur; bu yüzden çoğu insan hüküm verir.", author: "Carl Jung" },
  { text: "Öğrenmenin tek yolu sorgulamaktır.", author: "Aristoteles" },
  { text: "Kendi kendinin efendisi ol.", author: "Epiktetos" },
  { text: "Sabır, en güçlü silahlardan biridir.", author: "Marcus Aurelius" },
  { text: "Yaptığın işi sev, sevdiğin işi yap.", author: "Konfüçyüs" },
  { text: "Deha, sonsuz bir sabır meselesidir.", author: "Michelangelo" },
  { text: "Her şeyin ölçüsü insandır.", author: "Protagoras" },
  { text: "Güç, zorluklardan geçerek büyür.", author: "Seneca" },
  { text: "Bilgi güçtür.", author: "Francis Bacon" },
  { text: "Hayat, anlaşılmayı bekleyen bir gizem değil; yaşanmayı bekleyen bir macera.", author: "Eleanor Roosevelt" },
  { text: "Düşünce, eylemin tohumudur.", author: "Ralph Waldo Emerson" },
  { text: "İyi bir başlangıç, işin yarısıdır.", author: "Aristoteles" },
  { text: "Alçakgönüllülük, bilginin kapısıdır.", author: "Lao Tzu" },
  { text: "Zaman, en değerli varlığındır.", author: "Theophrastus" },
  { text: "Başarı tesadüf değil, hazırlığın fırsatla buluşmasıdır.", author: "Seneca" },
  { text: "Gerçek bilgelik, kendi sınırlarını bilmektir.", author: "Sokrates" },
  { text: "Karakter, kimse izlemiyorken yaptıklarındır.", author: "C.S. Lewis" },
  { text: "Hayaller gerçeğin taslağıdır.", author: "Henry David Thoreau" },
  { text: "İnsanı büyük yapan, düştüğünde değil kalktığında belli olur.", author: "Konfüçyüs" },
  { text: "Sürekli gelişim, başarının temelidir.", author: "W. Edwards Deming" },
  { text: "Doğruyu söylemek cesaret ister.", author: "Aristoteles" },
  { text: "Ağaç yaşken eğilir.", author: "Türk Atasözü" },
  { text: "Akıl yürütmek, insana özgü en yüce armağandır.", author: "Platon" },
  { text: "Her gün yeni bir başlangıçtır.", author: "Marcus Aurelius" },
  { text: "Başkalarını anlamak zekadır; kendini anlamak gerçek aydınlanmadır.", author: "Lao Tzu" },
]

function getDayQuote() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return quotes[dayOfYear % quotes.length]
}

export default function QuoteOfDay() {
  const quote = getDayQuote()

  return (
    <div className="relative h-full flex flex-col justify-center p-6 md:p-8 overflow-hidden"
      style={{ minHeight: '180px' }}>

      {/* Dekoratif büyük tırnak işareti — arka planda */}
      <div
        className="absolute top-0 left-4 font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: '140px',
          color: 'rgba(245,197,24,0.12)',
          fontFamily: 'Georgia, serif',
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* Etiket */}
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <div className="w-5 h-px bg-yellow-bb" />
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#f5c518' }}
        >
          Günün Sözü
        </span>
      </div>

      {/* Alıntı metni */}
      <blockquote
        className="relative z-10 font-bold leading-snug mb-5"
        style={{
          fontSize: 'clamp(18px, 2.2vw, 26px)',
          color: '#0f1a3a',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      {/* Yazar */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-8 h-0.5 bg-yellow-bb" />
        <cite
          className="not-italic font-semibold text-sm"
          style={{ color: '#4a6a8a' }}
        >
          {quote.author}
        </cite>
      </div>

      {/* Sol dekoratif şerit */}
      <div
        className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
        style={{ background: 'linear-gradient(180deg, #f5c518, rgba(245,197,24,0.2))' }}
      />
    </div>
  )
}
