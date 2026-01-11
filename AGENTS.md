# AGENTS.md - Development Guidelines for Fintech Academy

This document provides essential information for agentic coding assistants working on the Fintech Academy project. Follow these guidelines to maintain consistency and quality.

## 🚀 Build, Lint, and Test Commands

### Core Commands

- **Development server**: `bun run dev`
- **Production build**: `bun run build`
- **Start production server**: `bun run start`

### Code Quality

- **Format code**: `bun run format` (Biome formatter)
- **Lint code**: `bun run lint` (Biome linter)
- **Type check**: `bun run check` (Biome checker)

## 🎨 Code Style Guidelines

### TypeScript & JavaScript

- **Strict TypeScript**: Enabled with `strict: true` in tsconfig.json
- **Import organization**:
  1. External libraries (solid-js, @solidjs/router, etc.)
  2. UI libraries (@kobalte/core, solid-icons)
  3. Utility libraries (clsx, tailwind-variants)
  4. Relative imports with path aliases (`~/lib/store`)

- **Quotes**: Single quotes for strings and JSX attributes
- **Semicolons**: Use `asNeeded` (Biome default)
- **JSX**: `bracketSameLine: true` for cleaner formatting

### Naming Conventions

- **Components**: PascalCase (e.g., `Navbar`, `ThemeSwitcher`)
- **Functions**: camelCase (e.g., `capitalize`, `createSignal`)
- **Variables**: camelCase (e.g., `status`, `sideNavOpen`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `NAV_HEIGHT`, `APP`)
- **Types/Interfaces**: PascalCase (e.g., `StatusType`, `ButtonRootProps`)
- **Files**: kebab-case for components (e.g., `theme-switcher.tsx`)

### Component Patterns

- **SolidJS signals**: Use `createSignal` for reactive state
- **Effects**: Use `createEffect` for side effects
- **Conditional rendering**: Use `<Show>` component
- **Event handlers**: camelCase with `on` prefix (e.g., `onClick`)
- **Props destructuring**: Use `splitProps` for component props
- **Styling**: Combine Tailwind classes with `cn()` utility

### Error Handling

- **Async operations**: Use try/catch with `.catch()` for promises
- **Network requests**: Handle errors gracefully with user feedback
- **Validation**: TypeScript strict mode prevents most runtime errors
- **Logging**: Use console methods appropriately (avoid in production)

### Imports & Dependencies

- **Path aliases**: Use `~/*` for src directory imports
- **External imports**: Group by category (SolidJS, UI, utilities)
- **Type imports**: Use `import type` for TypeScript types
- **Barrel exports**: Prefer named exports over default exports

## 🎯 Framework-Specific Guidelines

### SolidJS Patterns
```tsx
// ✅ Good: Proper signal usage
const [count, setCount] = createSignal(0)

// ✅ Good: Effect for side effects
createEffect(() => {
  console.log('Count changed:', count())
})

// ✅ Good: Conditional rendering
<Show when={count() > 0}>
  <div>Count: {count()}</div>
</Show>
```

### Tailwind CSS

- **Custom design system**: Uses OKLCH color space with CSS custom properties
- **Utility classes**: Prefer Tailwind utilities over custom CSS
- **Component variants**: Use `tailwind-variants` for component styling
- **Responsive design**: Use responsive prefixes (sm:, md:, lg:)
- **Dark mode**: Automatic support via CSS custom properties

### shadcn/ui Components

- **Base components**: Built on @kobalte/core primitives
- **Variants**: Use predefined variants (default, destructive, outline, etc.)
- **Sizes**: Consistent sizing system (sm, default, lg, icon)
- **Polymorphic components**: Support different HTML elements
- **Accessibility**: Built-in ARIA attributes and keyboard navigation

### MDX Content

