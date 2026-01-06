'use client'

import React from 'react'
import { Chip } from '@mui/material'
import { useDesignTokens } from '@repo/theme'

type IssueStatus = 'todo' | 'in-progress' | 'done'

type StatusBadgeProps = {
  status: IssueStatus
}

const statusLabels: Record<IssueStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const tokens = useDesignTokens()

  const colorMap: Record<IssueStatus, string> = {
    'todo': tokens.colors.textMuted,
    'in-progress': tokens.colors.warning,
    'done': tokens.colors.success,
  }

  return (
    <Chip
      label={statusLabels[status]}
      size="small"
      sx={{
        bgcolor: colorMap[status],
        color: '#fff',
        fontWeight: 500,
        fontSize: '0.75rem',
      }}
    />
  )
}
