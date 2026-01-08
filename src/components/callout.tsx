import { A } from '@solidjs/router'
import {
  TbAlertCircle,
  TbAlertTriangle,
  TbBulb,
  TbInfoCircle,
} from 'solid-icons/tb'
import type { JSXElement, ParentProps } from 'solid-js'
import { cn } from 'tailwind-variants'

const codeRegex = /^%(.*)%$/

function processBold(text: string): (JSXElement | string)[] {
  const boldRegex = /\*\*(.+?)\*\*/g
  const result: (JSXElement | string)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while (true) {
    match = boldRegex.exec(text)
    if (match === null) {
      break
    }
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index))
    }

    result.push(<strong>{match[1]}</strong>)
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex))
  }

  return result
}

function CodeCaption(props: { class?: string; label: string }): JSXElement {
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

function parseMarkdown(text: string): JSXElement[] {
  return text.split(/(%.*?%)/g).flatMap((part) => {
    const codeMatch = part.match(codeRegex)
    if (codeMatch) {
      return <CodeCaption label={codeMatch[1].trim()} />
    }

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const nodes: JSXElement[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while (true) {
      match = linkRegex.exec(part)
      if (match === null) {
        break
      }
      if (match.index > lastIndex) {
        nodes.push(...processBold(part.slice(lastIndex, match.index)))
      }

      nodes.push(
        <A
          class='font-semibold underline underline-offset-4'
          href={match[2]}
          rel='noopener noreferrer'
          target='_blank'>
          {match[1]}
        </A>
      )

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < part.length) {
      nodes.push(...processBold(part.slice(lastIndex)))
    }

    return nodes.length ? nodes : part
  })
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
    icon: () => <TbInfoCircle class='text-[#646cff] dark:text-blue-200' size={20} />,
    color: 'dark:bg-blue-900/50 bg-[#646cff14] text-[#454ce1] dark:text-blue-100',
    border: 'border-l-4 border-[#646cff]',
    title: 'Note',
  },
  caution: {
    icon: () => (
      <TbAlertTriangle class='text-[#915930] dark:text-yellow-200' size={18} />
    ),
    color:
      'bg-[#eab30824] dark:bg-yellow-900/50 text-black dark:text-yellow-100',
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
      <div class='text-sm'>{parseMarkdown(props.children as string)}</div>
    </div>
  )
}
