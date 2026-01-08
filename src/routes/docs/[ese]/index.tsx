import { A, type RouteSectionProps } from '@solidjs/router'
import { allPages } from 'content-collections'
import { type Component, createEffect, createSignal, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { Metadata } from '~/components/metadata'
import NotFound from '~/components/not-found'
import { SubNav } from '~/components/sub-nav'
import { Card, CardContent } from '~/components/ui/card'

export default function EsePage(props: RouteSectionProps) {
  const [MDXComp, setMDXComp] = createSignal<Component>()

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
      <SubNav />
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
    </>
  )
}
