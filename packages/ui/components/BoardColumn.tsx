'use client'

import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { useDesignTokens } from '@repo/theme'

type BoardColumnProps = {
  title: string
  count: number
  children: React.ReactNode
}

export const BoardColumn = ({ title, count, children }: BoardColumnProps) => {
  const tokens = useDesignTokens()

  return (
    <Box
      sx={{
        width: 280,
        minWidth: 280,
        bgcolor: tokens.colors.background,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      <Box
        sx={{
          p: 1.5,
          bgcolor: tokens.colors.border,
          borderRadius: '4px 4px 0 0',
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ color: tokens.colors.text }}
        >
          {title} ({count})
        </Typography>
      </Box>
      <Stack spacing={1.5} sx={{ p: 1.5, overflowY: 'auto', flex: 1 }}>
        {children}
      </Stack>
    </Box>
  )
}
