
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: 'rgba(var(--primary-rgba),<alpha-value>)',
          light: 'rgba(var(--secondary-rgba),<alpha-value>)',
          blue: 'rgba(var(--text-blue-rgb),<alpha-value>)',
          danger: 'rgba(var(--danger-rgb),<alpha-value>)',
          success: 'rgba(var(--success-rgb),<alpha-value>)',
        }
      },
      gridTemplateColumns: {
        '1fr,2fr': '1fr 2fr'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        calligraphic: ['var(--font-irishGrove)']
      },

    },
  },
  plugins: [],
}
export default config
