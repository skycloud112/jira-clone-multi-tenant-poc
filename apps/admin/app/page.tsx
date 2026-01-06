'use client'

import React from 'react'
import { Box, Container, Typography, Stack, Paper } from '@mui/material'
import { AppHeader, IssueCard } from '@repo/ui'
import { getTenantTokens } from '@repo/theme'

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1'
const tokens = getTenantTokens(tenantName)

const sampleIssues = [
  { key: 'PROJ-1', title: 'Setup project structure', status: 'done' as const },
  { key: 'PROJ-2', title: 'Implement user authentication', status: 'in-progress' as const },
  { key: 'PROJ-3', title: 'Create dashboard layout', status: 'in-progress' as const },
  { key: 'PROJ-4', title: 'Add dark mode support', status: 'todo' as const },
  { key: 'PROJ-5', title: 'Write unit tests', status: 'todo' as const },
]

export default function AdminPage() {
  const headerColors = {
    background: tokens.colors.primary,
    text: '#FFFFFF',
  }

  const cardColors = {
    cardBorder: tokens.colors.border,
    statusColors: {
      todo: tokens.colors.textMuted,
      inProgress: tokens.colors.warning,
      done: tokens.colors.success,
    },
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader
        appName="Jira Clone - Admin"
        tenantName={tokens.name}
        colors={headerColors}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          All Issues
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            {sampleIssues.map((issue) => (
              <IssueCard
                key={issue.key}
                issueKey={issue.key}
                title={issue.title}
                status={issue.status}
                colors={cardColors}
              />
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
