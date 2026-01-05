import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import htmlMinifier from 'vite-plugin-html-minifier'
import solidPlugin from 'vite-plugin-solid'
import pkg from './package.json'

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss(), htmlMinifier({ minify: true })],
  base: `/${pkg.name}/`,
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['debug', 'extend'],
  },
  resolve: {
    alias: {
      '~': resolve(import.meta.dirname, './src'),
    },
  },
})
