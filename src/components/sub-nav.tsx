import { toaster } from '@kobalte/core/toast'
import { A, type Location } from '@solidjs/router'
import { BsPen } from 'solid-icons/bs'
import { TbCircleCheck } from 'solid-icons/tb'
import { createMemo, For, Show } from 'solid-js'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumbs'
import { sanitizeSlug } from '~/lib/utils'
import { internships } from './side-nav'
import { Button } from './ui/button'
import { Toast, ToastContent, ToastDescription, ToastTitle } from './ui/toast'

export function SubNav<T>(props: Partial<Location<T>>) {
  const segments = props.pathname?.split('/').filter(Boolean)

  segments?.shift()

  if ((segments?.length as number) <= 1) {
    return null
  }

  const constructSegment = (seg: string, idx: number) => {
    if (idx === 0) {
      return `/${seg}`
    }
    return `/${segments?.slice(0, idx + 1).join('/')}`
  }

  const redirectSrcFile = createMemo(() => {
    const segments = props.pathname?.split('/').filter(Boolean)
    const IDE = 'zed://file'
    const srcDir = IDE.concat(import.meta.env.CWD).concat('/src/content')

    segments?.shift()

    let docDir = segments?.join('/')

    console.log(docDir)
    if (
      internships[0].links.find((link) => link.href.includes(docDir as string))
    ) {
      docDir = docDir?.concat('/index')
    }

    docDir = docDir?.replace('docs', 'pages')

    return `${srcDir}/${docDir}.mdx`
  })

  const showToastRedirection = () => {
    toaster.show((props) => (
      <Toast toastId={props.toastId}>
        <ToastContent>
          <TbCircleCheck class='row-span-2 my-auto text-primary' size={24} />
          <ToastTitle>Document ouvert</ToastTitle>
          <ToastDescription>
            Consultez-le depuis votre IDE si ce dernier est ouvert.
          </ToastDescription>
        </ToastContent>
      </Toast>
    ))
  }

  return (
    <nav class='flex items-center justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <For each={segments}>
            {(segment, idx) => {
              return (
                <>
                  {/* TODO: if pathname has more than 5 segments add <BreadcrumbEllipsis /> at pos 1 of array index */}
                  <BreadcrumbItem>
                    <BreadcrumbLink href={constructSegment(segment, idx())}>
                      {sanitizeSlug(segment)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <Show when={segments?.[idx() + 1]}>
                    <BreadcrumbSeparator />
                  </Show>
                </>
              )
            }}
          </For>
        </BreadcrumbList>
      </Breadcrumb>
      <Show when={process.env.NODE_ENV === 'development'}>
        <Button onClick={showToastRedirection} variant='outline'>
          <A class='inline-flex items-center gap-x-2' href={redirectSrcFile()}>
            <BsPen />
            Modifier
          </A>
        </Button>
      </Show>
    </nav>
  )
}
