import { useLocation } from '@solidjs/router'
import { For, Show } from 'solid-js'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumbs'
import { sanitizeSlug } from '~/lib/utils'

export const SubNav = () => {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  segments.shift()

  if (segments.length <= 1) {
    return null
  }

  const constructSegment = (seg: string, idx: number) => {
    if (idx === 0) {
      return `/${seg}`
    }
    return `/${segments.slice(0, idx + 1).join('/')}`
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <For each={segments}>
          {(segment, idx) => {
            return (
              <>
                {/* TODO: if pathname has more than 5 segments add <BreadcrumbEllipsis /> at pos 1 of array index */}
                <BreadcrumbItem>
                  <BreadcrumbLink href={constructSegment(segment, idx())}>
                    {sanitizeSlug(segment)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <Show when={segments[idx() + 1]}>
                  <BreadcrumbSeparator />
                </Show>
              </>
            )
          }}
        </For>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
