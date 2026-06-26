import type { Config } from 'tailwindcss'

// BB_REVIZYON_2_MARKER: kurumsal kimlik tasarım paketi
const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B2343', light: '#12365E', dark: '#061A33' },
        accent: { blue: '#2EA6D9', pale: '#EAF6FC' },
        yellow: { bb: '#2EA6D9', light: '#5BBBE6', pale: '#EAF6FC' },
        gray: { soft: '#F5F7FA', mid: '#EAF6FC', text: '#4C5561', border: '#D8DDE5', silver: '#A9ABAE' },
        surface: { dark: '#061A33', 'dark-2': '#0B2343' },
      },
      fontFamily: { heading: ['Poppins', 'Arial', 'sans-serif'], body: ['Poppins', 'Arial', 'sans-serif'], poppins: ['Poppins', 'Arial', 'sans-serif'] },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'headline': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'subhead': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: { '18': '4.5rem', '22': '5.5rem' },
      boxShadow: { 'card': '0 2px 20px rgba(11, 35, 67, 0.08)', 'card-hover': '0 8px 40px rgba(11, 35, 67, 0.16)' },
      borderRadius: { 'xl2': '1rem' },
    },
  },
  plugins: [],
}
export default config
