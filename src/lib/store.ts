import { Store } from '@tanstack/solid-store'

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
