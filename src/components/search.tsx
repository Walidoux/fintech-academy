import { useNavigate } from '@solidjs/router'
import { allDocs } from 'content-collections'
import { BsArrowReturnLeft, BsCommand } from 'solid-icons/bs'
import { IoDocumentText } from 'solid-icons/io'
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
import { Kbd } from './ui/kbd'

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

  const placeholder = 'Chercher une référence...'

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
            class='relative h-8 w-40 cursor-pointer justify-start bg-surface pl-2.5 font-normal text-foreground shadow-none sm:pr-12 dark:bg-card'
            variant='outline'
            {...props}>
            <span class='text-muted-foreground text-xs'>
              {`${placeholder.split(' ')[0]}...`}
            </span>
            <Kbd class='absolute top-1/2 right-1.5 hidden -translate-y-1/2 gap-1 border sm:flex'>
              <BsCommand /> K
            </Kbd>
          </Button>
        )}
      />
      <DialogPortal>
        <DialogContent
          class='bg-clip-padding p-2 pb-11 shadow-2xl dark:bg-background/50 dark:backdrop-blur-lg'
          showCloseButton={false}>
          <DialogHeader class='sr-only'>
            <DialogTitle>{placeholder}</DialogTitle>
            <DialogDescription>
              Chercher une commande à exécuter...
            </DialogDescription>
          </DialogHeader>
          <Command class='rounded-none bg-transparent **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input]:py-0'>
            <CommandInput placeholder={placeholder} />
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
                            <IoDocumentText />
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
          <div class='absolute inset-x-0 bottom-0 z-20 flex h-10 select-none items-center gap-2 rounded-b-xl border-t px-4 font-medium text-muted-foreground text-xs'>
            <CommandKbd>
              <BsArrowReturnLeft />
            </CommandKbd>
            Se rédiriger vers la page
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default CommandMenu
