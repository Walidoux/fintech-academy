import type { RouteSectionProps } from '@solidjs/router'
import { A } from '@solidjs/router'
import { allDocs } from 'content-collections'
import { type Component, For, type ParentComponent } from 'solid-js'
import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from '~/components/ui/resizable'
import { categoryMap } from '~/lib/store'

const defaultSubSections = [
  {
    title: 'Overview',
    links: [
      { title: 'Introduction', href: '/docs/' },
      { title: 'How this works ?', href: '/docs/how-this-works' },
      { title: 'FAQ', href: '/docs/faq' },
    ],
  },
]

const internships = [
  {
    title: 'Internships',
    links: [
      { title: 'Manar Conseil', href: '/docs/manar-conseil' },
      { title: 'Nestlé Maroc', href: '/docs/nestle' },
      { title: 'DOOC', href: '/docs/dooc' },
    ],
  },
]

const SideNavLink: ParentComponent<{ href: string; ese: string }> = (props) => {
  const href = props.href.replace('{{ese}}', props.ese)
  return (
    <A
      activeClass='font-medium text-primary'
      class='text-sm'
      end
      href={href}
      inactiveClass='opacity-50'>
      {props.children}
    </A>
  )
}

const SideNav: Component<{ ese: string }> = (props) => {
  const sections = [
    ...defaultSubSections,
    ...internships,
    ...Object.entries(
      allDocs.reduce(
        (acc: Record<string, { title: string; href: string }[]>, doc) => {
          const category = doc.category
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push({
            title: doc.title,
            href: `/docs/{{ese}}/components/${doc._meta.path}`,
          })
          return acc
        },
        {}
      )
    )
      .sort()
      .map(([category, links]) => ({
        title: categoryMap[category as keyof typeof categoryMap],
        links: links.sort(),
      })),
  ]

  return (
    <aside class='flex h-full flex-col gap-y-6 overflow-y-auto p-6'>
      <For each={sections}>
        {(section) => (
          <div class='flex flex-col gap-y-2'>
            <h4>{section.title}</h4>
            <For each={section.links}>
              {(link) => (
                <SideNavLink ese={props.ese} href={link.href}>
                  {link.title}
                </SideNavLink>
              )}
            </For>
          </div>
        )}
      </For>
    </aside>
  )
}

const SIZE_PANEL = 0.105

export default function DocsLayout(props: RouteSectionProps) {
  return (
    <main class='h-full'>
      <Resizable class='h-full' orientation='horizontal'>
        <ResizablePanel
          initialSize={SIZE_PANEL}
          maxSize={SIZE_PANEL + 0.0225}
          minSize={SIZE_PANEL - 0.0225}>
          <SideNav ese={props.params.ese as string} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel initialSize={1 - SIZE_PANEL}>
          <section class='h-[calc(100vh-65px)] overflow-y-auto p-6'>
            {props.children}
          </section>
        </ResizablePanel>
      </Resizable>
    </main>
  )
}
