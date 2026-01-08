/** Acts like a JSX factory for compiling MDX documents. */
import 'katex/dist/katex.css'

import { A } from '@solidjs/router'
import katex from 'katex'
import { createSignal, type Component } from 'solid-js'
import { cn } from 'tailwind-variants'
import { Callout } from '~/components/callout'
import { CheckboxControl } from '~/components/ui/checkbox'
import { RawTable } from '~/components/raw-table'
import { Separator } from '~/components/ui/separator'
import { Checkbox } from '@kobalte/core/checkbox'

const createSlug = (text: string) =>
  text.toString().toLowerCase().replace(/\s+/g, '-')

const taskListRegex = /^\s*(\[[\sx]\])\s*(.+)$/i

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

// biome-ignore lint/suspicious/noExplicitAny: different components have different props
export const useMDXComponents: () => Record<string, Component<any>> = () => ({
  Callout,

  h1(props) {
    return (
      <h1
        class={cn(
          'not-first:mt-6 scroll-m-20 text-balance font-extrabold text-4xl tracking-tight',
          props.class
        )}
        id={createSlug(props.children)}>
        {props.children}
      </h1>
    )
  },

  h2(props) {
    return (
      <h2
        class={cn(
          'mt-10 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight transition-colors first:mt-0',
          props.class
        )}
        id={createSlug(props.children)}>
        {props.children}
      </h2>
    )
  },

  h3(props) {
    return (
      <h3
        class={cn(
          'mt-8 scroll-m-20 font-semibold text-2xl tracking-tight',
          props.class
        )}
        id={createSlug(props.children)}>
        {props.children}
      </h3>
    )
  },

  h4(props) {
    return (
      <h4
        class={cn(
          'mt-4 scroll-m-20 font-semibold text-xl tracking-tight',
          props.class
        )}
        id={createSlug(props.children)}>
        {props.children}
      </h4>
    )
  },

  p(props) {
    return <p class={cn('not-first:mt-2 leading-7', props.class)} {...props} />
  },

  Muted(props) {
    return (
      <p
        class={cn(
          'not-first:mt-6 text-muted-foreground text-xl leading-7',
          props.class
        )}
        {...props}
      />
    )
  },

  blockquote(props) {
    return (
      <blockquote class={cn('mt-6 border-l-2 pl-6 italic', props.class)}>
        {props.children}
      </blockquote>
    )
  },

  ul(props) {
    return (
      <ul class={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.class)}>
        {props.children}
      </ul>
    )
  },

  code(props) {
    return (
      <code
        class={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
          props.class
        )}>
        {props.children}
      </code>
    )
  },

  a: (props) => <A {...props} />,
  hr: (props) => <Separator {...props} />,
  i: (props) => <i {...props} />,
  b: (props) => <b {...props} />,
  em: (props) => <em {...props} />,
  strong: (props) => <strong {...props} />,
  li(props) {
    const children = props.children
    if (typeof children === 'string') {
      const match = children.match(taskListRegex)
      const [checked, setChecked] = createSignal(
        match ? match[1].toLowerCase() === '[x]' : false
      )
      if (match) {
        return (
          <li class={cn('inline-flex gap-x-3', props.class)}>
            <Checkbox
              checked={checked()}
              onClick={() => setChecked(!checked())}
              class='mt-1 h-fit w-fit'>
              <CheckboxControl />
            </Checkbox>
            {match[2]}
          </li>
        )
      }
    }
    return (
      <li class={cn('', props.class)} {...props}>
        {children}
      </li>
    )
  },
  ol: (props) => <ol {...props} />,
  pre: (props) => <pre {...props} />,

  RawTable,

  Math({ children, block = false }: { children: string; block?: boolean }) {
    return (
      <span
        class={block ? 'math-display' : 'math-inline'}
        innerHTML={katex.renderToString(children, {
          displayMode: block,
          throwOnError: false,
        })}
      />
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
})
