import React from 'react'
import { Card, CardContent, Typography, Stack } from '@mui/material'
import { StatusBadge } from './StatusBadge'

type IssueStatus = 'todo' | 'in-progress' | 'done'

type IssueCardProps = {
  issueKey: string
  title: string
  status: IssueStatus
  colors: {
    cardBorder: string
    statusColors: {
      todo: string
      inProgress: string
      done: string
    }
  }
}

export const IssueCard = ({ issueKey, title, status, colors }: IssueCardProps) => {
  return (
    <Card
      sx={{
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {issueKey}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {title}
          </Typography>
          <StatusBadge status={status} colors={colors.statusColors} />
        </Stack>
      </CardContent>
    </Card>
  )
}
