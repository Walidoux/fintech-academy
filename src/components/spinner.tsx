import { cn } from 'tailwind-variants'

export const Spinner = ({
  size = 16,
  class: className,
}: Partial<{ size: number; class: string }>) => {
  return (
    <svg
      class={cn('animate-spin', className)}
      height={size}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'>
      <title>Spinner</title>
      <path
        d='M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9'
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
      />
    </svg>
  )
}
