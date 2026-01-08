import { NAV_HEIGHT } from '~/lib/store'
import { ThemeSwitcher } from './theme-switcher'

export const Navbar = () => {
  return (
    <nav class='border-b' style={{ height: `${NAV_HEIGHT}px` }}>
      <div class='mx-auto flex h-full max-w-6xl items-center justify-between px-3 py-2'>
        <img
          alt='Logo'
          class='select-none'
          draggable={false}
          height={50}
          src={import.meta.env.SERVER_BASE_URL.concat('logo.svg')}
          width={50}
        />
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
