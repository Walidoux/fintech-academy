import { createIntersectionObserver } from '@solid-primitives/intersection-observer'
import { createEffect, createSignal, For, Show } from 'solid-js'
import { isServer } from 'solid-js/web'

const Toc = (props: {
  data: { depth: number; slug: string; text: string }[]
}) => {
  const [targets, setTargets] = createSignal<Element[]>([])
  const [activeItem, setActiveItem] = createSignal<string[]>([])

  createEffect(() => {
    if (isServer) {
      return
    }

    // Reset active items when data changes
    setActiveItem([])

    // Use MutationObserver to wait for headings to be added to DOM
    const observer = new MutationObserver(() => {
      const newTargets = props.data
        .map((item) => document.getElementById(item.slug))
        .filter((el) => el !== null) as Element[]

      if (newTargets.length > 0) {
        setTargets(newTargets)
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Also check immediately in case elements are already there
    const immediateTargets = props.data
      .map((item) => document.getElementById(item.slug))
      .filter((el) => el !== null) as Element[]

    if (immediateTargets.length > 0) {
      setTargets(immediateTargets)
      observer.disconnect()
    }
  })

  createIntersectionObserver(targets, (entries) => {
    if (isServer) {
      return
    }

    for (const entry of entries) {
      const id = entry.target.getAttribute('id')
      if (id === null) {
        continue
      }

      if (entry.isIntersecting && !activeItem().includes(id)) {
        setActiveItem([...activeItem(), id])
      } else if (!entry.isIntersecting && activeItem().includes(id)) {
        setActiveItem(activeItem().filter((h) => h !== id))
      }
    }
  })

  return (
    <aside class='sticky top-0 left-0 z-10 row-span-2 flex h-full flex-col gap-2 border-l p-6'>
      <p class='h-6 bg-background font-semibold text-xs'>Sur cette page</p>
      <Show when={props.data.length > 0}>
        <ul class='flex flex-col gap-2'>
          <For each={props.data}>
            {(item) => (
              <li
                class='text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[active=true]:text-primary'
                data-active={activeItem().includes(item.slug)}
                data-depth={item.depth}>
                <a href={`#${item.slug}`}>{item.text}</a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </aside>
  )
}

export default Toc
