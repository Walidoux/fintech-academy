import { useLocation } from '@solidjs/router'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import type { Component } from 'solid-js'
import { createResource, Show } from 'solid-js'
import { SolidMarkdown } from 'solid-markdown'
import { Typography as CustomTypography } from '../design/custom-typography'
import { Typography as BaseTypography } from './base-typography'

// Pre-import all docs using Vite's import.meta.glob
const docsModules = import.meta.glob('../../docs/**/*.{md,mdx}', {
  as: 'raw',
  eager: false,
})

const Docs: Component = () => {
  const location = useLocation()

  const path = () => location.pathname.replace('/docs/', '') || ''

  const loadContent = async (docPath: string) => {
    if (!docPath) {
      return ''
    }
    try {
      // Try .mdx first, then .md
      let modulePath = `../../docs/${docPath}.mdx`
      let module = docsModules[modulePath]
      if (!module) {
        modulePath = `../../docs/${docPath}.md`
        module = docsModules[modulePath]
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
    <div class='max-w-3xl p-8'>
      <Show fallback={<div>Loading...</div>} when={!markdownContent.loading}>
        <SolidMarkdown
          children={markdownContent() || ''}
          components={{ ...BaseTypography, ...CustomTypography }}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
        />
      </Show>
    </div>
  )
}

export default Docs
