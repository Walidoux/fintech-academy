import { Meta, Title } from '@solidjs/meta'
import { A, type RouteSectionProps } from '@solidjs/router'
import { allPages } from 'content-collections'
import type { Component } from 'solid-js'
import { createEffect, createSignal, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import NotFound from '~/components/not-found'
import { Card, CardContent } from '~/components/ui/card'
import { APP } from '~/lib/store'

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
      <Title>
        {props.params.ese} | {APP.LONG_NAME}
      </Title>
      <Meta content={''} name='description' />
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
