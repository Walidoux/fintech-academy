import type { RouteSectionProps } from '@solidjs/router'
import { allPages } from 'content-collections'
import { type Component, createEffect, createSignal } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { DocFooter } from '~/components/doc-footer'

import { Metadata } from '~/components/metadata'
import { SubNav } from '~/components/sub-nav'
import NotFound from '~/routes/[...404]'

export default function Subpage(props: RouteSectionProps) {
  const [MDXComp, setMDXComp] = createSignal<Component>()
  const currentPage = allPages.find(
    (page) => page.title.toLowerCase() === props.params.subpage
  )
  const currentIdx = allPages.indexOf(
    currentPage as NonNullable<typeof currentPage>
  )

  createEffect(() => {
    import(`~/content/pages/${props.params.ese}/${props.params.subpage}.mdx`)
      .then((mod) => setMDXComp(() => mod.default))
      .catch(() => setMDXComp(() => NotFound))
  })

  return (
    <>
      <Metadata title={props.params.subpage as string} />
      <SubNav />
      <Dynamic component={MDXComp()} />
      <DocFooter
        next={allPages[currentIdx + 1]}
        previous={allPages[currentIdx - 1]}
      />
    </>
  )
}
