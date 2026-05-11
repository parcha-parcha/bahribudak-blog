"use client";

import { useState } from "react";

const services = [
  {
    id: 1,
    icon: "🏭",
    title: "Danışmanlık",
    subtitle: "Fabrika Yönetimi & Lean Üretim",
    description:
      "Tekstil fabrikalarında üretim verimliliği, süreç iyileştirme ve lean yönetim konularında birebir danışmanlık hizmeti sunuyorum.",
    price: "5.000 TL / ay",
    note: "İlk görüşme ücretsiz",
    details: ["Ayda 2-4 saha ziyareti", "Online destek dahil", "Haftalık ilerleme raporu"],
    highlight: true,
  },
  {
    id: 2,
    icon: "✍️",
    title: "İçerik Üretimi & Sosyal Medya",
    subtitle: "LinkedIn & Instagram",
    description:
      "Markanızı büyütmek için haftalık içerik takvimi, özgün yazılar ve görsel tasarımlarla sosyal medya yönetimi yapıyorum.",
    price: "2.000 – 3.500 TL / ay",
    note: null,
    details: ["LinkedIn + Instagram", "Haftalık içerik takvimi", "Görsel tasarım dahil"],
    highlight: false,
  },
  {
    id: 3,
    icon: "🎨",
    title: "Adobe Tasarım Hizmetleri",
    subtitle: "Profesyonel Grafik Tasarım",
    description:
      "Adobe Creative Suite ile profesyonel tasarım çözümleri. Her proje için özgün ve kurumsal kimliğinize uygun tasarımlar.",
    price: null,
    note: null,
    details: null,
    highlight: false,
    subServices: [
      { name: "Poster", price: "500 – 800 TL" },
      { name: "Afiş", price: "500 – 800 TL" },
      { name: "Logo", price: "1.000 – 2.000 TL" },
      { name: "El İlanı", price: "300 – 500 TL" },
      { name: "Broşür", price: "600 – 1.000 TL" },
      { name: "Katalog (8-16 sayfa)", price: "1.500 – 2.500 TL" },
      { name: "Dergi (12-24 sayfa)", price: "2.500 – 4.000 TL" },
    ],
  },
  {
    id: 4,
    icon: "📝",
    title: "Blog Yazarlığı",
    subtitle: "Tekstil · Felsefe · Kişisel Gelişim · Kurumsal",
    description:
      "SEO uyumlu, özgün ve derinlikli blog yazıları. Sektörel bilgi ile felsefi derinliği bir araya getiren içerikler.",
    price: null,
    note: null,
    details: null,
    highlight: false,
    subServices: [
      { name: "Kısa makale (500-800 kelime)", price: "300 – 500 TL" },
      { name: "Orta makale (800-1.500 kelime)", price: "500 – 900 TL" },
      { name: "Uzun makale (1.500+ kelime)", price: "900 – 1.500 TL" },
    ],
  },
];

const reasons = [
  { icon: "🏭", text: "Yılların fabrika yönetimi deneyimi" },
  { icon: "📚", text: "Felsefe ve kişisel gelişim birikimi" },
  { icon: "🇹🇷", text: "Türkiye tekstil sektörüne hakimiyet" },
  { icon: "🎯", text: "Sonuç odaklı, pratik çözümler" },
];

