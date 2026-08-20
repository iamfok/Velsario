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
        'v-black': '#0A0A0A',
        'v-white': '#FAFAFA',
        'v-gray': '#888888',
        'v-light': '#F0F0F0',
        'v-border': '#E0E0E0',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest2': '0.2em',
        'widest3': '0.3em',
      }
    },
  },
  plugins: [],
}
export default config
