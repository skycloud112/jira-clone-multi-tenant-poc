import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
}

export default meta

type Story = StoryObj<typeof StatusBadge>

export const Todo: Story = {
  args: {
    status: 'todo',
  },
}

export const InProgress: Story = {
  args: {
    status: 'in-progress',
  },
}

export const Done: Story = {
  args: {
    status: 'done',
  },
}
