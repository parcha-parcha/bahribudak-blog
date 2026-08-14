'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

type VerifiedFactor = {
  id: string
  friendly_name?: string | null
  status?: string
}

export default function AdminMfaSetup() {
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)
  const [factor, setFactor] = useState<VerifiedFactor | null>(null)
  const [enrollment, setEnrollment] = useState<{
    id: string
    qrCode: string
    secret: string
  } | null>(null)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function refreshStatus() {
    const supabase = createClient()
    const [{ data: aal }, { data: factors }] = await Promise.all([
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
      supabase.auth.mfa.listFactors(),
    ])

    setCurrentLevel(aal?.currentLevel ?? null)
    const verified = factors?.totp?.find(item => item.status === 'verified') ?? null
    setFactor(verified)
  }

  useEffect(() => {
    void refreshStatus()
  }, [])

  async function startEnrollment() {
    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'BB-ADM-01',
      })

      if (error || !data?.totp) {
        setMessage('MFA kurulumu başlatılamadı.')
        return
      }

      setEnrollment({
        id: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
      })
    } finally {
      setLoading(false)
    }
  }

  async function verifyFactor() {
    const factorId = enrollment?.id ?? factor?.id
    if (!factorId || !/^\d{6}$/.test(code.trim())) {
      setMessage('6 haneli doğrulama kodunu girin.')
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: code.trim(),
      })

      if (error) {
        setMessage('Kod doğrulanamadı. Yeni kodla tekrar deneyin.')
        return
      }

      setEnrollment(null)
      setCode('')
      setMessage('BB-ADM-01 MFA doğrulaması tamamlandı.')
      await refreshStatus()
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-[14px] border border-[#E5E2DA] bg-white p-6 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
        BB-ADM-01
      </p>
      <h1 className="mt-3 text-3xl font-black text-[#111315]">
        Süper Yönetici Güvenliği
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6F7782]">
        Yönetici erişimi normal üyelikten ayrıdır. Süper yönetici oturumunda TOTP tabanlı ikinci faktör kullanılır.
      </p>

      <div className="mt-6 rounded-md bg-[#F6F4EF] p-4 text-sm text-[#111315]">
        Oturum güvence seviyesi: <strong>{currentLevel ?? 'kontrol ediliyor'}</strong>
      </div>

      {currentLevel === 'aal2' ? (
        <p className="mt-5 font-bold text-[#111315]">MFA aktif ve bu oturum doğrulanmış.</p>
      ) : factor ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-[#6F7782]">
            Kayıtlı doğrulayıcı bulundu. Authenticator uygulamanızdaki 6 haneli kodu girin.
          </p>
          <MfaCodeInput code={code} setCode={setCode} />
          <button type="button" onClick={verifyFactor} disabled={loading} className="rounded-md bg-[#111315] px-5 py-3 text-sm font-black text-white disabled:opacity-60">
            {loading ? 'Doğrulanıyor…' : 'MFA ile Doğrula'}
          </button>
        </div>
      ) : enrollment ? (
        <div className="mt-6 space-y-5">
          <p className="text-sm leading-7 text-[#6F7782]">
            QR kodunu Google Authenticator, Microsoft Authenticator, 1Password veya uyumlu bir TOTP uygulamasıyla tarayın.
          </p>
          <img src={enrollment.qrCode} alt="BB-ADM-01 MFA QR kodu" className="h-52 w-52 border border-[#E5E2DA] bg-white p-2" />
          <p className="break-all rounded-md bg-[#F6F4EF] p-3 text-xs text-[#111315]">
            Manuel anahtar: {enrollment.secret}
          </p>
          <MfaCodeInput code={code} setCode={setCode} />
          <button type="button" onClick={verifyFactor} disabled={loading} className="rounded-md bg-[#111315] px-5 py-3 text-sm font-black text-white disabled:opacity-60">
            {loading ? 'Doğrulanıyor…' : 'Kurulumu Doğrula'}
          </button>
        </div>
      ) : (
        <button type="button" onClick={startEnrollment} disabled={loading} className="mt-6 rounded-md bg-[#E45A2B] px-5 py-3 text-sm font-black text-[#111315] disabled:opacity-60">
          {loading ? 'Hazırlanıyor…' : 'MFA Kurulumunu Başlat'}
        </button>
      )}

      {message ? <p className="mt-5 text-sm font-bold text-[#111315]">{message}</p> : null}
    </section>
  )
}

function MfaCodeInput({ code, setCode }: { code: string; setCode: (value: string) => void }) {
  return (
    <input
      value={code}
      onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
      inputMode="numeric"
      autoComplete="one-time-code"
      placeholder="000000"
      aria-label="6 haneli MFA kodu"
      className="w-full max-w-xs rounded-md border border-[#D9D5CC] bg-white px-4 py-3 text-lg font-bold tracking-[0.25em] text-[#111315] outline-none focus:border-[#E45A2B]"
    />
  )
}
