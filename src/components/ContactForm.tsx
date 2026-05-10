'use client'

import { useState } from 'react'

interface ContactFormProps {
  lang: string
}

export default function ContactForm({ lang }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xkoypknn', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const tr = lang === 'tr'

  return (
    <div className="mt-12">
      <div className="mb-8">
        <p className="section-label mb-2">{tr ? 'Mesaj Bırakın' : 'Leave a Message'}</p>
        <h2 className="text-2xl font-bold text-navy">
          {tr ? 'Size en kısa sürede dönüş yapacağım.' : "I'll get back to you as soon as possible."}
        </h2>
        <div className="w-8 h-1 bg-yellow-bb mt-3" />
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <p className="font-bold text-navy text-lg mb-2">
            {tr ? 'Mesajınız iletildi!' : 'Your message has been sent!'}
          </p>
          <p className="text-gray-text text-sm">
            {tr ? 'En kısa sürede size dönüş yapacağım.' : "I'll get back to you shortly."}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-sm font-bold text-navy underline underline-offset-4"
          >
            {tr ? 'Yeni mesaj gönder' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-text mb-2">
                {tr ? 'Adınız' : 'Name'} *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder={tr ? 'Adınız Soyadınız' : 'Your Name'}
                className="w-full px-4 py-3 border border-gray-border rounded-xl text-navy placeholder:text-gray-text/50 focus:outline-none focus:border-navy transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-text mb-2">
                {tr ? 'E-posta' : 'Email'} *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder={tr ? 'ornek@email.com' : 'example@email.com'}
                className="w-full px-4 py-3 border border-gray-border rounded-xl text-navy placeholder:text-gray-text/50 focus:outline-none focus:border-navy transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-text mb-2">
              {tr ? 'Konu' : 'Subject'} *
            </label>
            <input
              type="text"
              name="subject"
              required
              placeholder={tr ? 'Mesajınızın konusu' : 'Message subject'}
              className="w-full px-4 py-3 border border-gray-border rounded-xl text-navy placeholder:text-gray-text/50 focus:outline-none focus:border-navy transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-text mb-2">
              {tr ? 'Mesajınız' : 'Message'} *
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder={tr ? 'Mesajınızı buraya yazın...' : 'Write your message here...'}
              className="w-full px-4 py-3 border border-gray-border rounded-xl text-navy placeholder:text-gray-text/50 focus:outline-none focus:border-navy transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm">
              {tr ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.'}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {status === 'loading'
              ? (tr ? 'Gönderiliyor...' : 'Sending...')
              : (tr ? 'Mesajı Gönder' : 'Send Message')}
            {status !== 'loading' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            )}
          </button>

        </form>
      )}
    </div>
  )
}
