import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  base: '/financial-analysis/',
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
