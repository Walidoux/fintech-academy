import { createMemo, mergeProps } from 'solid-js'
import {
  COLOR_MODE_STORAGE_KEY,
  type ColorModeScriptProps,
  type ConfigColorMode,
  FALLBACK_COLOR_MODE_VALUE,
} from '~/lib/store'

const VALID_VALUES = new Set<ConfigColorMode>(['light', 'dark', 'system'])

/**
 * runtime safe-guard against invalid color mode values
 */
function normalize(initialColorMode: ConfigColorMode) {
  if (!VALID_VALUES.has(initialColorMode)) {
    return FALLBACK_COLOR_MODE_VALUE
  }

  return initialColorMode
}

export function ColorModeScript(props: ColorModeScriptProps) {
  const mergedProps = mergeProps(
    {
      initialColorMode: FALLBACK_COLOR_MODE_VALUE,
      storageType: 'localStorage',
      storageKey: COLOR_MODE_STORAGE_KEY,
    } as ColorModeScriptProps,
    props
  )

  const scriptSrc = createMemo(() => {
    // runtime safe-guard against invalid color mode values
    const init = normalize(mergedProps.initialColorMode as ConfigColorMode)

    const cookieScript = `(function(){try{var a=function(o){var l="(prefers-color-scheme: dark)",v=window.matchMedia(l).matches?"dark":"light",e=o==="system"?v:o,d=document.documentElement,s=e==="dark";return d.style.colorScheme=e,d.dataset.kbTheme=e,o},u=a,h="${init}",r="${mergedProps.storageKey}",t=document.cookie.match(new RegExp("(^| )".concat(r,"=([^;]+)"))),c=t?t[2]:null;c?a(c):document.cookie="".concat(r,"=").concat(a(h),"; max-age=31536000; path=/")}catch(a){}})();`

    const localStorageScript = `(function(){try{var a=function(c){var v="(prefers-color-scheme: dark)",h=window.matchMedia(v).matches?"dark":"light",r=c==="system"?h:c,o=document.documentElement,i=r==="dark";return o.style.colorScheme=r,o.dataset.kbTheme=r,c},n=a,m="${init}",e="${mergedProps.storageKey}",t=localStorage.getItem(e);t?a(t):localStorage.setItem(e,a(m))}catch(a){}})();`

    const fn =
      mergedProps.storageType === 'cookie' ? cookieScript : localStorageScript

    return `!${fn}`.trim()
  })

  return (
    <script
      id={`${COLOR_MODE_STORAGE_KEY}-script`}
      innerHTML={scriptSrc()}
      nonce={mergedProps.nonce}
    />
  )
}
