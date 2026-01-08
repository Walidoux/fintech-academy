import contentCollections from '@content-collections/solid-start'
import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'
// @ts-expect-error plugin does not export dts
import pkg from '@vinxi/plugin-mdx'
import remarkMath from 'remark-math'
import tsconfigPaths from 'vite-tsconfig-paths'

const { default: mdx } = pkg

import mdxMermaid from 'mdx-mermaid'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxEnhanced from 'remark-mdx-math-enhanced'
import { APP_NAME } from './src/lib/store'

export default defineConfig({
  ssr: true,
  extensions: ['mdx'],
  vite: {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      contentCollections(),
      mdx.withImports({})({
        jsxImportSource: 'solid-jsx',
        providerImportSource: '~/tools/solid-mdx',
        remarkPlugins: [
          remarkFrontmatter,
          remarkMath,
          [remarkMdxEnhanced, { component: 'Math' }],
          [mdxMermaid, { output: 'svg' }],
        ],
        rehypePlugins: [rehypeKatex],
      }),
    ],
  },
  server: {
    baseURL: `/${APP_NAME.SHORT}/`,
    preset: 'github-pages',
    static: true,
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: true,
    },
    // see https://github.com/solidjs/solid-start/issues/1614
    esbuild: { options: { target: 'esnext' } },
  },
})
