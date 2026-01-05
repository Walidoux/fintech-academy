/* @refresh reload*/
import './index.css'

import { render } from 'solid-js/web'

import App from './app'
import { ThemeProvider } from './providers/theme-provider'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  )
}

render(
  () => (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <App />
    </ThemeProvider>
  ),
  root as HTMLElement
)
