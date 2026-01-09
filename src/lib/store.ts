import { Store } from '@tanstack/solid-store'
import { createSignal, onCleanup } from 'solid-js'
import { isServer } from 'solid-js/web'

import pkg from '../../package.json'
import { sanitizeSlug } from './utils'

export const NAV_HEIGHT = 65

export const FAVICON_URL =
  'https://s2.googleusercontent.com/s2/favicons?domain='

export const REGEX = {
  TASK_LIST: /^\s*(\[[\sx]\])\s*(.+)$/i,
  TEXT: {
    CODE: /^%(.*)%$/,
    BREAK: /(%.*?%)/g,
    BOLD: /\*\*(.+?)\*\*/g,
    LINK: /\[([^\]]+)\]\(([^)]+)\)/g,
  },
}

export const APP = {
  GITHUB_URL: pkg.repository.url,
  DESCRIPTION: pkg.description,
  HOME_PAGE: pkg.homepage,
  SHORT_NAME: pkg.name,
  LONG_NAME: sanitizeSlug(pkg.name),
}

export const categoryMap: Record<string, string> = {
  calculs: 'Calculs',
  generalites: 'Généralités',
  ressources: 'Ressources',
  cours: 'Cours Académiques',
  research: 'Recherches',
}

export const categoriesKeys = Object.keys(categoryMap) as [string, ...string[]]

export const store = new Store({
  sideNavOpen: true,
})

// https://github.com/solidjs-community/solid-primitives/blob/main/packages/media/src/index.ts
export const useIsMobile = () => {
  if (isServer) {
    return () => false
  }

  const mql = window.matchMedia('(max-width: 767px)')
  const [state, setState] = createSignal(mql.matches)
  const update = () => setState(mql.matches)
  mql.addEventListener('change', update)
  onCleanup(() => {
    mql.removeEventListener('change', update)
  })
  return state
}
