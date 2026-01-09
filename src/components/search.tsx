import { useNavigate } from '@solidjs/router'
import { allDocs } from 'content-collections'
import {
  type ComponentProps,
  createEffect,
  createSignal,
  For,
  onCleanup,
  splitProps,
} from 'solid-js'
import { cn } from 'tailwind-variants'
import { categoryMap } from '~/lib/store'
import { AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from './ui/dialog'
import { Kbd, KbdGroup } from './ui/kbd'

const CommandKbd = (props: ComponentProps<'kbd'>) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <kbd
      class={cn(
        "pointer-events-none flex h-5 select-none items-center justify-center gap-1 rounded border bg-background px-1 font-medium font-sans text-[0.7rem] text-muted-foreground [&_svg:not([class*='size-'])]:size-3",
        local.class
      )}
      {...rest}
    />
  )
}

const CommandMenuItem = (
  props: ComponentProps<typeof CommandItem> & {
    onHighlight?: () => void
  }
) => {
  const [local, rest] = splitProps(props, ['class', 'onHighlight'])

  return (
    <CommandItem
      class={cn(
        'h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50',
        local.class
      )}
      {...rest}
    />
  )
}

const CommandMenu = () => {
  const navigate = useNavigate()

  const [open, setOpen] = createSignal(false)

  const runCommand = (command: () => unknown) => {
    setOpen(false)
    command()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
      if (
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      e.preventDefault()
      setOpen((open) => !open)
    }
  }

  createEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })
  })

  return (
    <Dialog onOpenChange={setOpen} open={open()}>
      <AlertDialogTrigger<typeof Button>
        as={(props) => (
          <Button
            class='relative h-8 w-full justify-start bg-surface pl-2.5 font-normal text-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64 dark:bg-card'
            variant='secondary'
            {...props}>
            <span class='hidden lg:inline-flex'>
              Rechercher une référence...
            </span>
            <span class='inline-flex lg:hidden'>Rechercher...</span>
            <div class='absolute top-1.5 right-1.5 hidden gap-1 sm:flex'>
              <KbdGroup>
                <Kbd class='border'>⌘</Kbd>
                <Kbd class='border'>K</Kbd>
              </KbdGroup>
            </div>
          </Button>
        )}
      />
      <DialogPortal>
        <DialogContent
          class='rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800'
          showCloseButton={false}>
          <DialogHeader class='sr-only'>
            <DialogTitle>Rechercher une référence...</DialogTitle>
            <DialogDescription>
              Chercher une commande à exécuter...
            </DialogDescription>
          </DialogHeader>
          <Command class='rounded-none bg-transparent **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input]:py-0'>
            <CommandInput placeholder='Rechercher une référence...' />
            <CommandList class='no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5'>
              <CommandEmpty class='py-12 text-center text-muted-foreground text-sm'>
                Aucun résultat trouvé.
              </CommandEmpty>
              <For each={Object.entries(categoryMap)}>
                {([category, name]) => (
                  <CommandGroup
                    class='p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!'
                    heading={name}>
                    <For each={allDocs.filter((d) => d.category === category)}>
                      {(item) => {
                        return (
                          <CommandMenuItem
                            onSelect={() => {
                              runCommand(() =>
                                navigate(`/docs/${item._meta.path}`)
                              )
                            }}>
                            <svg
                              class='mr-2 h-4 w-4'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                clip-rule='evenodd'
                                d='M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z'
                                fill='currentColor'
                                fill-rule='evenodd'
                              />
                              <title>Doc</title>
                            </svg>

                            {item.title}
                          </CommandMenuItem>
                        )
                      }}
                    </For>
                  </CommandGroup>
                )}
              </For>
            </CommandList>
          </Command>
          <div class='absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 font-medium text-muted-foreground text-xs dark:border-t-neutral-700 dark:bg-neutral-800'>
            <div class='flex items-center gap-2'>
              <CommandKbd>
                <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <g
                    fill='none'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'>
                    <path d='M20 4v7a4 4 0 0 1-4 4H4' />
                    <path d='m9 10l-5 5l5 5' />
                  </g>
                </svg>
              </CommandKbd>{' '}
              Se rédiriger vers la page
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default CommandMenu
