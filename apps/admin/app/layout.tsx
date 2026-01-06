'use client'

import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTenantTheme } from '@repo/theme'

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1'
const theme = getTenantTheme(tenantName)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
