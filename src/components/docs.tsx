import { useLocation } from '@solidjs/router'
import type { Component } from 'solid-js'
import { createResource, Show } from 'solid-js'
import pkg from '../../package.json'
import { Spinner } from './ui/spinner'

const BASE_REGEX = new RegExp(`^/?${pkg.name}/?`)
const DOCS_REGEX = /^\/?docs\/?/

const docsModules = import.meta.glob('../../docs/**/*.{md,mdx}', {
  eager: false,
})

const Docs: Component = () => {
  const location = useLocation()
  const path = () =>
    location.pathname.replace(BASE_REGEX, '').replace(DOCS_REGEX, '') || ''

  const loadContent = async (docPath: string): Promise<Component | null> => {
    if (!docPath) {
      return null
    }

    try {
      const modulePath = (ext: string) => `../../docs/${docPath}.${ext}`
      let module =
        docsModules[modulePath('mdx')] || docsModules[modulePath('md')]

      if (!module) {
        const searchPath = `/${docPath}.mdx`
        const foundKey = Object.keys(docsModules).find((key) =>
          key.endsWith(searchPath)
        )
        if (foundKey) {
          module = docsModules[foundKey]
        } else {
          const searchPathMd = `/${docPath}.md`
          const foundKeyMd = Object.keys(docsModules).find((key) =>
            key.endsWith(searchPathMd)
          )
          if (foundKeyMd) {
            module = docsModules[foundKeyMd]
          }
        }
      }

      if (module) {
        const componentModule = (await module()) as { default?: Component }
        return componentModule.default || (componentModule as Component)
      }
      return null
    } catch (error) {
      console.error(`Failed to load ${docPath}:`, error)
      return null
    }
  }

  const [mdxContent] = createResource(path, loadContent)
  const renderMdx = (Component: Component) => {
    return <Component />
  }

  return (
    <Show
      fallback={
        <main class='grid h-screen max-w-screen place-items-center'>
          <Spinner />
        </main>
      }
      when={!mdxContent.loading}>
      <article class='mx-auto max-w-3xl p-8'>
        <Show when={mdxContent()}>{(component) => renderMdx(component())}</Show>
      </article>
    </Show>
  )
}

export default Docs
