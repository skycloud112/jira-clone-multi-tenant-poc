'use client'

import React from 'react'
import { Box, Typography, Stack, Paper } from '@mui/material'
import { useDesignTokens } from '@repo/theme'

export const TokensDemo = () => {
  const tokens = useDesignTokens()

  const colorEntries = Object.entries(tokens.colors)

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Design Tokens Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Current tenant: <strong>{tokens.name}</strong>
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {colorEntries.map(([name, value]) => (
          <Box key={name} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: value,
                borderRadius: 1,
                border: '1px solid',
                borderColor: tokens.colors.border,
                mb: 0.5,
              }}
            />
            <Typography variant="caption" display="block">
              {name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}
