'use client'

import type { ComponentProps } from 'solid-js'
import { cn } from '~/lib/utils'

function Table({ class: className, ...props }: ComponentProps<'table'>) {
  return (
    <div class='relative w-full overflow-x-auto' data-slot='table-container'>
      <table
        class={cn('w-full caption-bottom text-sm', className)}
        data-slot='table'
        {...props}
      />
    </div>
  )
}

function TableHeader({ class: className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      class={cn('[&_tr]:border-b', className)}
      data-slot='table-header'
      {...props}
    />
  )
}

function TableBody({ class: className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      class={cn('[&_tr:last-child]:border-0', className)}
      data-slot='table-body'
      {...props}
    />
  )
}

function TableFooter({ class: className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot
      class={cn(
        'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
        className
      )}
      data-slot='table-footer'
      {...props}
    />
  )
}

function TableRow({ class: className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      class={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      data-slot='table-row'
      {...props}
    />
  )
}

function TableHead({ class: className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      class={cn(
        'h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      data-slot='table-head'
      {...props}
    />
  )
}

function TableCell({ class: className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      class={cn(
        'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      data-slot='table-cell'
      {...props}
    />
  )
}

function TableCaption({
  class: className,
  ...props
}: ComponentProps<'caption'>) {
  return (
    <caption
      class={cn('mt-4 text-muted-foreground text-sm', className)}
      data-slot='table-caption'
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
