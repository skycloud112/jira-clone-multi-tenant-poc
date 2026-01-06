import React from 'react'
import { Box, Typography, Stack } from '@mui/material'

type BoardColumnProps = {
  title: string
  count: number
  children: React.ReactNode
  colors: {
    headerBg: string
    headerText: string
    columnBg: string
  }
}

export const BoardColumn = ({ title, count, children, colors }: BoardColumnProps) => {
  return (
    <Box
      sx={{
        width: 280,
        minWidth: 280,
        bgcolor: colors.columnBg,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      <Box
        sx={{
          p: 1.5,
          bgcolor: colors.headerBg,
          borderRadius: '4px 4px 0 0',
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ color: colors.headerText }}
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
