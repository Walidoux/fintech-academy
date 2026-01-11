import { TbDeviceDesktop, TbMoon, TbSun } from 'solid-icons/tb'
import { createSignal, type JSXElement, onMount } from 'solid-js'
import type { ConfigColorMode, MaybeConfigColorMode } from '~/lib/store'
import { COLOR_MODE_STORAGE_KEY } from '~/lib/store'
import { useColorMode } from './theme/color-mode-context'
import { Select } from './ui/select'

interface ThemeOption {
  value: ConfigColorMode
  label: string
  icon: (clazz: string) => JSXElement
}

function parseCookie(): MaybeConfigColorMode {
  const match = document.cookie.match(
    new RegExp(`(^| )${COLOR_MODE_STORAGE_KEY}=([^;]+)`)
  )
  return match?.[2] as MaybeConfigColorMode
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (clazz: string) => <TbSun class={clazz} size={18} />,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (clazz: string) => <TbMoon class={clazz} size={18} />,
  },
  {
    value: 'system',
    label: 'System',
    icon: (clazz: string) => <TbDeviceDesktop class={clazz} size={18} />,
  },
]

export const ThemeSwitcher = () => {
  const { setColorMode } = useColorMode()
  const [selectedTheme, setSelectedTheme] = createSignal<ThemeOption>()

  onMount(() => {
    setSelectedTheme(
      THEME_OPTIONS.find((option) => option.value === parseCookie())
    )
  })

  return (
    <Select<ThemeOption>
      gutter={8}
      itemComponent={(props) => (
        <Select.Item
          class='flex cursor-default items-center space-x-2 ui-highlighted:bg-zinc-100 px-3 py-1 text-sm ui-selected:text-sky-700 outline-none transition-colors dark:ui-highlighted:bg-zinc-700 dark:ui-selected:text-sky-400'
          item={props.item}>
          {props.item.rawValue.icon('h-4 w-4')}
          <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
        </Select.Item>
      )}
      onChange={(option) => {
        if (option) {
          setSelectedTheme(option)
          setColorMode(option.value)
        }
      }}
      options={THEME_OPTIONS}
      optionTextValue='label'
      optionValue='value'
      placement='bottom'
      sameWidth={false}
      value={selectedTheme() ?? THEME_OPTIONS[0]}>
      <Select.Trigger
        aria-label='toggle color mode'
        class='flex cursor-pointer items-center justify-center p-2.5 text-foreground outline-none'>
        <Select.Value<ThemeOption>>
          {(state) => state.selectedOption().icon('h-5 w-5')}
        </Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class='z-50 select-none rounded border border-border bg-background py-1 shadow-md'>
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  )
}
