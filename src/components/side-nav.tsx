import { A } from '@solidjs/router'
import { allDocs } from 'content-collections'
import { type Component, For, type ParentComponent } from 'solid-js'

import { categoryMap } from '~/lib/store'

const defaultSubSections = [
  {
    title: 'Overview',
    links: [
      { title: 'Introduction', href: '/docs/' },
      { title: 'Comment ça marche ?', href: '/docs/how-this-works' },
      { title: 'FAQ', href: '/docs/faq' },
    ],
  },
]

export const internships = [
  {
    title: 'Internships',
    links: [
      { title: 'Manar Conseil', href: '/docs/manar-conseil' },
      { title: 'Nestlé Maroc', href: '/docs/nestle' },
      { title: 'DOOC', href: '/docs/dooc' },
    ],
  },
]

const SideNavLink: ParentComponent<{ href: string }> = (props) => {
  return (
    <A
      activeClass='font-medium text-primary'
      class='select-none text-sm'
      end
      href={props.href}
      inactiveClass='opacity-50'>
      {props.children}
    </A>
  )
}

export const SideNav: Component<{ ese?: string }> = (props) => {
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
            href: `/docs/${doc._meta.path}`,
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
    <aside class='flex flex-col gap-y-6 overflow-y-auto border-r p-6'>
      <For each={sections} fallback={<div />}>
        {(section) => (
          <div class='flex flex-col gap-y-2'>
            <h4 class='select-none'>{section.title}</h4>
            <For each={section.links} fallback={<div />}>
              {(link) => (
                <SideNavLink href={link.href ?? props.ese}>
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
