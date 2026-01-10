import { A, type RouteSectionProps, useLocation } from '@solidjs/router'
import { allPages } from 'content-collections'
import { type Component, createEffect, createSignal, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { Metadata } from '~/components/metadata'
import NotFound from '~/components/not-found'
import { SubNav } from '~/components/sub-nav'
import Toc from '~/components/toc'
import { Card, CardContent } from '~/components/ui/card'

export default function EsePage(props: RouteSectionProps) {
  const [MDXComp, setMDXComp] = createSignal<Component>()
  const { pathname } = useLocation()

  let main!: HTMLElement

  function useHeadings() {
    const [headings, setHeadings] = createSignal<
      { depth: number; slug: string; text: string }[]
    >([])

    createEffect(() => {
      if (MDXComp()) {
        const hElements = main.querySelectorAll('h1, h2, h3, h4, h5, h6')
        const data = Array.from(hElements).map((h) => ({
          depth: Number.parseInt(h.tagName[1], 10),
          slug: h.id,
          text: h.textContent?.trim() || '',
        }))
        setHeadings(data)
      }
    })

    return headings
  }

  const subPages = () =>
    allPages
      .filter(
        (page) =>
          page._meta.path.startsWith(`${props.params.ese}/`) &&
          page._meta.path !== `${props.params.ese}/index`
      )
      .map((page) => ({
        slug: page._meta.path.split('/')[1],
        title: page.title,
      }))
      .sort((a, b) => a.title.localeCompare(b.title))

  const headings = useHeadings()

  createEffect(() => {
    import(`~/content/pages/${props.params.ese}/index.mdx`)
      .then((mod) => setMDXComp(() => mod.default))
      .catch(async () => {
        return await import(`~/content/docs/${props.params.ese}.mdx`).then(
          (mod) => setMDXComp(() => mod.default)
        )
      })
      .catch(() => setMDXComp(() => NotFound))
  })

  return (
    <>
      <Metadata title={props.params.ese as string} />
      <SubNav pathname={pathname} />
      <main class='grid grid-cols-[1fr_200px] p-6'>
        <div
          class='overflow-y-auto'
          ref={(el) => {
            main = el
          }}>
          <Dynamic component={MDXComp()} />
          <ul class='mt-6 grid grid-cols-3 gap-3'>
            <For each={subPages()}>
              {(page) => (
                <Card class='min-h-12'>
                  <CardContent class='flex h-full items-center p-0'>
                    <A
                      class='w-full px-4 py-2'
                      href={`/docs/${props.params.ese}/${page.slug}`}>
                      {page.title}
                    </A>
                  </CardContent>
                </Card>
              )}
            </For>
          </ul>
        </div>
        <Toc data={headings()} />
      </main>
    </>
  )
}
