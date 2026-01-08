import type { Meta } from '@content-collections/core'
import { A } from '@solidjs/router'
import { For } from 'solid-js'
import { cn } from 'tailwind-variants'

type DocsFooterProps = Record<
  'previous' | 'next',
  { title: string; content: string } & { _meta: Meta }
>

export const DocFooter = (props: DocsFooterProps) => {
  return (
    <nav
      aria-label='doc-footer-pager'
      class='mt-4 flex items-center justify-between'>
      <For each={Object.keys(props)}>
        {(key) => {
          const { title, _meta } = props[key as keyof typeof props]
          return (
            <A
              class={cn(
                { 'text-right': key === 'previous' },
                'grid rounded-md border border-[#e2e2e3] px-4 py-3 transition-colors hover:border-primary hover:bg-primary/10'
              )}
              href={_meta.filePath}>
              <span class='block font-medium text-[#67676c] text-xs leading-5'>
                {key === 'next' ? 'Page suivante' : 'Page précédente'}
              </span>
              <span class='block font-medium text-primary text-sm leading-5 transition-colors'>
                {title}
              </span>
            </A>
          )
        }}
      </For>
    </nav>
  )
}
