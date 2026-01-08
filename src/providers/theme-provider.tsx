import {
  type Component,
  createContext,
  createEffect,
  createSignal,
  type ParentProps,
  useContext,
} from 'solid-js'
import { isServer } from 'solid-js/web'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = ParentProps & {
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: () => Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: () => 'system',
  setTheme: () => {
    // no-op
  },
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  const [theme, setTheme] = createSignal<Theme>(
    (() => {
      if (isServer) {
        return props.defaultTheme ?? 'system'
      }
      return (
        ((localStorage.getItem(props.storageKey ?? 'vite-ui-theme') as Theme) ||
          props.defaultTheme) ??
        'system'
      )
    })()
  )

  createEffect(() => {
    if (!isServer) {
      const root = window.document.documentElement

      root.classList.remove('light', 'dark')

      if (theme() === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'

        root.classList.add(systemTheme)
        return
      }

      root.classList.add(theme())
    }
  })

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (!isServer) {
        localStorage.setItem(props.storageKey ?? 'vite-ui-theme', newTheme)
      }
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {props.children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
