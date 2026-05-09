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
    <div className="quote-of-day">
      <div className="quote-of-day__label">✦ Günün Sözü</div>
      <blockquote className="quote-of-day__text">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <cite className="quote-of-day__author">— {quote.author}</cite>
    </div>
  )
}