- **Content collections**: @content-collections/core is a type-safe data collections library that stores docs globally under content-collections.ts and is used to import and render dynamically by importing MDX files from src/docs
- **Math support**: KaTeX and remark-math for mathematical expressions
- **Mermaid diagrams**: Integrated diagram support
- **Custom components**: Extend with SolidJS components in MDX
- **JSX expressions**: Dynamic evaluation of {APP.PROPERTY_NAME} expressions in content (e.g., {APP.LONG_NAME} → "Fintech Academy")
- **Build-time heading extraction**: Automatic TOC generation with proper slug creation and JSX expression evaluation
- **Reactive TOC**: Table of Contents updates dynamically during client-side navigation

### SEO Implementation

- **Comprehensive SEO Suite**: Full implementation including meta tags, Open Graph, Twitter Cards, structured data, and technical SEO
- **Dynamic Meta Tags**: Page-specific titles, descriptions, and metadata from MDX frontmatter
- **Open Graph & Twitter Cards**: Social sharing optimization with proper images and metadata
- **Structured Data**: JSON-LD Article schema for documentation pages
- **Canonical URLs**: Automatic canonical URL generation for all pages
- **XML Sitemap**: Auto-generated sitemap.xml with all documentation routes
- **Robots.txt**: Proper crawler directives with sitemap reference
- **Reactive SEO**: Updates metadata during client-side navigation
- **API Routes**: `/api/sitemap.xml` and `/api/robots.txt` for dynamic SEO files

## 📁 Project Structure

```
src/
├── app.tsx                 # Main app component
├── entry-client.tsx        # Client entry point
├── entry-server.tsx        # Server entry point
├── global.d.ts            # Global type definitions
├── app.css                # Main stylesheet
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── metadata.tsx      # Comprehensive SEO component
│   └── *.tsx             # Custom components
├── routes/               # File-based routing
│   ├── api/              # SEO API routes
│   │   ├── robots.txt.ts # Robots.txt generation
│   │   └── sitemap.xml.ts # XML sitemap generation
│   └── docs/[...path].tsx # Dynamic MDX route with SEO
├── docs/                 # MDX content files
├── lib/                  # Utilities and stores
│   └── store.ts          # APP constants for JSX evaluation
└── providers/            # Context providers
```

## 🔧 Configuration Files

### Biome (biome.jsonc)

- Extends `ultracite/biome/core`
- Custom rules:
  - `a11y.useFocusableInteractive`: off
  - `a11y.useSemanticElements`: off
  - `suspicious.noUnassignedVariables`: off
- Single quotes, JSX same line brackets, semicolons as needed

### TypeScript (tsconfig.json)

- Target: ESNext
- JSX: preserve (for SolidJS)
- Strict mode enabled
- Path aliases: `~/*` → `./src/*`

### Tailwind (tailwind.config.ts)

- Custom content paths: `src/**/*.{ts,tsx,css}`
- tailwindcss-animate plugin
- Minimal configuration (relies on CSS custom properties)

### shadcn/ui (components.json)

- Style: base-lyra
- Icon library: lucide
- RSC: false (SolidJS, not React)
- TSX: true
- Path aliases configured

## 🚀 Deployment

### GitHub Pages

- Build preset: `NITRO_PRESET=github_pages`
- Output directory: `.output/public`
- Trigger: Push to main branch or manual dispatch
- Uses Bun for faster builds

### Environment Variables

- `SERVER_BASE_URL`: Base URL for routing
- Development vs production handling with `process.env.NODE_ENV`

### Build-Time Optimizations

- **Content Collections**: Type-safe MDX processing with heading extraction and JSX evaluation
- **SEO Generation**: Automatic sitemap.xml and robots.txt generation
- **TOC Integration**: Build-time heading extraction with reactive client-side updates
- **JSX Expression Evaluation**: Dynamic content processing for APP constants in MDX
- **Content Collections Transform**: Automatic metadata extraction from MDX frontmatter and headings

## 📋 Development Workflow

### Planning and Research

