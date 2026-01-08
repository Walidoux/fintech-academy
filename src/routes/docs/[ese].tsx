import type { RouteSectionProps } from '@solidjs/router'

import { SideNav } from '~/components/side-nav'
import { NAV_HEIGHT } from '~/lib/store'

export default function DocsLayout(props: RouteSectionProps) {
  return (
    <main
      class='grid grid-cols-[225px_1fr]'
      style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
      <SideNav ese={props.params.ese as string} />
      <section class='overflow-y-auto p-6'>{props.children}</section>
    </main>
  )
}
