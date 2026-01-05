import type { JSXElement, ParentProps } from 'solid-js'
import { cn } from '~/lib/utils'
import { EBITDA as ebitda } from './ebitda'

type CustomSourceProps<T = unknown> = (
  props: ParentProps<{ className?: string; href?: string } & T>
) => JSXElement

export const Typography: Record<string, CustomSourceProps> = {
  ebitda,

  Lead(props) {
    return (
      <p class={cn('text-muted-foreground text-xl', props.className)}>
        {props.children}
      </p>
    )
  },

  Large(props) {
    return (
      <div class={cn('font-semibold text-lg', props.className)}>
        {props.children}
      </div>
    )
  },

  Small(props) {
    return (
      <small class={cn('font-medium text-sm leading-none', props.className)}>
        {props.children}
      </small>
    )
  },

  Muted(props) {
    return (
      <p class={cn('text-muted-foreground text-sm', props.className)}>
        {props.children}
      </p>
    )
  },

  customsource({ children, className, href, ...props }) {
    return (
      <a
        class={cn(
          'inline-flex cursor-pointer rounded-full bg-black/10 px-2 text-sm transition-colors hover:bg-black hover:text-white',
          className
        )}
        href={href}
        {...props}>
        {children}
      </a>
    )
  },
}
