import { A } from '@solidjs/router'
import { allDocs, allPages } from 'content-collections'
import {
  type Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Show,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { DocsLayout } from '~/components/docs-layout'
import { SEO } from '~/components/metadata'

import { Card, CardContent } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import NotFound from '~/routes/[...404]'

export default function DocsPage(props: {
  params: { path: string[] | string }
}) {
  const [MDXComp, setMDXComp] = createSignal<Component>()
  const [isLoading, setIsLoading] = createSignal(true)
  const [_headings, _setHeadings] = createSignal<
    { depth: number; slug: string; text: string }[]
  >([])

  let _main!: HTMLElement

  const path = () => {
    if (Array.isArray(props.params.path)) {
      return props.params.path
    }
    if (props.params.path) {
      return [props.params.path]
    }
    return []
  }

  const isRootDoc = () => path().length === 1

  const fullPath = createMemo(() => path().join('/'))

  const currentDoc = createMemo(() => {
    return allDocs.find((doc) => doc._meta.path === fullPath())
  })

  const currentPage = createMemo(() => {
    return allPages.find((page) => page._meta.path === fullPath())
  })

  const currentDocument = createMemo(() => {
    // First try exact match
    const exact = currentDoc() || currentPage()
    if (exact) {
      return exact
    }

    // If not found and single path segment, check for index page
    if (path().length === 1) {
      return allPages.find((page) => page._meta.path === `${fullPath()}/index`)
    }
    return null
  })

  const canonicalUrl = createMemo(() => {
    const baseUrl = 'https://walidoux.github.io'
    return `${baseUrl}/fintech-academy/docs/${fullPath()}`
  })

  const subPages = () =>
    allPages
      .filter(
        (page) =>
          page._meta.path.startsWith(`${path()[0]}/`) &&
          page._meta.path !== `${path()[0]}/index` &&
          !page.disabled
      )
      .map((page) => ({
        slug: page._meta.path.split('/')[1],
        title: page.title,
      }))
      .sort((a, b) => a.title.localeCompare(b.title))

  createEffect(() => {
    const currentPath = path()
    const fullPath = currentPath.join('/')
    const doc = currentDocument()
    setIsLoading(true)
    if (doc?.disabled) {
      setMDXComp(() => NotFound)
      setIsLoading(false)
      return
    }
    import(`~/docs/${fullPath}.mdx`)
      .then((mod) => {
        setMDXComp(() => mod.default)
        setIsLoading(false)
      })
      .catch(() => {
        if (currentPath.length === 1) {
          import(`~/docs/${fullPath}/index.mdx`)
            .then((mod) => {
              setMDXComp(() => mod.default)
              setIsLoading(false)
            })
            .catch(() => {
              setMDXComp(() => NotFound)
              setIsLoading(false)
            })
        } else {
          setMDXComp(() => NotFound)
          setIsLoading(false)
        }
      })
  })

  const docMetadata = createMemo(() => {
    const doc = currentDoc()
    if (!doc) {
      return null
    }

    return {
      title: doc.title,
      description: doc.description,
      keywords: ['fintech', 'finance', 'documentation', doc.category].filter(
        (k): k is string => Boolean(k)
      ),
    }
  })

  const renderMetadata = () => {
    const metadata = docMetadata()
    if (!metadata) {
      return null
    }

    return (
      <SEO
        canonicalUrl={canonicalUrl()}
        description={metadata.description}
        ogType='article'
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: metadata.title,
          description: metadata.description,
          url: canonicalUrl(),
          publisher: {
            '@type': 'Organization',
            name: 'Fintech Academy',
            url: 'https://walidoux.github.io/fintech-academy',
          },
          author: {
            '@type': 'Person',
            name: 'Walid Korchi',
          },
        }}
        title={metadata.title}
      />
    )
  }

  return (
    <>
      {renderMetadata()}
      <DocsLayout>
        <Show
          fallback={
            <div class='space-y-4'>
              <Skeleton class='h-3/4' height={32} />
              <Skeleton class='w-full' height={16} />
              <Skeleton class='w-5/6' height={16} />
              <Skeleton class='w-4/5' height={16} />
              <div class='mt-6 space-y-2'>
                <Skeleton class='w-2/3' height={16} />
                <Skeleton class='w-3/4' height={16} />
                <Skeleton class='w-1/2' height={16} />
              </div>
            </div>
          }
          when={!isLoading()}>
          <Dynamic component={MDXComp()} />
        </Show>
        {isRootDoc() &&
          subPages().length > 0 &&
          !currentDocument()?.disabled && (
            <ul class='mt-6 grid grid-cols-3 gap-3'>
              <For each={subPages()}>
                {(page) => (
                  <Card class='min-h-12'>
                    <CardContent class='flex h-full items-center p-0'>
                      <A
                        class='w-full px-4 py-2'
                        href={`/docs/${path()[0]}/${page.slug}`}>
                        {page.title}
                      </A>
                    </CardContent>
                  </Card>
                )}
              </For>
            </ul>
          )}
      </DocsLayout>
    </>
  )
}
