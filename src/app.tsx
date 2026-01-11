import './app.css'

import { Meta, MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { type JSXElement, Suspense } from 'solid-js'
import { isServer, Portal } from 'solid-js/web'
import { getCookie } from 'vinxi/http'

import { Navbar } from './components/navbar'
import { ColorModeProvider } from './components/theme/color-mode-provider'
import { ColorModeScript } from './components/theme/color-mode-script'
import { ToastList, ToastRegion } from './components/ui/toast'
import { COLOR_MODE_STORAGE_KEY, cookieStorageManagerSSR } from './lib/store'

function getServerCookies() {
  'use server'
  const colorMode = getCookie(COLOR_MODE_STORAGE_KEY)
  return colorMode ? `${COLOR_MODE_STORAGE_KEY}=${colorMode}` : ''
}

export default function App() {
  const storageManager = cookieStorageManagerSSR(
    isServer ? getServerCookies() : document.cookie
  )

  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL}
      root={(props: { children: JSXElement }) => (
        <MetaProvider>
          <Meta charset='utf-8' />
          <Meta content='text/html; charset=utf-8' http-equiv='content-type' />
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            <Navbar />
            <Suspense>{props.children}</Suspense>
            <Portal>
              <ToastRegion>
                <ToastList />
              </ToastRegion>
            </Portal>
          </ColorModeProvider>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  )
}
