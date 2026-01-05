import type { Component, ParentProps } from 'solid-js'
import { createContext, createEffect, createSignal, useContext } from 'solid-js'

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
    ((localStorage.getItem(props.storageKey ?? 'vite-ui-theme') as Theme) ||
      props.defaultTheme) ??
      'system'
  )

  createEffect(() => {
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
  })

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(props.storageKey ?? 'vite-ui-theme', newTheme)
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
