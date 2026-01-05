import { useLocation } from '@solidjs/router'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import type { Component } from 'solid-js'
import { createResource, Show } from 'solid-js'
import { SolidMarkdown } from 'solid-markdown'
import pkg from '~/../package.json'
import { Typography as CustomTypography } from './custom-typography'
import { Typography as BaseTypography } from './base-typography'

const BASE_REGEX = new RegExp(`^/?${pkg.name}/?`)
const DOCS_REGEX = /^\/?docs\/?/

const docsModules = import.meta.glob('../../docs/**/*.{md,mdx}', {
  as: 'raw',
  eager: false,
})

const Docs: Component = () => {
  const location = useLocation()

  const path = () =>
    location.pathname.replace(BASE_REGEX, '').replace(DOCS_REGEX, '') || ''

  const loadContent = async (docPath: string) => {
    if (!docPath) {
      return ''
    }

    try {
      const modulePath = (ext: string) => `../../docs/${docPath}.${ext}`
      let module =
        docsModules[modulePath('mdx')] || docsModules[modulePath('md')]

      if (!module) {
        const searchPath = `/${docPath}.mdx`
        const foundKey = Object.keys(docsModules).find((key) =>
          key.endsWith(searchPath)
        )
        if (foundKey) {
          module = docsModules[foundKey]
        } else {
          const searchPathMd = `/${docPath}.md`
          const foundKeyMd = Object.keys(docsModules).find((key) =>
            key.endsWith(searchPathMd)
          )
          if (foundKeyMd) {
            module = docsModules[foundKeyMd]
          }
        }
      }

      if (module) {
        const content = await module()
        return content
      }
      return `# Error\n\nDocument not found: ${docPath}`
    } catch (error) {
      console.error(`Failed to load ${docPath}:`, error)
      return `# Error\n\nCould not load documentation for ${docPath}.`
    }
  }

  const [markdownContent] = createResource(path, loadContent)

  return (
    <div class='mx-auto max-w-3xl p-8'>
      <Show fallback={<div>Loading...</div>} when={!markdownContent.loading}>
        <SolidMarkdown
          children={markdownContent() || ''}
          components={{ ...BaseTypography, ...CustomTypography }}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          remarkPlugins={[remarkMath]}
          renderingStrategy='reconcile'
        />
      </Show>
    </div>
  )
}

export default Docs
