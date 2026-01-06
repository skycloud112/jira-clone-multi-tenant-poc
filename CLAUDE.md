# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install              # Install dependencies
pnpm admin:tenant1        # Run admin app with tenant1 theme (port 3001)
pnpm admin:tenant2        # Run admin app with tenant2 theme (port 3001)
pnpm user:tenant1         # Run user app with tenant1 theme (port 3002)
pnpm user:tenant2         # Run user app with tenant2 theme (port 3002)
pnpm dev                  # Run all apps
pnpm build                # Build all apps
```

## Architecture

Turborepo monorepo demonstrating multi-tenant theming for a Jira clone.

### Packages

- **@repo/theme** - Design tokens and theming infrastructure
  - `DesignTokensProvider` - React context for design tokens
  - `useDesignTokens()` - Hook to access tokens in components
  - `getTenantTokens(name)` - Get tokens by tenant name
  - `createMuiTheme(tokens)` - Convert tokens to MUI theme
  - Tenant definitions in `packages/theme/tenants/`

- **@repo/ui** - Shared UI components using `useDesignTokens()`

### Apps

- **admin** - Admin dashboard (port 3001)
- **user** - Kanban board (port 3002)

### Theming Pattern

Apps wrap content with both `DesignTokensProvider` and MUI `ThemeProvider`:

```typescript
const tokens = getTenantTokens(process.env.NEXT_PUBLIC_TENANT || 'tenant1')
const muiTheme = createMuiTheme(tokens)

<DesignTokensProvider tokens={tokens}>
  <ThemeProvider theme={muiTheme}>
    {children}
  </ThemeProvider>
</DesignTokensProvider>
```

UI components access tokens via `useDesignTokens()` hook.

### Adding a New Tenant

1. Create tokens file in `packages/theme/tenants/tenantX.ts`
2. Register in `packages/theme/getTenantTheme.ts`
3. Add npm scripts to root `package.json`
