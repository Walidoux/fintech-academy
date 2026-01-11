import {
  type Accessor,
  createSignal,
  onCleanup,
  type ParentProps,
} from 'solid-js'
import { isServer } from 'solid-js/web'

import pkg from '../../package.json'
import { sanitizeSlug } from './utils'

export const FAVICON_URL =
  'https://s2.googleusercontent.com/s2/favicons?domain='

export const REGEX = {
  TASK_LIST: /^\s*(\[[\sx]\])\s*(.+)$/i,
  TEXT: {
    CODE: {
      CODE: /^%(.*)%$/,
      BREAK: /(%.*?%)/g,
      BOLD: /\*\*(.+?)\*\*/g,
      LINK: /\[([^\]]+)\]\(([^)]+)\)/g,
    },
  },
}

export const APP = {
  GITHUB_URL: pkg.repository.url,
  DESCRIPTION: pkg.description,
  HOME_PAGE: pkg.homepage,
  SHORT_NAME: pkg.name,
  LONG_NAME: sanitizeSlug(pkg.name),
  AUTHOR: pkg.author.name,
  OG_IMAGE_URL: `${pkg.homepage}/og-image.jpg`,
}

export const categoryMap: Record<string, string> = {
  calculs: 'Calculs',
  ressources: 'Ressources',
  cours: 'Cours Académiques',
  research: 'Recherches',
}

export const categoriesKeys = Object.keys(categoryMap) as [string, ...string[]]

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

export type ColorMode = 'light' | 'dark'
export type ConfigColorMode = ColorMode | 'system'
export type MaybeConfigColorMode = ConfigColorMode | undefined

export const COLOR_MODE_STORAGE_KEY = 'kb-color-mode'
export const FALLBACK_COLOR_MODE_VALUE: ConfigColorMode = 'system'

export interface ColorModeStorageManager {
  /** The type of storage. */
  type: 'cookie' | 'localStorage'

  /** Whether it's an SSR environment. */
  ssr?: boolean

  /** Get the color mode from the storage. */
  get: (fallback?: ConfigColorMode) => MaybeConfigColorMode

  /** Save the color mode in the storage. */
  set: (value: ConfigColorMode) => void
}

export interface ColorModeContextType {
  colorMode: Accessor<ColorMode>
  setColorMode: (value: ConfigColorMode) => void
  toggleColorMode: () => void
}

export interface ColorModeOptions {
  /** The initial color mode to use. */
  initialColorMode?: ConfigColorMode

  /** Whether css transitions should be disabled during the color mode changes. */
  disableTransitionOnChange?: boolean

  /** The color mode storage manager, either localStorage or cookie. */
  storageManager?: ColorModeStorageManager
}

export type ColorModeProviderProps = ParentProps<ColorModeOptions>

export interface ColorModeScriptProps {
  /** The initial color mode to use. */
  initialColorMode?: ConfigColorMode

  /** The type of the color mode storage manager, either localStorage or cookie. */
  storageType?: 'localStorage' | 'cookie'

  /** The key used to store color mode preference in localStorage or cookie. */
  storageKey?: string

  nonce?: string
}

export function createLocalStorageManager(
  key: string
): ColorModeStorageManager {
  return {
    ssr: false,
    type: 'localStorage',
    get: (fallback) => {
      if (isServer) {
        return fallback
      }

      let value: ConfigColorMode | null | undefined
      try {
        value = localStorage.getItem(key) as ConfigColorMode
      } catch (_) {
        // noop
      }

      return value ?? fallback
    },
    set: (value) => {
      try {
        localStorage.setItem(key, value)
      } catch {
        // noop
      }
    },
  }
}

export const localStorageManager = createLocalStorageManager(
  COLOR_MODE_STORAGE_KEY
)

function parseCookie(cookie: string, key: string): MaybeConfigColorMode {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
  return match?.[2] as MaybeConfigColorMode
}

export function createCookieStorageManager(
  key: string,
  cookie?: string
): ColorModeStorageManager {
  return {
    ssr: !!cookie,
    type: 'cookie',
    get: (fallback) => {
      if (cookie) {
        return parseCookie(cookie, key) ?? fallback
      }

      if (isServer) {
        return fallback
      }

      return parseCookie(document.cookie, key) ?? fallback
    },
    set: (value) => {
      document.cookie = `${key}=${value}; max-age=31536000; path=/`
    },
  }
}

export const cookieStorageManager = createCookieStorageManager(
  COLOR_MODE_STORAGE_KEY
)

export function cookieStorageManagerSSR(cookie: string) {
  return createCookieStorageManager(COLOR_MODE_STORAGE_KEY, cookie)
}

function query() {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

export function getSystemColorMode(fallback?: ColorMode): ColorMode {
  const isDark = query().matches ?? fallback === 'dark'
  return isDark ? 'dark' : 'light'
}

export function getInitialColorMode(
  manager: ColorModeStorageManager
): ColorMode {
  const fallback: ColorMode = 'light'

  const initialColorMode = manager.get(fallback) ?? fallback

  if (initialColorMode === 'system') {
    // We can't know the client system preference in SSR so just return the fallback.
    return isServer ? fallback : getSystemColorMode()
  }

  return initialColorMode
}
export function addColorModeListener(fn: (cm: ColorMode) => unknown) {
  const mql = query()

  const listener = (e: MediaQueryListEvent) => {
    fn(e.matches ? 'dark' : 'light')
  }

  mql.addEventListener('change', listener)

  return () => {
    mql.removeEventListener('change', listener)
  }
}

function preventTransition() {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
    )
  )
  document.head.appendChild(css)

  return () => {
    // force a reflow
    ;(() => window.getComputedStyle(document.body))()

    // wait for next tick
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.head.removeChild(css)
      })
    })
  }
}

export function setColorModeDataset(
  value: ColorMode,
  shouldPreventTransition = true
) {
  const cleanup = shouldPreventTransition ? preventTransition() : undefined
  document.documentElement.dataset.kbTheme = value
  document.documentElement.style.colorScheme = value
  cleanup?.()
}
