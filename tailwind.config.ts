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
        brand: {
          graphite: '#111315',
          warm: '#F6F4EF',
          slate: '#6F7782',
          orange: '#E45A2B',
          soft: '#E5E2DA',
        },
        navy: {
          DEFAULT: '#111315',
          light: '#1A1F24',
          dark: '#090B0D',
        },
        accent: {
          blue: '#E45A2B',
          pale: '#F8E4DC',
        },
        yellow: {
          bb: '#E45A2B',
          light: '#E45A2B',
          pale: '#F8E4DC',
        },
        gray: {
          soft: '#F6F4EF',
          mid: '#E5E2DA',
          text: '#6F7782',
          border: '#D8D5CD',
          silver: '#A9ABAE',
        },
        surface: {
          dark: '#111315',
          'dark-2': '#1A1F24',
        },
      },
      fontFamily: {
        heading: ['Acumin Pro', 'Inter', 'Arial', 'sans-serif'],
        body: ['Acumin Pro', 'Inter', 'Arial', 'sans-serif'],
        technical: ['IBM Plex Mono', 'Consolas', 'monospace'],
        poppins: ['Acumin Pro', 'Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'headline': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'subhead': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: { '18': '4.5rem', '22': '5.5rem' },
      boxShadow: {
        'card': '0 2px 20px rgba(17, 19, 21, 0.08)',
        'card-hover': '0 8px 40px rgba(17, 19, 21, 0.16)',
      },
      borderRadius: { 'xl2': '1rem' },
    },
  },
  plugins: [],
}
export default config
