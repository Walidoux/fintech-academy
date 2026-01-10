import type { Meta } from '@content-collections/core'
import { A } from '@solidjs/router'
import { BsArrowRight } from 'solid-icons/bs'
import { For } from 'solid-js'
import { cn } from 'tailwind-variants'

type DocsFooterProps = Partial<
  Record<
    'previous' | 'next',
    { title: string; content: string } & { _meta: Meta }
  >
>

export const DocFooter = (props: DocsFooterProps) => {
  const validKeys = Object.keys(props).filter(
    (key) => props[key as keyof typeof props]
  )
  return (
    <nav
      aria-label='doc-footer-pager'
      class={cn(
        'sticky bottom-0 grid grid-cols-2 border-border border-t bg-background/50 p-4 backdrop-blur-sm'
      )}>
      <For each={validKeys.reverse()}>
        {(key) => {
          const page = props[key as keyof typeof props]
          return page ? (
            <A
              class={cn(
                { 'mr-2': key === 'previous' },
                { 'ml-2 text-right': key === 'next' },
                'relative grid rounded-md border border-[#e2e2e3] bg-background px-4 py-3 transition-colors hover:border-primary hover:bg-primary/10'
              )}
              href={page._meta.filePath}>
              <span class='block font-medium text-[#67676c] text-xs leading-5'>
                {key === 'next' ? 'Page suivante' : 'Page précédente'}
              </span>
              <span class={cn('gap-x-2 flex w-fit items-center font-medium text-primary text-sm leading-5 transition-colors', {
                'ml-auto flex-row-reverse': key === 'next',
              })}>
                <BsArrowRight class={cn({'rotate-180': key === 'previous'})} />
                {page.title}
              </span>
            </A>
          ) : null
        }}
      </For>
    </nav>
  )
}
