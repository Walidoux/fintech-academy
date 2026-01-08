import './app.css'

import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { type ParentComponent, Suspense } from 'solid-js'
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
  console.log(import.meta.env.SERVER_BASE_URL)
  return (
    <ThemeProvider defaultTheme='system' storageKey={`${APP_NAME.SHORT}-theme`}>
      <Router
        base={import.meta.env.SERVER_BASE_URL}
        // base={`/${APP_NAME.SHORT}`}
        root={(props) => (
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
