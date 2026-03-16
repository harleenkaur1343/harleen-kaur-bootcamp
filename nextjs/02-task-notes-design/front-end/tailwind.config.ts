import type { Config } from 'tailwindcss'

const config: Config = {
  // tells Tailwind WHERE to look for class names
  // only generates CSS for classes actually used → smaller bundle
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],

  // extend default Tailwind theme
  theme: {
    extend: {
      // add custom colors
      colors: {
        brand: '#3b82f6',
      },
      // add custom fonts
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
      // add custom spacing
      spacing: {
        '128': '32rem',
      }
    },
  },

  // add Tailwind plugins
  plugins: [],
}

export default config