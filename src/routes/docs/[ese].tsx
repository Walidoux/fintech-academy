import type { RouteSectionProps } from '@solidjs/router'
import { A } from '@solidjs/router'
import { allDocs } from 'content-collections'
import { type Component, For, type ParentComponent } from 'solid-js'
import type { categories } from '../../../content-collections'

const categoryMap: Record<(typeof categories)[number], string> = {
  calculs: 'Calculs',
  generalites: 'Généralités',
}

const defaultSubSections = [
  {
    title: 'Overview',
    links: [
      { title: 'Introduction', href: '/docs/' },
      { title: 'Nestlé', href: '/docs/nestle' },
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
    <aside class='sticky flex max-w-xl flex-1 flex-col gap-y-6 overflow-y-auto p-6'>
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

export default function DocsLayout(props: RouteSectionProps) {
  return (
    <main class='grid h-full grid-cols-[200px_1fr] gap-6'>
      <SideNav ese={props.params.ese as string} />

      <section class='h-full min-h-0 flex-1 overflow-y-auto border p-6'>
        {props.children}
      </section>
    </main>
  )
}
