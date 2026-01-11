import { defineCollection, defineConfig } from '@content-collections/core'
import { categoriesKeys } from '~/lib/store'

// Utility function to extract headings from MDX content
// This should match the createSlug function used in solid-mdx.tsx
const createSlug = (text: string): string => {
  return text.toString().toLowerCase().replace(/\s+/g, '-')
}

// Import APP values for JSX expression evaluation
// Hardcoded to avoid build-time import issues
const APP_REPLACEMENTS = {
  LONG_NAME: 'Fintech Academy',
  SHORT_NAME: 'fintech-academy',
  DESCRIPTION: '',
  GITHUB_URL: 'https://github.com/Walidoux/fintech-academy.git',
  HOME_PAGE: 'https://walidoux.github.io/fintech-academy',
}

// Simple JSX expression evaluator for APP properties
const evaluateJSXExpressions = (text: string): string => {
  let result = text

  // Iterate over all APP replacement patterns
  for (const [key, value] of Object.entries(APP_REPLACEMENTS)) {
    const pattern = `{APP.${key}}`
    while (result.includes(pattern)) {
      result = result.replace(pattern, value)
    }
  }

  return result
}

const extractHeadings = (content: string) => {
  const headings: { depth: number; slug: string; text: string }[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) {
      continue
    }

    // Match markdown headings: # Heading, ## Subheading, etc.
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const depth = match[1].length
      const rawText = match[2].trim()
      // Evaluate JSX expressions to match runtime behavior
      const evaluatedText = evaluateJSXExpressions(rawText)
      // Use the same slug generation as the MDX rendering
      const slug = createSlug(evaluatedText)
      headings.push({ depth, slug, text: evaluatedText })
    }
  }

  return headings
}

const pages = defineCollection({
  name: 'pages',
  directory: 'src/docs',
  include: '{nestle,dooc,manar-conseil}/**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    disabled: z.boolean().optional(),
    headings: z
      .array(
        z.object({
          depth: z.number(),
          slug: z.string(),
          text: z.string(),
        })
      )
      .default([]),
  }),
  transform: (document, context) => {
    // Access the content from the document or context
    const content =
      (document as any).content ||
      (context as any).content ||
      (context as any)._raw?.content ||
      (document as any)._raw?.content ||
      ''

    const headings = extractHeadings(content)

    return {
      ...document,
      headings,
    }
  },
})

const docs = defineCollection({
  name: 'docs',
  directory: 'src/docs',
  include: '*.mdx',
  exclude: '*/**',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    category: z.enum(categoriesKeys).optional(),
    disabled: z.boolean().optional(),
    headings: z
      .array(
        z.object({
          depth: z.number(),
          slug: z.string(),
          text: z.string(),
        })
      )
      .default([]),
  }),
  transform: (document, context) => {
    // Access the content from the document or context
    const content =
      (document as any).content ||
      (context as any).content ||
      (context as any)._raw?.content ||
      (document as any)._raw?.content ||
      ''

    const headings = extractHeadings(content)

    return {
      ...document,
      headings,
    }
  },
})

export default defineConfig({
  collections: [pages, docs],
})
