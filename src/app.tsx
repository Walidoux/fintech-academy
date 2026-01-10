import './app.css'

import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { type JSXElement, Suspense } from 'solid-js'
import { Metadata } from './components/metadata'
import { Navbar } from './components/navbar'
import { ToastList, ToastRegion } from './components/ui/toast'
import { APP } from './lib/store'
import { ThemeProvider } from './providers/theme-provider'

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey={`${APP.SHORT_NAME}-theme`}>
      <Router
        base={import.meta.env.SERVER_BASE_URL}
        root={(props: { children: JSXElement }) => (
          <MetaProvider>
            <Metadata title='Site' />
            <Navbar />
            <Suspense>{props.children}</Suspense>
            <ToastRegion>
              <ToastList />
            </ToastRegion>
          </MetaProvider>
        )}>
        <FileRoutes />
      </Router>
    </ThemeProvider>
  )
}
