import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  plugins: [tailwindcssAnimate],
  content: [
    "./src/**/*.{ts,tsx,css}",
    "./docs/**/*.{mdx,md}"
  ],
} satisfies Config