When planning new features or implementations, use `grep_app_searchGitHub` MCP server tools to benchmark existing implementations in GitHub public repositories. Analyze patterns, identify the most recent or relevant approaches, and adapt best practices from the community.

### Before Committing

1. Run `bun run check` for type checking
2. Run `bun run lint` for linting
3. Run `bun run format` for code formatting
4. Test build: `bun run build`

### Component Development

1. Use shadcn/ui components as base when possible
2. Follow existing patterns for props and variants
3. Include proper TypeScript types
4. Add accessibility attributes
5. Test responsiveness and dark mode

### Content Development

1. Use MDX for rich content with math and diagrams
2. Follow existing directory structure in `docs/`
3. Use content collections for type safety
4. Test rendering in development mode

### State Management

- Use `@tanstack/solid-store` for global state
- Prefer local signals for component state
- Use context providers for shared state
- Follow reactive programming patterns

## 🔍 Troubleshooting

### Common Issues

- **Import errors**: Check path aliases and file extensions
- **Type errors**: Ensure proper TypeScript types and interfaces
- **Styling issues**: Verify Tailwind classes and custom properties
- **Build failures**: Check Biome rules and configuration

### GitHub CLI Workflow Commands

**Essential Commands for CI/CD Monitoring:**

```bash
# Check workflow status
gh run list --workflow='Deploy SolidStart to GitHub Pages' --limit 3

# Watch workflow in real-time
gh run watch <run-id> --interval 5

# View detailed workflow logs
gh run view <run-id> --log

# View failed job logs only
gh run view <run-id> --log-failed

# Cancel stuck workflow
gh run cancel <run-id>

# Re-run failed workflow
gh run rerun <run-id>
```

**Common Workflow Patterns:**

1. **Monitor Deployment**: `gh run watch $(gh run list --workflow='Deploy*' -L1 --json databaseId --jq '.[0].databaseId')`
2. **Check Build Status**: `gh run list --workflow='Deploy*' --json status,conclusion,updatedAt --jq '.[] | "\(.status) \(.conclusion) \(.updatedAt)"'`
3. **View Recent Failures**: `gh run list --workflow='Deploy*' --json conclusion,databaseId | jq -r '.[] | select(.conclusion == "failure") | .databaseId' | head -3`

### Global Development Patterns

**SEO Implementation Workflow:**
1. **Research**: Use `grep_app_searchGitHub` to benchmark existing implementations
2. **Analyze**: Compare approaches (e.g., solid-start-sitemap vs. custom implementation)
3. **Plan**: Create comprehensive plan with phases and priorities
4. **Implement**: Build-time extraction, reactive components, API routes
5. **Test**: Chrome DevTools validation, GitHub CLI monitoring
6. **Optimize**: Cache tuning, performance monitoring

**Cache Optimization Steps:**
1. **Identify Issue**: Check cache logs for "Cache not found" messages
2. **Validate Keys**: Ensure `hashFiles('**/bun.lock')` matches actual file
3. **Simplify Paths**: Remove conflicting paths (e.g., node_modules with Bun)
4. **Test Caching**: Verify cache hits on subsequent runs
5. **Monitor Performance**: Track dependency install time improvements

**Deployment Monitoring Pattern:**
1. **Trigger**: Push to main or manual workflow dispatch
2. **Monitor**: `gh run watch <run-id>` for real-time status
3. **Validate**: Check cache hits, build times, quality gates
4. **Debug**: Use `gh run view --log` for detailed analysis
5. **Verify**: Confirm successful GitHub Pages deployment

**Performance Benchmarking:**
- **Before**: ~45s dependency install, cache misses
- **After**: ~8.60s dependency install, 100% cache hit rate
- **Improvement**: 81% faster builds, 60% cost reduction

### Debugging

**IMPORTANT**: Never run `bun run dev` - there is always an open dev server running on port 3000.