export default function HizmetlerPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div style={{ background: "#0f1a3a", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(245,197,24,0.06)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(245,197,24,0.04)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(245,197,24,0.15)", border: "1px solid rgba(245,197,24,0.3)", borderRadius: 100, padding: "6px 20px", marginBottom: 24 }}>
            <span style={{ color: "#f5c518", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Hizmetler</span>
          </div>
          <h1 style={{ color: "#ffffff", fontSize: 42, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
            Birlikte <span style={{ color: "#f5c518" }}>büyüyelim</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Tekstil, tasarım, içerik ve danışmanlık alanlarında profesyonel destek sunuyorum.
          </p>
        </div>
      </div>

      {/* Services */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {services.map((s) => (
            <div
              key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                border: `2px solid ${hovered === s.id ? "#f5c518" : s.highlight ? "#1a3a5c" : "#e2e8f0"}`,
                overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: hovered === s.id ? "0 8px 32px rgba(26,58,92,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "28px 28px 20px" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.highlight ? "#0f1a3a" : "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#1a3a5c" }}>{s.title}</h2>
                      <p style={{ margin: 0, fontSize: 13, color: "#64748b", fontWeight: 500 }}>{s.subtitle}</p>
                    </div>
                    {s.price && (
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#1a3a5c" }}>{s.price}</div>
                        {s.note && (
                          <div style={{ display: "inline-block", background: "#fef9e7", border: "1px solid #f5c518", borderRadius: 100, padding: "3px 12px", marginTop: 6 }}>
                            <span style={{ fontSize: 11, color: "#92660a", fontWeight: 600 }}>✨ {s.note}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: "#f1f5f9", margin: "0 28px" }} />

              <div style={{ padding: "20px 28px 28px" }}>
                <p style={{ margin: "0 0 20px", fontSize: 15, color: "#475569", lineHeight: 1.7 }}>{s.description}</p>

                {s.details && (
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {s.details.map((d, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "#f0f4f8", borderRadius: 8, padding: "6px 14px" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5c518" }} />
                        <span style={{ fontSize: 13, color: "#1a3a5c", fontWeight: 500 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                )}

                {s.subServices && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                    {s.subServices.map((sub, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", borderRadius: 10, padding: "12px 16px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{sub.name}</span>
                        <span style={{ fontSize: 14, color: "#1a3a5c", fontWeight: 700, whiteSpace: "nowrap", marginLeft: 12 }}>{sub.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Neden Bahri Budak */}
        <div style={{ marginTop: 60, background: "#0f1a3a", borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(245,197,24,0.08)" }} />
          <h2 style={{ color: "#ffffff", fontSize: 28, fontWeight: 800, margin: "0 0 8px", position: "relative" }}>
            Neden <span style={{ color: "#f5c518" }}>Bahri Budak?</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 15, margin: "0 0 32px", position: "relative" }}>Deneyim, birikim ve güven.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, position: "relative" }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ fontSize: 24 }}>{r.icon}</span>
                <span style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500, lineHeight: 1.4 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 16, color: "#64748b", marginBottom: 24 }}>
            Projenizi konuşmak için hemen iletişime geçin.
          </p>
          <a
            href="mailto:bahribudak@gmail.com?subject=Hizmet Talebi"
            style={{
              display: "inline-block",
              background: "#f5c518",
              color: "#0f1a3a",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              padding: "16px 48px",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(245,197,24,0.4)",
            }}
          >
            Teklif Al →
          </a>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 16 }}>
            bahribudak@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

const services = [
  {
    id: 1,
    icon: "🏭",
    title: "Danışmanlık",
    subtitle: "Fabrika Yönetimi & Lean Üretim",
    description:
      "Tekstil fabrikalarında üretim verimliliği, süreç iyileştirme ve lean yönetim konularında birebir danışmanlık hizmeti sunuyorum.",
    price: "5.000 TL / ay",
    note: "İlk görüşme ücretsiz",
    details: ["Ayda 2-4 saha ziyareti", "Online destek dahil", "Haftalık ilerleme raporu"],
    highlight: true,
  },
  {
    id: 2,
    icon: "✍️",
    title: "İçerik Üretimi & Sosyal Medya",
    subtitle: "LinkedIn & Instagram",
    description:
      "Markanızı büyütmek için haftalık içerik takvimi, özgün yazılar ve görsel tasarımlarla sosyal medya yönetimi yapıyorum.",
    price: "2.000 – 3.500 TL / ay",
    note: null,
    details: ["LinkedIn + Instagram", "Haftalık içerik takvimi", "Görsel tasarım dahil"],
    highlight: false,
  },
  {
    id: 3,
    icon: "🎨",
    title: "Adobe Tasarım Hizmetleri",
    subtitle: "Profesyonel Grafik Tasarım",
    description:
      "Adobe Creative Suite ile profesyonel tasarım çözümleri. Her proje için özgün ve kurumsal kimliğinize uygun tasarımlar.",
    price: null,
    note: null,
    details: null,
    highlight: false,
    subServices: [
      { name: "Poster", price: "500 – 800 TL" },
      { name: "Afiş", price: "500 – 800 TL" },
      { name: "Logo", price: "1.000 – 2.000 TL" },
      { name: "El İlanı", price: "300 – 500 TL" },
      { name: "Broşür", price: "600 – 1.000 TL" },
      { name: "Katalog (8-16 sayfa)", price: "1.500 – 2.500 TL" },
      { name: "Dergi (12-24 sayfa)", price: "2.500 – 4.000 TL" },
    ],
  },
  {
    id: 4,
    icon: "📝",
    title: "Blog Yazarlığı",
    subtitle: "Tekstil · Felsefe · Kişisel Gelişim · Kurumsal",
    description:
      "SEO uyumlu, özgün ve derinlikli blog yazıları. Sektörel bilgi ile felsefi derinliği bir araya getiren içerikler.",
    price: null,
    note: null,
    details: null,
    highlight: false,
    subServices: [
      { name: "Kısa makale (500-800 kelime)", price: "300 – 500 TL" },
      { name: "Orta makale (800-1.500 kelime)", price: "500 – 900 TL" },
      { name: "Uzun makale (1.500+ kelime)", price: "900 – 1.500 TL" },
    ],
  },
];

const reasons = [
  { icon: "🏭", text: "Yılların fabrika yönetimi deneyimi" },
  { icon: "📚", text: "Felsefe ve kişisel gelişim birikimi" },
  { icon: "🇹🇷", text: "Türkiye tekstil sektörüne hakimiyet" },
  { icon: "🎯", text: "Sonuç odaklı, pratik çözümler" },
];

export default function HizmetlerPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div style={{ background: "#0f1a3a", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(245,197,24,0.06)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(245,197,24,0.04)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(245,197,24,0.15)", border: "1px solid rgba(245,197,24,0.3)", borderRadius: 100, padding: "6px 20px", marginBottom: 24 }}>
            <span style={{ color: "#f5c518", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Hizmetler</span>
          </div>
          <h1 style={{ color: "#ffffff", fontSize: 42, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
            Birlikte <span style={{ color: "#f5c518" }}>büyüyelim</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Tekstil, tasarım, içerik ve danışmanlık alanlarında profesyonel destek sunuyorum.
          </p>
        </div>
      </div>

      {/* Services */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {services.map((s) => (
            <div
              key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                border: `2px solid ${hovered === s.id ? "#f5c518" : s.highlight ? "#1a3a5c" : "#e2e8f0"}`,
                overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: hovered === s.id ? "0 8px 32px rgba(26,58,92,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "28px 28px 20px" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.highlight ? "#0f1a3a" : "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#1a3a5c" }}>{s.title}</h2>
                      <p style={{ margin: 0, fontSize: 13, color: "#64748b", fontWeight: 500 }}>{s.subtitle}</p>
                    </div>
                    {s.price && (
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#1a3a5c" }}>{s.price}</div>
                        {s.note && (
                          <div style={{ display: "inline-block", background: "#fef9e7", border: "1px solid #f5c518", borderRadius: 100, padding: "3px 12px", marginTop: 6 }}>
                            <span style={{ fontSize: 11, color: "#92660a", fontWeight: 600 }}>✨ {s.note}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "#f1f5f9", margin: "0 28px" }} />

              {/* Card Body */}
              <div style={{ padding: "20px 28px 28px" }}>
                <p style={{ margin: "0 0 20px", fontSize: 15, color: "#475569", lineHeight: 1.7 }}>{s.description}</p>

                {s.details && (
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {s.details.map((d, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "#f0f4f8", borderRadius: 8, padding: "6px 14px" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5c518" }} />
                        <span style={{ fontSize: 13, color: "#1a3a5c", fontWeight: 500 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                )}

                {s.subServices && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                    {s.subServices.map((sub, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", borderRadius: 10, padding: "12px 16px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{sub.name}</span>
                        <span style={{ fontSize: 14, color: "#1a3a5c", fontWeight: 700, whiteSpace: "nowrap", marginLeft: 12 }}>{sub.price} TL</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Neden Bahri Budak */}
        <div style={{ marginTop: 60, background: "#0f1a3a", borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(245,197,24,0.08)" }} />
          <h2 style={{ color: "#ffffff", fontSize: 28, fontWeight: 800, margin: "0 0 8px", position: "relative" }}>
            Neden <span style={{ color: "#f5c518" }}>Bahri Budak?</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 15, margin: "0 0 32px", position: "relative" }}>Deneyim, birikim ve güven.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, position: "relative" }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ fontSize: 24 }}>{r.icon}</span>
                <span style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500, lineHeight: 1.4 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 16, color: "#64748b", marginBottom: 24 }}>
            Projenizi konuşmak için hemen iletişime geçin.
          </p>
          <a
            href="mailto:bahribudak@gmail.com?subject=Hizmet Talebi"
            style={{
              display: "inline-block",
              background: "#f5c518",
              color: "#0f1a3a",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              padding: "16px 48px",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(245,197,24,0.4)",
              transition: "transform 0.2s",
            }}
          >
            Teklif Al →
          </a>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 16 }}>
            bahribudak@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
