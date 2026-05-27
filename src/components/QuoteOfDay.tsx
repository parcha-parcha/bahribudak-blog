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
    <div
      className="relative h-full flex flex-col justify-center px-8 py-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f1a3a 0%, #1a3a5c 100%)',
        minHeight: '200px',
      }}
    >
      {/* Sağ üst dekoratif daire */}
      <div
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
        style={{ background: 'rgba(245,197,24,0.06)', border: '1px solid rgba(245,197,24,0.1)' }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: 'rgba(245,197,24,0.04)' }}
      />

      {/* Etiket */}
      <div className="flex items-center gap-2 mb-5 relative z-10">
        <div className="w-6 h-px" style={{ background: '#f5c518' }} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f5c518' }}>
          Günün Sözü
        </span>
      </div>

      {/* Alıntı */}
      <blockquote
        className="relative z-10 font-bold leading-snug mb-6"
        style={{
          fontSize: 'clamp(20px, 2.4vw, 28px)',
          color: '#ffffff',
          fontStyle: 'italic',
          textShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      {/* Yazar */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-0.5 rounded-full" style={{ background: '#f5c518' }} />
        <cite className="not-italic font-semibold text-sm" style={{ color: 'rgba(245,197,24,0.85)' }}>
          {quote.author}
        </cite>
      </div>


    </div>
  )
}
