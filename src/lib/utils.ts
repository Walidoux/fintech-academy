import { FAVICON_URL, REGEX } from './store'

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Creates a slug from a string.
 * @param text - The string to create a slug from.
 * @returns The slug.
 */
export const createSlug = (text: string): string => {
  return text.toString().toLowerCase().replace(/\s+/g, '-')
}

export const sanitizeSlug = (text: string): string => {
  return text.replace(/-/g, ' ').split(' ').map(capitalize).join(' ')
}

/**
 * Generates a favicon URL from a domain.
 * @param domain - The domain to generate the favicon URL from.
 * @returns The favicon URL.
 */
export const generateFaviconUrl = (domain: string): string => {
  return FAVICON_URL.concat(domain)
}

interface RawComponent extends Record<string, string> {
  comp: string
  children: string
}

function processBold(text: string): Array<RawComponent | string> {
  const result: ReturnType<typeof processBold> = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while (true) {
    match = REGEX.TEXT.CODE.BOLD.exec(text)
    if (match === null) {
      break
    }
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index))
    }

    result.push({ comp: 'strong', children: match[1] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex))
  }

  return result
}

/**
 * Parses a markdown string into an array of raw components.
 * @param content The markdown string to parse.
 * @returns An array of raw components.
 */
export function parseMarkdown(content: string): RawComponent[] {
  return content.split(REGEX.TEXT.CODE.BREAK).flatMap((part) => {
    const codeMatch = part.match(REGEX.TEXT.CODE.CODE)
    if (codeMatch) {
      return { comp: 'CodeCaption', label: codeMatch[1].trim() }
    }

    const nodes: ReturnType<typeof parseMarkdown> = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while (true) {
      match = REGEX.TEXT.CODE.LINK.exec(part)
      if (match === null) {
        break
      }
      if (match.index > lastIndex) {
        nodes.push(
          ...(processBold(part.slice(lastIndex, match.index)) as typeof nodes)
        )
      }

      nodes.push({
        comp: 'A',
        class: 'font-semibold underline underline-offset-4',
        href: match[2],
        rel: 'noopener noreferrer',
        target: '_blank',
        children: match[1],
      })

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < part.length) {
      nodes.push(...(processBold(part.slice(lastIndex)) as typeof nodes))
    }

    return nodes.length ? nodes : part
  })
}
