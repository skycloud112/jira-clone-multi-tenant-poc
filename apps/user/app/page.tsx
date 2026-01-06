'use client'

import React from 'react'
import { Box, Stack } from '@mui/material'
import { AppHeader, BoardColumn, IssueCard } from '@repo/ui'
import { getTenantTokens } from '@repo/theme'

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1'
const tokens = getTenantTokens(tenantName)

type IssueStatus = 'todo' | 'in-progress' | 'done'

type Issue = {
  key: string
  title: string
  status: IssueStatus
}

const sampleIssues: Issue[] = [
  { key: 'PROJ-1', title: 'Setup project structure', status: 'done' },
  { key: 'PROJ-2', title: 'Implement user authentication', status: 'in-progress' },
  { key: 'PROJ-3', title: 'Create dashboard layout', status: 'in-progress' },
  { key: 'PROJ-4', title: 'Add dark mode support', status: 'todo' },
  { key: 'PROJ-5', title: 'Write unit tests', status: 'todo' },
  { key: 'PROJ-6', title: 'Setup CI/CD pipeline', status: 'todo' },
  { key: 'PROJ-7', title: 'Code review process', status: 'done' },
]

const groupIssuesByStatus = (issues: Issue[]) => {
  return {
    todo: issues.filter((i) => i.status === 'todo'),
    'in-progress': issues.filter((i) => i.status === 'in-progress'),
    done: issues.filter((i) => i.status === 'done'),
  }
}

export default function UserPage() {
  const grouped = groupIssuesByStatus(sampleIssues)

  const headerColors = {
    background: tokens.colors.primary,
    text: '#FFFFFF',
  }

  const columnColors = {
    headerBg: tokens.colors.border,
    headerText: tokens.colors.text,
    columnBg: tokens.colors.background,
  }

  const cardColors = {
    cardBorder: tokens.colors.border,
    statusColors: {
      todo: tokens.colors.textMuted,
      inProgress: tokens.colors.warning,
      done: tokens.colors.success,
    },
  }

  const columns: { key: IssueStatus; title: string }[] = [
    { key: 'todo', title: 'To Do' },
    { key: 'in-progress', title: 'In Progress' },
    { key: 'done', title: 'Done' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <AppHeader
        appName="Jira Clone - Board"
        tenantName={tokens.name}
        colors={headerColors}
      />
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Stack direction="row" spacing={2} sx={{ minHeight: '100%' }}>
          {columns.map((col) => (
            <BoardColumn
              key={col.key}
              title={col.title}
              count={grouped[col.key].length}
              colors={columnColors}
            >
              {grouped[col.key].map((issue) => (
                <IssueCard
                  key={issue.key}
                  issueKey={issue.key}
                  title={issue.title}
                  status={issue.status}
                  colors={cardColors}
                />
              ))}
            </BoardColumn>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
