import { type RouteSectionProps, useLocation } from '@solidjs/router'
import { allPages } from 'content-collections'
import type { ParentComponent } from 'solid-js'

import { DocFooter } from '~/components/doc-footer'
import { SideNav } from '~/components/side-nav'
import { SubNav } from '~/components/sub-nav'
import MDXContent from '~/content/pages/introduction/index.mdx'
import { NAV_HEIGHT } from '~/lib/store'

const Layout: ParentComponent = (props) => (
  <>
    <SideNav />
    <main
      class='grid grid-rows-[1fr_100px]'
      style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
      {props.children}
    </main>
  </>
)

export default function IntroductionPage(_props: RouteSectionProps) {
  const { pathname } = useLocation()

  const pageTitle = 'Introduction'
  const currentPage = allPages.find((page) => page.title === pageTitle)
  const currentIdx = allPages.indexOf(
    currentPage as NonNullable<typeof currentPage>
  )

  return (
    <Layout>
      <SubNav pathname={pathname} />
      <div class='overflow-y-auto p-6'>
        <MDXContent />
      </div>
      <DocFooter
        next={allPages[currentIdx + 1]}
        previous={allPages[currentIdx - 1]}
      />
    </Layout>
  )
}
