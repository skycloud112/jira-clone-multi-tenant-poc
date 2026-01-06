import React from 'react'
import { Chip } from '@mui/material'

type IssueStatus = 'todo' | 'in-progress' | 'done'

type StatusBadgeProps = {
  status: IssueStatus
  colors: {
    todo: string
    inProgress: string
    done: string
  }
}

const statusLabels: Record<IssueStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
}

export const StatusBadge = ({ status, colors }: StatusBadgeProps) => {
  const colorMap: Record<IssueStatus, string> = {
    'todo': colors.todo,
    'in-progress': colors.inProgress,
    'done': colors.done,
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
