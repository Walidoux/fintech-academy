import './app.css'

import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { type JSXElement, type ParentComponent, Suspense } from 'solid-js'
import { Navbar } from './components/navbar'
import { APP_NAME } from './lib/store'
import { ThemeProvider } from './providers/theme-provider'

const Layout: ParentComponent = (props) => {
  return (
    <>
      <Navbar />
      <Suspense>{props.children}</Suspense>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey={`${APP_NAME.SHORT}-theme`}>
      <Router
        base={import.meta.env.SERVER_BASE_URL}
        root={(props: { children: JSXElement }) => (
          <MetaProvider>
            <Title>{APP_NAME.LONG}</Title>
            <Layout>{props.children}</Layout>
          </MetaProvider>
        )}>
        <FileRoutes />
      </Router>
    </ThemeProvider>
  )
}
