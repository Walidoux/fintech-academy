// Acts like a JSX factory for compiling MDX documents.

import { A } from '@solidjs/router'
import type { Component } from 'solid-js'

import { Typography as BaseTypography } from '~/components/base-typography'
import { Typography as CustomTypography } from '~/components/custom-typography'

// biome-ignore lint/suspicious/noExplicitAny: different components have different props
export const useMDXComponents: () => Record<string, Component<any>> = () => ({
  ...BaseTypography,
  ...CustomTypography,

  a: (props) => <A {...props} />,
  hr: (props) => <hr {...props} />,
  i: (props) => <i {...props} />,
  b: (props) => <b {...props} />,
  em: (props) => <em {...props} />,
  strong: (props) => <strong {...props} />,
  li: (props) => <li {...props} />,
  ol: (props) => <ol {...props} />,
  pre: (props) => <pre {...props} />,
})
