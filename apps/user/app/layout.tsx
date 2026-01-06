'use client'

import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { DesignTokensProvider, getTenantTokens, createMuiTheme } from '@repo/theme'

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1'
const tokens = getTenantTokens(tenantName)
const muiTheme = createMuiTheme(tokens)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <DesignTokensProvider tokens={tokens}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </DesignTokensProvider>
      </body>
    </html>
  )
}
