# Jira Clone POC - Multi-Tenant Theming

A Turborepo monorepo demonstrating per-tenant theming for a Jira clone application. Each tenant (client) can have their own theme while sharing the same codebase.

## Project Structure

```
jira-clone-poc/
├── apps/
│   ├── admin/          # Admin dashboard (port 3001)
│   └── user/           # Kanban board (port 3002)
├── packages/
│   ├── theme/          # Design tokens + providers
│   └── ui/             # Shared UI components
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Run admin app with tenant1 (blue theme)
pnpm admin:tenant1

# Run admin app with tenant2 (green theme)
pnpm admin:tenant2

# Run user app with tenant1
pnpm user:tenant1

# Run user app with tenant2
pnpm user:tenant2
```

## Storybook

Preview UI components with different tenant themes using Storybook:

```bash
cd packages/ui && pnpm storybook
```

Open http://localhost:6006 and use the tenant switcher in the toolbar (paintbrush icon) to toggle between Tenant 1 and Tenant 2 themes.

## Theming Architecture

Design tokens are used in two ways:

1. **MUI Theme** - Tokens are converted to an MUI theme via `createMuiTheme()`, which automatically styles all MUI components (Button, TextField, Typography, etc.)
2. **Direct Access** - Components use `useDesignTokens()` hook to access tokens directly for custom styling

### When to Use Each Approach

| Approach | Use When |
|----------|----------|
| MUI Theme (automatic) | Using standard MUI components that respect theme palette |
| `useDesignTokens()` hook | Custom styles, computed colors (e.g., status-based), non-MUI styling |

### Example: MUI Theme (Automatic Styling)

```typescript
// MUI Button automatically uses tokens.colors.primary
<Button variant="contained">Submit</Button>

// Typography uses tokens.colors.text via theme
<Typography color="text.primary">Hello</Typography>
```

### Example: useDesignTokens Hook (Direct Access)

```typescript
// StatusBadge.tsx - uses tokens directly for status-based colors
const StatusBadge = ({ status }: StatusBadgeProps) => {
  const tokens = useDesignTokens()

  const colorMap: Record<IssueStatus, string> = {
    'todo': tokens.colors.textMuted,
    'in-progress': tokens.colors.warning,
    'done': tokens.colors.success,
  }

  return <Chip sx={{ bgcolor: colorMap[status] }} />
}

// BoardColumn.tsx - uses tokens for custom background
const BoardColumn = ({ title, children }: BoardColumnProps) => {
  const tokens = useDesignTokens()

  return (
    <Box sx={{ bgcolor: tokens.colors.background }}>
      <Box sx={{ bgcolor: tokens.colors.border }}>{title}</Box>
      {children}
    </Box>
  )
}
```

### Design Tokens

Each tenant has a set of design tokens defined in `packages/theme/tenants/`:

```typescript
// packages/theme/tenants/tenant1.ts
export const tenant1Tokens: DesignTokens = {
  name: 'Tenant 1',
  colors: {
    primary: '#0052CC',
    secondary: '#6554C0',
    background: '#FAFBFC',
    surface: '#FFFFFF',
    text: '#172B4D',
    textMuted: '#5E6C84',
    border: '#DFE1E6',
    success: '#36B37E',
    warning: '#FFAB00',
    error: '#FF5630',
  },
}
```

### DesignTokensProvider

UI components access design tokens via the `useDesignTokens()` hook:

```typescript
// In a UI component
import { useDesignTokens } from '@repo/theme'

export const MyComponent = () => {
  const tokens = useDesignTokens()

  return (
    <Box sx={{ color: tokens.colors.primary }}>
      Hello from {tokens.name}
    </Box>
  )
}
```

### App Layout Setup

Each app wraps its content with both `DesignTokensProvider` and MUI's `ThemeProvider`:

```typescript
// apps/admin/app/layout.tsx
import { DesignTokensProvider, getTenantTokens, createMuiTheme } from '@repo/theme'

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1'
const tokens = getTenantTokens(tenantName)
const muiTheme = createMuiTheme(tokens)

export default function RootLayout({ children }) {
  return (
    <DesignTokensProvider tokens={tokens}>
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </DesignTokensProvider>
  )
}
```

## Adding a New Tenant

1. Create a new tokens file in `packages/theme/tenants/`:

```typescript
// packages/theme/tenants/tenant3.ts
import { DesignTokens } from '../types'

export const tenant3Tokens: DesignTokens = {
  name: 'Tenant 3',
  colors: {
    primary: '#FF5722',
    // ... other colors
  },
}
```

2. Register it in `packages/theme/getTenantTheme.ts`:

```typescript
import { tenant3Tokens } from './tenants/tenant3'

const tenants: Record<string, DesignTokens> = {
  tenant1: tenant1Tokens,
  tenant2: tenant2Tokens,
  tenant3: tenant3Tokens,
}
```

3. Add npm scripts to root `package.json`:

```json
{
  "scripts": {
    "admin:tenant3": "NEXT_PUBLIC_TENANT=tenant3 turbo run dev --filter=admin",
    "user:tenant3": "NEXT_PUBLIC_TENANT=tenant3 turbo run dev --filter=user"
  }
}
```

## Packages

### @repo/theme

- `DesignTokens` - Type definition for design tokens
- `DesignTokensProvider` - React context provider
- `useDesignTokens()` - Hook to access tokens in components
- `getTenantTokens(name)` - Get tokens by tenant name
- `createMuiTheme(tokens)` - Convert tokens to MUI theme

### @repo/ui

Shared UI components that use `useDesignTokens()`:

- `AppHeader` - Application header with tenant branding
- `IssueCard` - Jira-style issue card
- `StatusBadge` - Issue status chip (To Do, In Progress, Done)
- `BoardColumn` - Kanban board column

## Tech Stack

- [Turborepo](https://turbo.build/) - Monorepo build system
- [Next.js 15](https://nextjs.org/) - React framework
- [Material UI 6](https://mui.com/) - Component library
- [pnpm](https://pnpm.io/) - Package manager
