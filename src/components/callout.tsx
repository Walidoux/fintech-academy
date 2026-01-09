import {
  TbAlertCircle,
  TbAlertTriangle,
  TbBulb,
  TbInfoCircle,
} from 'solid-icons/tb'
import { For, type JSXElement, type ParentProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from 'tailwind-variants'
import { parseMarkdown } from '../lib/utils'

export const CodeCaption = (props: {
  class?: string
  label: string
}): JSXElement => {
  return (
    <code
      class={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
        props.class
      )}>
      {props.label}
    </code>
  )
}

type CalloutType = 'tip' | 'note' | 'caution' | 'attention'
interface Callout {
  icon: () => JSXElement
  color: string
  border: string
  title: string
}

const config: Record<CalloutType, Callout> = {
  tip: {
    icon: () => <TbBulb class='text-purple-200' />,
    color: 'bg-purple-900/50 text-purple-100',
    border: 'border-l-4 border-purple-400',
    title: 'Astuce',
  },
  note: {
    icon: () => (
      <TbInfoCircle class='text-[#646cff] dark:text-blue-200' size={20} />
    ),
    color:
      'dark:bg-blue-900/50 bg-[#646cff14] text-[#454ce1] dark:text-blue-100',
    border: 'border-l-4 border-[#646cff]',
    title: 'Note',
  },
  caution: {
    icon: () => (
      <TbAlertTriangle class='text-[#915930] dark:text-yellow-200' size={18} />
    ),
    color:
      'bg-[#eab30824] dark:bg-yellow-900/50 text-[#915930] dark:text-yellow-100',
    border: 'border-l-4 border-yellow-400',
    title: 'Caution',
  },
  attention: {
    icon: () => <TbAlertCircle class='text-red-200' />,
    color: 'bg-red-900/50 text-red-100',
    border: 'border-l-4 border-red-400',
    title: 'Attention',
  },
}

interface CallProps extends ParentProps {
  type: CalloutType
  subject: string
}

export function Callout(props: Partial<CallProps>): JSXElement {
  const { title, border, color, icon: Icon } = config[props.type ?? 'note']
  const components = parseMarkdown(props.children as string)

  return (
    <div class={`${color} ${border} my-4 flex flex-col gap-2 rounded-r-md p-4`}>
      <div class='inline-flex items-center gap-2'>
        <Icon />
        <span class='mt-0.5 font-semibold'>
          {title
            .toUpperCase()
            .concat(props.subject ? ` : ${props.subject}` : '')}
        </span>
      </div>
      <div class='text-sm'>
        <For each={components}>
          {(comp) =>
            typeof comp === 'string' ? (
              comp
            ) : (
              <Dynamic component={comp.type}>{comp.children}</Dynamic>
            )
          }
        </For>
      </div>
    </div>
  )
}
