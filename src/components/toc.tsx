import { createIntersectionObserver } from '@solid-primitives/intersection-observer'
import { createEffect, createSignal, For } from 'solid-js'

const Toc = (props: {
  data: { depth: number; slug: string; text: string }[]
}) => {
  const [targets, setTargets] = createSignal<Element[]>([])

  createEffect(() => {
    const newTargets = props.data
      .map((item) => document.getElementById(item.slug))
      .filter((el) => el !== null) as Element[]
    setTargets(newTargets)
  })

  const [activeItem, setActiveItem] = createSignal<string[]>([])

  createIntersectionObserver(targets, (entries) => {
    for (const entry of entries) {
      const id = entry.target.getAttribute('id')
      if (id === null) {
        return
      }

      if (entry.isIntersecting && !activeItem().includes(id)) {
        setActiveItem([...activeItem(), id])
        return
      }
      if (!entry.isIntersecting && activeItem().includes(id)) {
        setActiveItem(activeItem().filter((h) => h !== id))
        return
      }
    }
  })

  return (
    <aside class='sticky top-0 left-0 z-10 mt-10 flex flex-col gap-2 bg-background p-4 pt-0'>
      <p class='h-6 bg-background text-muted-foreground text-xs'>
        Sur cette page
      </p>
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
    </aside>
  )
}

export default Toc
