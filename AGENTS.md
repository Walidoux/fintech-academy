# AGENTS.md

This file contains instructions and guidelines for agentic coding assistants working in this repository.

## Project Overview

This is a **SolidJS + TypeScript + Vite** application with the following technology stack:

- **Framework**: SolidJS with JSX
- **Build Tool**: Vite
- **Language**: TypeScript (ESNext target)
- **Styling**: TailwindCSS v4 with CSS variables
- **Package Manager**: Bun
- **UI Library**: shadcn/ui (New York style)
- **Linter/Formatter**: Biome (with ultracite/core config)

## Build/Lint/Test Commands

### Development

```bash
bun run dev     # Start development server (port 3000)
bun run build   # Build for production
bun run serve   # Preview production build
```

### Code Quality

```bash
bunx @biomejs/biome check              # Run all checks (lint, format, import sorting)
bunx @biomejs/biome lint               # Only run linter
bunx @biomejs/biome format --write     # Format code
bunx @biomejs/biome format             # Check formatting without changes
bunx @biomejs/biome check --write      # Fix auto-fixable issues
bunx @biomejs/biome ci                 # CI command (exits with error on issues)
```

## Code Style Guidelines

### Imports

- Separate type-only imports with `type` keyword
- Group imports: external libraries first, then internal imports
- Use path aliases: `~/*` for `./src/*`

```typescript
import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { cn } from '~/lib/utils'
import { Button } from '~/components/button' // shadcn/ui alias
```

### TypeScript

- Use strict null checks (`strictNullChecks: true`)
- Prefer `type` over `interface` for object types
- Use explicit return types for exported functions
- Use `Component` type from 'solid-js' for SolidJS components

```typescript
type Props = {
  title: string
  onClick?: () => void
}

const MyComponent: Component<Props> = (props) => {
  // component logic
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile`, `DataTable`)
- **Functions**: camelCase (e.g., `handleClick`, `formatDate`)
- **Types/Interfaces**: PascalCase (e.g., `UserData`, `ApiResponse`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Files**: kebab-case for components (e.g., `user-profile.tsx`), camelCase for utilities (e.g., `apiClient.ts`)

### JSX/SolidJS Patterns

- Use functional components with `Component` type
- Use `ParentProps` for components that render children
- Prefer class attribute over className
- Use conditional rendering with ternary operators or `Show` component
- Use `createSignal` for reactive state

```typescript
import type { Component, ParentProps } from 'solid-js'

const Card: Component<ParentProps & { class?: string }> = (props) => {
  return (
    <div class={cn('card-styles', props.class)}>
      {props.children}
    </div>
  )
}
```

### Styling with TailwindCSS
- Use the `cn()` utility from `~/lib/utils` for conditional classes
- Follow shadcn/ui design tokens and CSS variables
- Use responsive prefixes consistently
- Prefer utility classes over custom CSS

```typescript
<div class={cn(
  'flex items-center justify-between p-4',
  'md:p-6 lg:p-8',
  props.class
)}>
```

### Error Handling
- Use try/catch for async operations
- Throw descriptive error messages
- Use TypeScript's error types when appropriate
- Handle loading and error states in components

```typescript
try {
  const data = await fetchData()
  // handle success
} catch (error) {
  console.error('Failed to fetch data:', error)
  // handle error state
}
```

### File Organization
- **Components**: `src/components/` (reusable UI components)
- **Pages/Views**: `src/` (top-level components)
- **Utilities**: `src/lib/` (helper functions, API clients)
- **Types**: Define inline or in separate `.ts` files
- **Assets**: `src/` (if needed, though this project uses mostly CSS)

### Path Aliases
- `~/*` → `./src/*` (TypeScript path mapping)
- `@/*` → `./src/*` (shadcn/ui alias)
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/hooks/*` → `./src/hooks/*`

### Formatting Rules (Biome)
- **Quotes**: Single quotes for strings and JSX
- **Semicolons**: As needed (ASI-compliant)
- **JSX Brackets**: Same line (`bracketSameLine: true`)
- **Line Width**: Default (120 characters)
- **Indentation**: 2 spaces (default)

### Import Sorting (Biome)
- External imports first, then internal imports
- Sort alphabetically within groups
- Type imports separated and sorted

### Commit Guidelines
- Use conventional commits when possible
- Write clear, concise commit messages
- Focus on "what" and "why", not just "what"

Examples:
```
feat: add user authentication component
fix: resolve memory leak in data fetching
refactor: simplify API client error handling
```

### Performance Considerations
- Use SolidJS reactivity patterns correctly
- Avoid unnecessary re-renders with proper memoization
- Use `createMemo` for computed values
- Lazy load components when appropriate
- Optimize bundle size by tree-shaking unused imports

### Security
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Validate user inputs
- Follow OWASP guidelines for web applications
- Use HTTPS in production

## Adding New Dependencies

1. Use `bun add` for new packages
2. Prefer packages with TypeScript support
3. Check bundle size impact for client-side packages
4. Update this file if adding dev tools or changing build process

## Deployment

This project builds to static files suitable for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Build command: `bun run build`
Output directory: `dist/` (Vite default)

## Additional Tools

### shadcn/ui CLI
```basH
bunx shadcn@latest add button       # Add components
bunx shadcn@latest search button    # Check available components
```

### Type Checking
```basH
bunx tsc --noEmit # Run TypeScript compiler check
```

### Bundle Analysis
```basH
bunx vite-bundle-analyzer # Analyze bundle size
```

Remember: Always run `bunx @biomejs/biome check --write` before committing to ensure code quality.</content>
<parameter name="filePath">AGENTS.md
