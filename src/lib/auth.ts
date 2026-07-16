import type { Lang } from './i18n'

export function authPath(lang: Lang, page: 'login' | 'register' | 'account') {
  const routes = {
    tr: { login: 'giris', register: 'kayit', account: 'hesabim' },
    en: { login: 'login', register: 'register', account: 'account' },
  } as const
  return `/${lang}/${routes[lang][page]}`
}

export function safeInternalPath(value: string | null, fallback = '/tr') {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return fallback
  try {
    const parsed = new URL(value, 'https://local.invalid')
    return parsed.origin === 'https://local.invalid'
      ? `${parsed.pathname}${parsed.search}${parsed.hash}`
      : fallback
  } catch {
    return fallback
  }
}
