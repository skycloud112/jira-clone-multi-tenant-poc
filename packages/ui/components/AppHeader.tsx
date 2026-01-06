import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'

type AppHeaderProps = {
  appName: string
  tenantName: string
  colors: {
    background: string
    text: string
  }
}

export const AppHeader = ({ appName, tenantName, colors }: AppHeaderProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: colors.background,
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.text }}>
          {appName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ color: colors.text, opacity: 0.8 }}>
          {tenantName}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