The local server URL is `http://localhost:3000/fintech-academy`, where `fintech-academy` is the baseUrl explicitly set due to the GitHub Pages preset in `app.config.ts`.

- Use chrome-devtools MCP tools for debugging:
  - Get console messages with `chrome-devtools_list_console_messages`
  - Monitor network requests with `chrome-devtools_list_network_requests`
  - Take screenshots with `chrome-devtools_take_screenshot`
  - Inspect page content with `chrome-devtools_take_snapshot`
- Use SolidJS dev tools for reactive debugging
- Check browser console for runtime errors
- Use `console.log` strategically (remove before commit)
- Test in both light and dark themes

## 📚 SolidJS Documentation

# SolidJS Documentation
> Solid is a JavaScript library built around signals. It prioritizes a simple and predictable development experience, making it a great choice for developers of all skill levels. These are the documention for the main official projects.
> - SolidJS: The core library for building reactive user interfaces.
> - SolidStart: A full-stack framework for building web applications.
> - Solid Router: A routing library for building web applications.
> - Solid Meta: A library for managing the HTML head and meta tags.

## SolidJS

- [Overview](https://docs.solidjs.com/)
- [Quick start](https://docs.solidjs.com/quick-start)
- [Intro to reactivity](https://docs.solidjs.com/concepts/intro-to-reactivity)
- [Understanding JSX](https://docs.solidjs.com/concepts/understanding-jsx)
- [Basics](https://docs.solidjs.com/concepts/components/basics)
- [Class and style](https://docs.solidjs.com/concepts/components/class-style)
- [Event handlers](https://docs.solidjs.com/concepts/components/event-handlers)
- [Props](https://docs.solidjs.com/concepts/components/props)
- [Signals](https://docs.solidjs.com/concepts/signals)
- [Conditional rendering](https://docs.solidjs.com/concepts/control-flow/conditional-rendering)
- [Dynamic](https://docs.solidjs.com/concepts/control-flow/dynamic)
- [List rendering](https://docs.solidjs.com/concepts/control-flow/list-rendering)
- [Portal](https://docs.solidjs.com/concepts/control-flow/portal)
- [Error boundary](https://docs.solidjs.com/concepts/control-flow/error-boundary)
- [Effects](https://docs.solidjs.com/concepts/effects)
- [Derived signals](https://docs.solidjs.com/concepts/derived-values/derived-signals)
- [Memos](https://docs.solidjs.com/concepts/derived-values/memos)
- [Context](https://docs.solidjs.com/concepts/context)
- [Stores](https://docs.solidjs.com/concepts/stores)
- [Refs](https://docs.solidjs.com/concepts/refs)
- [Fine-grained reactivity](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity)
- [Styling your components](https://docs.solidjs.com/guides/styling-your-components)
- [SASS](https://docs.solidjs.com/guides/styling-components/sass)
- [LESS](https://docs.solidjs.com/guides/styling-components/less)
- [CSS modules](https://docs.solidjs.com/guides/styling-components/css-modules)
- [Macaron](https://docs.solidjs.com/guides/styling-components/macaron)
- [Tailwind CSS](https://docs.solidjs.com/guides/styling-components/tailwind)
- [UnoCSS](https://docs.solidjs.com/guides/styling-components/uno)
- [State management](https://docs.solidjs.com/guides/state-management)
- [Routing & navigation](https://docs.solidjs.com/guides/routing-and-navigation)
- [Complex state management](https://docs.solidjs.com/guides/complex-state-management)
- [Fetching data](https://docs.solidjs.com/guides/fetching-data)
- [Testing](https://docs.solidjs.com/guides/testing)
- [Deploy your app](https://docs.solidjs.com/guides/deploying-your-app)
- [AWS via Flightcontrol](https://docs.solidjs.com/guides/deployment-options/aws-via-flightcontrol)
- [AWS via SST](https://docs.solidjs.com/guides/deployment-options/aws-via-sst)
- [Cloudflare](https://docs.solidjs.com/guides/deployment-options/cloudflare)
- [Firebase](https://docs.solidjs.com/guides/deployment-options/firebase)
- [Netlify](https://docs.solidjs.com/guides/deployment-options/netlify)
- [Railway](https://docs.solidjs.com/guides/deployment-options/railway)
- [Vercel](https://docs.solidjs.com/guides/deployment-options/vercel)
- [Stormkit](https://docs.solidjs.com/guides/deployment-options/stormkit)
- [Zerops](https://docs.solidjs.com/guides/deployment-options/zerops)
- [Environment variables](https://docs.solidjs.com/configuration/environment-variables)
- [TypeScript](https://docs.solidjs.com/configuration/typescript)
- [createEffect](https://docs.solidjs.com/reference/basic-reactivity/create-effect)
- [createMemo](https://docs.solidjs.com/reference/basic-reactivity/create-memo)
- [createResource](https://docs.solidjs.com/reference/basic-reactivity/create-resource)
- [createSignal](https://docs.solidjs.com/reference/basic-reactivity/create-signal)
- [children](https://docs.solidjs.com/reference/component-apis/children)
- [createContext](https://docs.solidjs.com/reference/component-apis/create-context)
- [createUniqueId](https://docs.solidjs.com/reference/component-apis/create-unique-id)
- [lazy](https://docs.solidjs.com/reference/component-apis/lazy)
- [useContext](https://docs.solidjs.com/reference/component-apis/use-context)
- [<Dynamic>](https://docs.solidjs.com/reference/components/dynamic)
- [<ErrorBoundary>](https://docs.solidjs.com/reference/components/error-boundary)
- [<For>](https://docs.solidjs.com/reference/components/for)
- [<Index>](https://docs.solidjs.com/reference/components/index-component)
- [<NoHydration>](https://docs.solidjs.com/reference/components/no-hydration)
- [<Portal>](https://docs.solidjs.com/reference/components/portal)
- [<Show>](https://docs.solidjs.com/reference/components/show)
- [<Suspense>](https://docs.solidjs.com/reference/components/suspense)
- [<SuspenseList>](https://docs.solidjs.com/reference/components/suspense-list)
- [<Switch> / <Match>](https://docs.solidjs.com/reference/components/switch-and-match)
- [@once](https://docs.solidjs.com/reference/jsx-attributes/once)
- [attr:*](https://docs.solidjs.com/reference/jsx-attributes/attr)
- [bool:*](https://docs.solidjs.com/reference/jsx-attributes/bool)
- [classList](https://docs.solidjs.com/reference/jsx-attributes/classlist)
- [innerHTML](https://docs.solidjs.com/reference/jsx-attributes/innerhtml)
- [on:*](https://docs.solidjs.com/reference/jsx-attributes/on)
- [on*](https://docs.solidjs.com/reference/jsx-attributes/on_)
- [prop:*](https://docs.solidjs.com/reference/jsx-attributes/prop)
- [ref](https://docs.solidjs.com/reference/jsx-attributes/ref)
- [style](https://docs.solidjs.com/reference/jsx-attributes/style)
- [textContent](https://docs.solidjs.com/reference/jsx-attributes/textcontent)
- [use:*](https://docs.solidjs.com/reference/jsx-attributes/use)
- [onCleanup](https://docs.solidjs.com/reference/lifecycle/on-cleanup)
- [onMount](https://docs.solidjs.com/reference/lifecycle/on-mount)
- [batch](https://docs.solidjs.com/reference/reactive-utilities/batch)
- [catchError](https://docs.solidjs.com/reference/reactive-utilities/catch-error)
- [createRoot](https://docs.solidjs.com/reference/reactive-utilities/create-root)
- [from](https://docs.solidjs.com/reference/reactive-utilities/from)
- [getOwner](https://docs.solidjs.com/reference/reactive-utilities/get-owner)
- [indexArray](https://docs.solidjs.com/reference/reactive-utilities/index-array)
- [mapArray](https://docs.solidjs.com/reference/reactive-utilities/map-array)
- [mergeProps](https://docs.solidjs.com/reference/reactive-utilities/merge-props)
- [observable](https://docs.solidjs.com/reference/reactive-utilities/observable)
- [on](https://docs.solidjs.com/reference/reactive-utilities/on-util)
- [runWithOwner](https://docs.solidjs.com/reference/reactive-utilities/run-with-owner)
- [splitProps](https://docs.solidjs.com/reference/reactive-utilities/split-props)
- [startTransition](https://docs.solidjs.com/reference/reactive-utilities/start-transition)
- [untrack](https://docs.solidjs.com/reference/reactive-utilities/untrack)
- [useTransition](https://docs.solidjs.com/reference/reactive-utilities/use-transition)
- [DEV](https://docs.solidjs.com/reference/rendering/dev)
- [hydrate](https://docs.solidjs.com/reference/rendering/hydrate)
- [hydrationScript](https://docs.solidjs.com/reference/rendering/hydration-script)
- [isServer](https://docs.solidjs.com/reference/rendering/is-server)
- [render](https://docs.solidjs.com/reference/rendering/render)
- [renderToStream](https://docs.solidjs.com/reference/rendering/render-to-stream)
- [renderToString](https://docs.solidjs.com/reference/rendering/render-to-string)
- [renderToStringAsync](https://docs.solidjs.com/reference/rendering/render-to-string-async)
- [createComputed](https://docs.solidjs.com/reference/secondary-primitives/create-computed)
- [createDeferred](https://docs.solidjs.com/reference/secondary-primitives/create-deferred)
- [createReaction](https://docs.solidjs.com/reference/secondary-primitives/create-reaction)
- [createRenderEffect](https://docs.solidjs.com/reference/secondary-primitives/create-render-effect)
- [createSelector](https://docs.solidjs.com/reference/secondary-primitives/create-selector)
- [createMutable](https://docs.solidjs.com/reference/store-utilities/create-mutable)
- [createStore](https://docs.solidjs.com/reference/store-utilities/create-store)
- [modifyMutable](https://docs.solidjs.com/reference/store-utilities/modify-mutable)
- [produce](https://docs.solidjs.com/reference/store-utilities/produce)
- [reconcile](https://docs.solidjs.com/reference/store-utilities/reconcile)
- [unwrap](https://docs.solidjs.com/reference/store-utilities/unwrap)
- [getRequestEvent](https://docs.solidjs.com/reference/server-utilities/get-request-event)

## SolidStart

- [Overview](https://docs.solidjs.com/solid-start/)
- [Getting started](https://docs.solidjs.com/solid-start/getting-started)
- [Routing](https://docs.solidjs.com/solid-start/building-your-application/routing)
- [API routes](https://docs.solidjs.com/solid-start/building-your-application/api-routes) - Used for dynamic SEO file generation (sitemap.xml, robots.txt)
- [CSS and styling](https://docs.solidjs.com/solid-start/building-your-application/css-and-styling)
- [Data fetching](https://docs.solidjs.com/solid-start/building-your-application/data-fetching)
- [Data mutation](https://docs.solidjs.com/solid-start/building-your-application/data-mutation)
- [Head and metadata](https://docs.solidjs.com/solid-start/building-your-application/head-and-metadata)
- [Route Pre-rendering](https://docs.solidjs.com/solid-start/building-your-application/route-prerendering)
- [Static assets](https://docs.solidjs.com/solid-start/building-your-application/static-assets)
- [Middleware](https://docs.solidjs.com/solid-start/advanced/middleware)
- [Sessions](https://docs.solidjs.com/solid-start/advanced/session)
- [Request events](https://docs.solidjs.com/solid-start/advanced/request-events)
- [Returning responses](https://docs.solidjs.com/solid-start/advanced/return-responses)
- [Auth](https://docs.solidjs.com/solid-start/advanced/auth)
- [WebSocket endpoint](https://docs.solidjs.com/solid-start/advanced/websocket)
- [Security](https://docs.solidjs.com/solid-start/guides/security)
- [Data fetching](https://docs.solidjs.com/solid-start/guides/data-fetching)
- [Data mutation](https://docs.solidjs.com/solid-start/guides/data-mutation)
- [Service workers](https://docs.solidjs.com/solid-start/guides/service-workers)
- [app.config.ts](https://docs.solidjs.com/solid-start/reference/entrypoints/app-config)
- [app.tsx](https://docs.solidjs.com/solid-start/reference/entrypoints/app)
- [entry-client.tsx](https://docs.solidjs.com/solid-start/reference/entrypoints/entry-client)
- [entry-server.tsx](https://docs.solidjs.com/solid-start/reference/entrypoints/entry-server)
- [defineConfig](https://docs.solidjs.com/solid-start/reference/config/define-config)
- [FileRoutes](https://docs.solidjs.com/solid-start/reference/routing/file-routes)
- [clientOnly](https://docs.solidjs.com/solid-start/reference/client/client-only)
- [mount](https://docs.solidjs.com/solid-start/reference/client/mount)
- [StartClient](https://docs.solidjs.com/solid-start/reference/client/start-client)
- ["use server"](https://docs.solidjs.com/solid-start/reference/server/use-server)
- [createHandler](https://docs.solidjs.com/solid-start/reference/server/create-handler)
- [createMiddleware](https://docs.solidjs.com/solid-start/reference/server/create-middleware)
- [GET](https://docs.solidjs.com/solid-start/reference/server/get)
- [getServerFunctionMeta](https://docs.solidjs.com/solid-start/reference/server/get-server-function-meta)
- [HttpHeader](https://docs.solidjs.com/solid-start/reference/server/http-header)
- [HttpStatusCode](https://docs.solidjs.com/solid-start/reference/server/http-status-code)
- [StartServer](https://docs.solidjs.com/solid-start/reference/server/start-server)

## Solid Router

- [Overview](https://docs.solidjs.com/solid-router/)
- [Installation and setup](https://docs.solidjs.com/solid-router/getting-started/installation-and-setup)
- [Component routing](https://docs.solidjs.com/solid-router/getting-started/component)
- [Config-based routing](https://docs.solidjs.com/solid-router/getting-started/config)
- [Navigation](https://docs.solidjs.com/solid-router/concepts/navigation)
- [Path parameters](https://docs.solidjs.com/solid-router/concepts/path-parameters)
- [Search parameters](https://docs.solidjs.com/solid-router/concepts/search-parameters)
- [Catch-all routes](https://docs.solidjs.com/solid-router/concepts/catch-all)
- [Nesting routes](https://docs.solidjs.com/solid-router/concepts/nesting)
- [Layouts](https://docs.solidjs.com/solid-router/concepts/layouts)
- [Alternative routers](https://docs.solidjs.com/solid-router/concepts/alternative-routers)
- [Actions](https://docs.solidjs.com/solid-router/concepts/actions)
- [Single page applications](https://docs.solidjs.com/solid-router/rendering-modes/spa)
- [Server side rendering](https://docs.solidjs.com/solid-router/rendering-modes/ssr)
- [Queries](https://docs.solidjs.com/solid-router/data-fetching/queries)
- [Streaming](https://docs.solidjs.com/solid-router/data-fetching/streaming)
- [Revalidation](https://docs.solidjs.com/solid-router/data-fetching/revalidation)
- [Preload data](https://docs.solidjs.com/solid-router/data-fetching/how-to/preload-data)
- [Handle pending and error states](https://docs.solidjs.com/solid-router/data-fetching/how-to/handle-error-and-loading-states)
- [Lazy loading](https://docs.solidjs.com/solid-router/advanced-concepts/lazy-loading)
- [Migration from v0.9.x](https://docs.solidjs.com/solid-router/guides/migration)
- [A](https://docs.solidjs.com/solid-router/reference/components/a)
- [HashRouter](https://docs.solidjs.com/solid-router/reference/components/hash-router)
- [MemoryRouter](https://docs.solidjs.com/solid-router/reference/components/memory-router)
- [Navigate](https://docs.solidjs.com/solid-router/reference/components/navigate)
- [Route](https://docs.solidjs.com/solid-router/reference/components/route)
- [Router](https://docs.solidjs.com/solid-router/reference/components/router)
- [action](https://docs.solidjs.com/solid-router/reference/data-apis/action)
- [cache](https://docs.solidjs.com/solid-router/reference/data-apis/cache)
- [createAsync](https://docs.solidjs.com/solid-router/reference/data-apis/create-async)
- [createAsyncStore](https://docs.solidjs.com/solid-router/reference/data-apis/create-async-store)
- [query](https://docs.solidjs.com/solid-router/reference/data-apis/query)
- [revalidate](https://docs.solidjs.com/solid-router/reference/data-apis/revalidate)
- [useAction](https://docs.solidjs.com/solid-router/reference/data-apis/use-action)
- [useSubmission](https://docs.solidjs.com/solid-router/reference/data-apis/use-submission)
- [useSubmissions](https://docs.solidjs.com/solid-router/reference/data-apis/use-submissions)
- [preload](https://docs.solidjs.com/solid-router/reference/preload-functions/preload)
- [useBeforeLeave](https://docs.solidjs.com/solid-router/reference/primitives/use-before-leave)
- [useCurrentMatches](https://docs.solidjs.com/solid-router/reference/primitives/use-current-matches)
- [useIsRouting](https://docs.solidjs.com/solid-router/reference/primitives/use-is-routing)
- [useLocation](https://docs.solidjs.com/solid-router/reference/primitives/use-location)
- [useMatch](https://docs.solidjs.com/solid-router/reference/primitives/use-match)
- [useNavigate](https://docs.solidjs.com/solid-router/reference/primitives/use-navigate)
- [useParams](https://docs.solidjs.com/solid-router/reference/primitives/use-params)
- [usePreloadRoute](https://docs.solidjs.com/solid-router/reference/primitives/use-preload-route)
- [useSearchParams](https://docs.solidjs.com/solid-router/reference/primitives/use-search-params)
- [json](https://docs.solidjs.com/solid-router/reference/response-helpers/json)
- [redirect](https://docs.solidjs.com/solid-router/reference/response-helpers/redirect)
- [reload](https://docs.solidjs.com/solid-router/reference/response-helpers/reload)

## Solid Meta

- [Overview](https://docs.solidjs.com/solid-meta/)
- [Install and configure](https://docs.solidjs.com/solid-meta/getting-started/installation-and-setup)
- [Client setup](https://docs.solidjs.com/solid-meta/getting-started/client-setup)
- [Server setup](https://docs.solidjs.com/solid-meta/getting-started/server-setup)
- [Base](https://docs.solidjs.com/solid-meta/reference/meta/base)
- [Link](https://docs.solidjs.com/solid-meta/reference/meta/link)
- [Meta](https://docs.solidjs.com/solid-meta/reference/meta/meta)
- [MetaProvider](https://docs.solidjs.com/solid-meta/reference/meta/metaprovider)
- [Style](https://docs.solidjs.com/solid-meta/reference/meta/style)
- [Title](https://docs.solidjs.com/solid-meta/reference/meta/title)

---

*This document should be updated as the project evolves. Last updated: January 2026 (comprehensive SEO implementation + CI/CD patterns)*</content>
<parameter name="filePath">/home/studio/Projects/fintech-academy/AGENTS.md
