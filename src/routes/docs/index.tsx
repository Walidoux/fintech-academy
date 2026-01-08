import { Meta, Title } from '@solidjs/meta'
import type { RouteSectionProps } from '@solidjs/router'

import MDXContent from '~/content/pages/introduction.mdx'
import { APP_NAME } from '~/lib/store'

export default function IntroductionPage(_props: RouteSectionProps) {
  return (
    <>
      <Title>Introduction | {APP_NAME.LONG}</Title>
      <Meta
        content='Collection of beautiful UI components for SolidJS that work with Tailwind and PandaCSS, an unofficial port of magic ui to solidjs.'
        name='description'
      />
      <MDXContent />
    </>
  )
}
