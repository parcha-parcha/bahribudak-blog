'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const fullName = String(formData.get('full_name') ?? '').trim().slice(0, 120)
  const companyName = String(formData.get('company_name') ?? '').trim().slice(0, 160)
  const lang = formData.get('lang') === 'en' ? 'en' : 'tr'
  if (!fullName) return { ok: false }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false }

  const { error } = await supabase.from('profiles').update({
    full_name: fullName,
    company_name: companyName || null,
  }).eq('id', user.id)
  if (error) return { ok: false }
  revalidatePath(`/${lang}/${lang === 'tr' ? 'hesabim' : 'account'}`)
  return { ok: true }
}
