import type { CheckboxControlProps } from '@kobalte/core/checkbox'
import { Checkbox as CheckboxPrimitive } from '@kobalte/core/checkbox'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import { splitProps, type ValidComponent, type VoidProps } from 'solid-js'
import { cn } from 'tailwind-variants'

export const CheckboxLabel = CheckboxPrimitive.Label
export const Checkbox = CheckboxPrimitive
export const CheckboxErrorMessage = CheckboxPrimitive.ErrorMessage
export const CheckboxDescription = CheckboxPrimitive.Description

type checkboxControlProps<T extends ValidComponent = 'div'> = VoidProps<
  CheckboxControlProps<T> & { class?: string }
>

export const CheckboxControl = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, checkboxControlProps<T>>
) => {
  const [local, rest] = splitProps(props as checkboxControlProps, [
    'class',
    'children',
  ])

  return (
    <>
      <CheckboxPrimitive.Input class='[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-[1.5px] [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-offset-background' />
      <CheckboxPrimitive.Control
        class={cn(
          'h-4 w-4 shrink-0 rounded-sm border border-primary shadow transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-disabled:cursor-not-allowed data-checked:bg-primary data-checked:text-primary-foreground data-disabled:opacity-50',
          local.class
        )}
        {...rest}>
        <CheckboxPrimitive.Indicator class='flex items-center justify-center text-current'>
          <svg
            class='h-4 w-4'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='m5 12l5 5L20 7'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
            />
            <title>Checkbox</title>
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
    </>
  )
}
