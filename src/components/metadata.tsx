import { Meta, Title } from '@solidjs/meta'
import { createMemo } from 'solid-js'

import { APP } from '../lib/store'

interface MetadataProps {
  title: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
  noIndex?: boolean
  structuredData?: Record<string, unknown>
}

export const Metadata = (props: MetadataProps) => {
  const fullTitle = createMemo(() => `${props.title} | ${APP.LONG_NAME}`)

  const metaDescription = createMemo(() => props.description ?? APP.DESCRIPTION)

  const canonicalUrl = createMemo(() => {
    if (props.canonicalUrl) {
      return props.canonicalUrl
    }
    // Default to current URL if not provided
    if (typeof window !== 'undefined') {
      return window.location.href
    }
    return APP.HOME_PAGE
  })

  const ogImage = createMemo(() => props.ogImage ?? APP.OG_IMAGE_URL)

  const twitterCard = createMemo(
    () => props.twitterCard ?? 'summary_large_image'
  )

  const ogType = createMemo(() => props.ogType ?? 'website')

  return (
    <>
      {/* Basic Meta Tags */}
      <Title>{fullTitle()}</Title>
      <Meta content={metaDescription()} name='description' />
      <Meta content={APP.AUTHOR} name='author' />
      {props.keywords && props.keywords.length > 0 && (
        <Meta content={props.keywords.join(', ')} name='keywords' />
      )}
      <Meta content='width=device-width, initial-scale=1' name='viewport' />

      {/* Canonical URL */}
      <link href={canonicalUrl()} rel='canonical' />

      {/* Robots */}
      {props.noIndex && <Meta content='noindex, nofollow' name='robots' />}

      {/* Open Graph */}
      <Meta content={fullTitle()} property='og:title' />
      <Meta content={metaDescription()} property='og:description' />
      <Meta content={canonicalUrl()} property='og:url' />
      <Meta content={ogType()} property='og:type' />
      <Meta content={APP.LONG_NAME} property='og:site_name' />
      <Meta content={ogImage()} property='og:image' />
      <Meta content={metaDescription()} property='og:image:alt' />
      <Meta content='1200' property='og:image:width' />
      <Meta content='630' property='og:image:height' />
      <Meta content='image/jpeg' property='og:image:type' />

      {/* Twitter Card */}
      <Meta content={twitterCard()} name='twitter:card' />
      <Meta content={fullTitle()} name='twitter:title' />
      <Meta content={metaDescription()} name='twitter:description' />
      <Meta content={ogImage()} name='twitter:image' />
      <Meta content={APP.AUTHOR} name='twitter:creator' />
      <Meta content={APP.LONG_NAME} name='twitter:site' />

      {/* Article specific meta (when og:type is article) */}
      {ogType() === 'article' && (
        <>
          {props.author && (
            <Meta content={props.author} property='article:author' />
          )}
          {props.publishedTime && (
            <Meta
              content={props.publishedTime}
              property='article:published_time'
            />
          )}
          {props.modifiedTime && (
            <Meta
              content={props.modifiedTime}
              property='article:modified_time'
            />
          )}
          {props.keywords && props.keywords.length > 0 && (
            <Meta content={props.keywords.join(',')} property='article:tag' />
          )}
        </>
      )}

      {/* Structured Data (JSON-LD) */}
      {props.structuredData && (
        <script type='application/ld+json'>
          {JSON.stringify(props.structuredData)}
        </script>
      )}

      {/* Favicon */}
      <link href='/favicon.ico' rel='icon' />
      <link href='/favicon.ico' rel='icon' sizes='any' />
      <link href='/favicon.ico' rel='icon' type='image/x-icon' />
    </>
  )
}

// Alias for backward compatibility and new usage
export const SEO = Metadata
