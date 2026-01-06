import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@mui/material'
import { DesignTokensProvider, getTenantTokens, createMuiTheme } from '@repo/theme'

const preview: Preview = {
  globalTypes: {
    tenant: {
      description: 'Tenant theme',
      toolbar: {
        title: 'Tenant',
        icon: 'paintbrush',
        items: [
          { value: 'tenant1', title: 'Tenant 1' },
          { value: 'tenant2', title: 'Tenant 2' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    tenant: 'tenant1',
  },
  decorators: [
    (Story, context) => {
      const tenant = context.globals.tenant || 'tenant1'
      const tokens = getTenantTokens(tenant)
      const muiTheme = createMuiTheme(tokens)

      return (
        <DesignTokensProvider tokens={tokens}>
          <ThemeProvider theme={muiTheme}>
            <Story />
          </ThemeProvider>
        </DesignTokensProvider>
      )
    },
  ],
}

export default preview
