import { Root as SeparatorPrimitive } from '@kobalte/core/separator'
import { type ComponentProps, splitProps, type ValidComponent } from 'solid-js'
import { cn } from 'tailwind-variants'

type SeparatorProps<T extends ValidComponent = 'hr'> = ComponentProps<
  typeof SeparatorPrimitive<T>
>

export const Separator = <T extends ValidComponent = 'hr'>(
  props: SeparatorProps<T>
) => {
  const [, rest] = splitProps(props as SeparatorProps, ['class'])

  return (
    <SeparatorPrimitive
      class={cn(
        'shrink-0 border-none bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
        props.class
      )}
      data-slot='separator'
      {...rest}
    />
  )
}
