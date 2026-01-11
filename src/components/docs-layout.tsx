import { useLocation } from '@solidjs/router'
import { allDocs, allPages } from 'content-collections'
import type { ParentComponent } from 'solid-js'
import { createMemo } from 'solid-js'

import { SideNav } from '~/components/side-nav'
import { DocFooter } from './doc-footer'
import Toc from './toc'

export const DocsLayout: ParentComponent = (props) => {
  const location = useLocation()

  // Make currentPage reactive by using createMemo
  const currentPage = createMemo(() => {
    const path = location.pathname.split('/').slice(3) // Remove empty string, 'fintech-academy', and 'docs'
    const isRootDoc = path.length === 1
    const isSubPage = path.length > 1

    // Check both docs and pages collections
    const allDocuments = [...allDocs, ...allPages]
    const page = allDocuments.find((page) => {
      if (isRootDoc) {
        return page._meta.path === path[0]
      }
      if (isSubPage) {
        return page._meta.path === `${path[0]}/${path[1]}`
      }
      return false
    })

    return page
  })

  const currentIdx = createMemo(() => {
    const page = currentPage()
    const allDocuments = [...allDocs, ...allPages]
    return page ? allDocuments.indexOf(page) : -1
  })

  // Use headings from the page metadata instead of DOM extraction
  const headings = createMemo(() => {
    const page = currentPage()
    const h = page?.headings || []

    return h
  })

  return (
    <>
      <SideNav />
      <main class='grid h-[calc(100vh-65px)] grid-cols-[1fr_225px] grid-rows-[1fr_100px]'>
        <div class='overflow-y-auto scroll-smooth p-6'>{props.children}</div>
        <Toc data={headings()} />

        <DocFooter
          next={createMemo(() => {
            const allDocuments = [...allDocs, ...allPages]
            const idx = currentIdx()
            return allDocuments[idx + 1]
          })()}
          previous={createMemo(() => {
            const allDocuments = [...allDocs, ...allPages]
            const idx = currentIdx()
            return allDocuments[idx - 1]
          })()}
        />
      </main>
    </>
  )
}
