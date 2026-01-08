# AGENTS.md - Development Guidelines for Fintech Academy

This document provides essential information for agentic coding assistants working on the Fintech Academy project. Follow these guidelines to maintain consistency and quality.

## 🚀 Build, Lint, and Test Commands

### Core Commands
- **Development server**: `npm run dev` or `bun run dev`
- **Production build**: `npm run build` or `bun run build`
- **Start production server**: `npm run start` or `bun run start`

### Code Quality
- **Format code**: `npm run format` or `bun run format` (Biome formatter)
- **Lint code**: `npm run lint` or `bun run lint` (Biome linter)
- **Type check**: `npm run check` or `bun run check` (Biome checker)

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
- **Content collections**: Use @content-collections/core for typed content
- **Math support**: KaTeX and remark-math for mathematical expressions
- **Mermaid diagrams**: Integrated diagram support
- **Custom components**: Extend with SolidJS components in MDX

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
│   └── *.tsx             # Custom components
├── routes/               # File-based routing
├── content/              # MDX content files
├── lib/                  # Utilities and stores
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

## 📋 Development Workflow

### Before Committing
1. Run `npm run check` for type checking
2. Run `npm run lint` for linting
3. Run `npm run format` for code formatting
4. Test build: `npm run build`

### Component Development
1. Use shadcn/ui components as base when possible
2. Follow existing patterns for props and variants
3. Include proper TypeScript types
4. Add accessibility attributes
5. Test responsiveness and dark mode

### Content Development
1. Use MDX for rich content with math and diagrams
2. Follow existing directory structure in `content/`
3. Use content collections for type safety
4. Test rendering in development mode

### State Management
- Use `@tanstack/solid-store` for global state
- Prefer local signals for component state
- Use context providers for shared state
- Follow reactive programming patterns

## ⚠️ Important Notes

- **No tests currently**: When adding tests, use Vitest with jsdom environment
- **Git hooks**: Pre-commit hooks may run linting/formatting
- **Performance**: Use SolidJS optimization patterns (memo, createMemo, etc.)
- **Bundle size**: Monitor with build output and optimize imports
- **Accessibility**: Follow WCAG guidelines, components include a11y features

## 🔍 Troubleshooting

### Common Issues
- **Import errors**: Check path aliases and file extensions
- **Type errors**: Ensure proper TypeScript types and interfaces
- **Styling issues**: Verify Tailwind classes and custom properties
- **Build failures**: Check Biome rules and configuration

### Debugging
- Use SolidJS dev tools for reactive debugging
- Check browser console for runtime errors
- Use `console.log` strategically (remove before commit)
- Test in both light and dark themes

---

*This document should be updated as the project evolves. Last updated: January 2026*</content>
<parameter name="filePath">/home/studio/Projects/fintech-academy/AGENTS.md
