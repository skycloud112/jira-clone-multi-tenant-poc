'use client'

import React from 'react'
import { Card, CardContent, Typography, Stack } from '@mui/material'
import { useDesignTokens } from '@repo/theme'
import { StatusBadge } from './StatusBadge'

type IssueStatus = 'todo' | 'in-progress' | 'done'

type IssueCardProps = {
  issueKey: string
  title: string
  status: IssueStatus
}

export const IssueCard = ({ issueKey, title, status }: IssueCardProps) => {
  const tokens = useDesignTokens()

  return (
    <Card
      sx={{
        border: `1px solid ${tokens.colors.border}`,
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
          <StatusBadge status={status} />
        </Stack>
      </CardContent>
    </Card>
  )
}
