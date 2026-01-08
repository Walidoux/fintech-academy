import { A } from '@solidjs/router'
import { resolvePath } from 'node_modules/@solidjs/router/dist/utils'
import { TbBrandGithub } from 'solid-icons/tb'
import { createEffect, createSignal, Show } from 'solid-js'
import { cn } from 'tailwind-variants'
import { APP, NAV_HEIGHT } from '~/lib/store'
import { ThemeSwitcher } from './theme-switcher'


export const Navbar = () => {
  type StatusType = 'online' | 'offline' | 'idle'
  const [status, setStatus] = createSignal<StatusType>('idle')
  const labelsDict = {
    online: 'En ligne',
    offline: 'Hors-ligne',
    idle: 'Inactif'
  }

  createEffect(() => {
    fetch(APP.HOME_PAGE, { mode: 'no-cors' })
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'))
  })

  return (
    <nav class='border-b' style={{ height: `${NAV_HEIGHT}px` }}>
      <div class='mx-auto flex h-full max-w-6xl items-center justify-between px-3 py-2'>
        <img
          alt='Logo'
          class='select-none'
          draggable={false}
          height={50}
          src={resolvePath(import.meta.env.SERVER_BASE_URL, 'logo.svg')}
          width={50}
        />
        <div class='inline-flex items-center'>
          <Show when={process.env.NODE_ENV === 'development'}>
            <A
              class='flex h-fit items-center gap-x-1.5 rounded-full bg-muted p-0.5 px-1.5 font-medium text-[10px] uppercase tracking-widest'
              href={APP.HOME_PAGE}
              rel='noopener noreferrer'
              target='_blank'>
              <span
                class={cn('size-2 rounded-full transition-colors', {
                  'bg-green-500': status() === 'online',
                  'bg-gray-500': status() === 'idle',
                  'bg-red-500': status() === 'offline',
                })}
              />
              {labelsDict[status()]}
            </A>
          </Show>
          <A
            class='grid size-10 place-items-center'
            href={APP.GITHUB_URL}
            rel='noopener noreferrer'
            target='_blank'>
            <TbBrandGithub />
          </A>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}
