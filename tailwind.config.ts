import type { Config } from 'tailwindcss'

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
        // BB Design System
        navy: {
          DEFAULT: '#0f1a3a',
          light: '#1a2d5a',
          dark: '#080f22',
        },
        yellow: {
          bb: '#f5c518',
          light: '#fdd835',
          pale: '#fffbea',
        },
        gray: {
          soft: '#f8fafc',
          mid: '#f0f4f8',
          text: '#64748b',
          border: '#e8edf3',
        },
        // Dark mode yüzeyleri
        surface: {
          dark: '#0b1530',      // ana koyu zemin
          'dark-2': '#14264a',  // kart / yükseltilmiş yüzey
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'headline': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'subhead': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(15, 26, 58, 0.08)',
        'card-hover': '0 8px 40px rgba(15, 26, 58, 0.16)',
      },
      borderRadius: {
        'xl2': '1rem',
      },
    },
  },
  plugins: [],
}
export default config
