import { A } from '@solidjs/router'
import {
  TbAlertCircle,
  TbAlertTriangle,
  TbBulb,
  TbInfoCircle,
} from 'solid-icons/tb'
import type { JSXElement, ParentProps } from 'solid-js'

function processBold(text: string): (JSXElement | string)[] {
  const boldRegex = /\*\*(.+?)\*\*/g
  const result: (JSXElement | string)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = boldRegex.exec(text)) !== null) {
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

function parseMarkdown(text: string): JSXElement[] {
  const parts = text.split(/(%.*?%)/g)
  return parts.flatMap((part) => {
    const codeMatch = part.match(/^%(.*)%$/)
    if (codeMatch) return <CodeCaption label={codeMatch[1].trim()} />

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const nodes: JSXElement[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = linkRegex.exec(part)) !== null) {
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
    title: 'Conseil de pro',
  },
  note: {
    icon: () => <TbInfoCircle class='text-blue-200' />,
    color: 'bg-blue-900/50 text-blue-100',
    border: 'border-l-4 border-blue-400',
    title: 'Note',
  },
  caution: {
    icon: () => <TbAlertTriangle class='text-yellow-200' />,
    color: 'bg-yellow-900/50 text-yellow-100',
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

export function Callout(
  props: ParentProps<{
    type?: CalloutType
    title?: string
  }>
): JSXElement {
  const { title, border, color, icon: Icon } = config[props.type ?? 'note']
  return (
    <div class={`${color} ${border} my-4 flex flex-col gap-2 rounded-r-md p-4`}>
      <div class='mb-1 flex items-center gap-2'>
        <Icon />
        <span class='font-semibold'>{title.toUpperCase()}</span>
      </div>
      <div class='text-sm'>{parseMarkdown(props.children as string)}</div>
    </div>
  )
}
