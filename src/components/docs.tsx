import { useLocation } from '@solidjs/router'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import type { Component } from 'solid-js'
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from 'solid-js'
import { SolidMarkdown } from 'solid-markdown'
import { cn } from '~/lib/utils'
import pkg from '../../package.json'
import { Typography as BaseTypography } from './base-typography'
import { Typography as CustomTypography } from './custom-typography'
import { Resizable, ResizableHandle, ResizablePanel } from './ui/resizable'
import { Spinner } from './ui/spinner'

const BASE_REGEX = new RegExp(`^/?${pkg.name}/?`)
const DOCS_REGEX = /^\/?docs\/?/

const docsModules = import.meta.glob('../../docs/**/*.{md,mdx}', {
  as: 'raw',
  eager: false,
})

const Docs: Component = () => {
  const location = useLocation()
  const [windowHeight, setWindowHeight] = createSignal(window.innerHeight)

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
  let hiddenContainerRef: HTMLDivElement | undefined
  const [totalHeight, setTotalHeight] = createSignal(0)
  const [shouldSplit, setShouldSplit] = createSignal(false)
  const PADDING = 32 // p-8 padding (4 * 8)

  // Calculate approximate height per paragraph
  const calcApproxHeightPerParagraph = (size: number) => {
    const avgParagraphHeight = totalHeight() / size
    const availableHeight = windowHeight() - PADDING
    const targetHeight = availableHeight / window.devicePixelRatio

    return { targetHeight, avgParagraphHeight }
  }

  function distributeParagraphs(
    paragraphs: string[],
    targetHeight: number,
    avgParagraphHeight: number
  ): [string, string, string] {
    // Split into three parts based on target height, checking if half of the node is overflowing
    const part1: string[] = []
    const part2: string[] = []
    const part3: string[] = []
    let currentHeight = 0
    let currentPart = 1

    for (const paragraph of paragraphs) {
      const paragraphHeight = avgParagraphHeight

      if (
        currentPart === 1 &&
        currentHeight + paragraphHeight / 2 > targetHeight
      ) {
        currentPart = 2
        currentHeight = 0
      } else if (
        currentPart === 2 &&
        currentHeight + paragraphHeight / 2 > targetHeight
      ) {
        currentPart = 3
        currentHeight = 0
      }

      if (currentPart === 1) {
        part1.push(paragraph)
      } else if (currentPart === 2) {
        part2.push(paragraph)
      } else {
        part3.push(paragraph)
      }

      currentHeight += paragraphHeight
    }

    return [part1.join('\n\n'), part2.join('\n\n'), part3.join('\n\n')]
  }

  function splitMarkdownByHeight(content: string): [string, string, string] {
    if (!content) {
      return ['', '', '']
    }

    const paragraphs: string[] = []
    let currentParagraph = ''

    // Parse markdown to get structure and group into paragraphs
    for (const line of content.split('\n')) {
      if (line.trim() === '' && currentParagraph.trim() !== '') {
        paragraphs.push(currentParagraph)
        currentParagraph = ''
      } else {
        currentParagraph += `${line}\n`
      }
    }
    if (currentParagraph.trim() !== '') {
      paragraphs.push(currentParagraph)
    }

    const { targetHeight, avgParagraphHeight } = calcApproxHeightPerParagraph(
      paragraphs.length
    )

    return distributeParagraphs(paragraphs, targetHeight, avgParagraphHeight)
  }

  const renderMarkdown = (content: string) => (
    <SolidMarkdown
      children={content}
      components={{ ...BaseTypography, ...CustomTypography }}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkMath]}
      renderingStrategy='reconcile'
    />
  )

  const contentParts = createMemo(() => {
    if (markdownContent() && shouldSplit()) {
      return splitMarkdownByHeight(markdownContent() || '')
    }
    return [markdownContent() || '', '', '']
  })

  const filteredParts = createMemo(() => contentParts().filter((p) => p))

  onMount(() => {
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    onCleanup(() => window.removeEventListener('resize', handleResize))
  })

  createEffect(() => {
    if (hiddenContainerRef && markdownContent() && !markdownContent.loading) {
      requestAnimationFrame(() => {
        // Split if content is taller than 60% of viewport
        const height = hiddenContainerRef.scrollHeight
        setTotalHeight(height)
        setShouldSplit(height > windowHeight() * 0.6)
      })
    }
  })

  return (
    <>
      {/* measurement container */}
      <div
        class='invisible absolute overflow-hidden'
        ref={hiddenContainerRef}
        style={{
          width: `calc(min(100vw - ${PADDING}px, 672px))`, // equivalent to max-w-3xl + padding
          top: '-9999px',
        }}>
        <Show when={!markdownContent.loading && markdownContent()}>
          {renderMarkdown(markdownContent() || '')}
        </Show>
      </div>

      <Show
        fallback={
          <main class='grid h-screen max-w-screen place-items-center'>
            <Spinner />
          </main>
        }
        when={!markdownContent.loading}>
        <Show
          fallback={
            <article class='mx-auto max-w-3xl p-8'>
              {renderMarkdown(markdownContent() || '')}
            </article>
          }
          when={shouldSplit()}>
          <Resizable class='mx-auto h-full' orientation='horizontal'>
            <For each={filteredParts()}>
              {(part, index) => (
                <>
                  <ResizablePanel>
                    <article
                      class={cn('flex h-full min-h-0 flex-1 overflow-y-auto', {
                        'border-foreground/25 border-l': index() > 0,
                      })}
                      style={{ padding: `${PADDING}px` }}>
                      {renderMarkdown(part)}
                    </article>
                  </ResizablePanel>
                  <Show when={index() < filteredParts().length - 1}>
                    <ResizableHandle withHandle />
                  </Show>
                </>
              )}
            </For>
          </Resizable>
        </Show>
      </Show>
    </>
  )
}

export default Docs
