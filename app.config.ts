import contentCollections from '@content-collections/solid-start'
import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'
import pkg from '@vinxi/plugin-mdx'
import remarkMath from 'remark-math'
import tsconfigPaths from 'vite-tsconfig-paths'

const { default: mdx } = pkg

import rehypekatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'

export default defineConfig({
  extensions: ['mdx'],
  vite: {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      contentCollections(),
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: '~/tools/solid-mdx',
        remarkPlugins: [remarkFrontmatter, remarkMath],
        rehypePlugins: [rehypekatex],
      }),
    ],
  },
  server: {
    prerender: {
      crawlLinks: true,
    },
    // see https://github.com/solidjs/solid-start/issues/1614
    esbuild: { options: { target: 'esnext' } },
  },
})
