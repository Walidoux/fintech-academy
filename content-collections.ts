import { defineCollection, defineConfig } from '@content-collections/core'

export const categories = ['calculs', 'generalites'] as const

const pages = defineCollection({
  name: 'pages',
  directory: 'src/content/pages',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
  }),
})

const docs = defineCollection({
  name: 'docs',
  directory: 'src/content/docs',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    category: z.enum(categories),
  }),
})

export default defineConfig({
  collections: [pages, docs],
})
