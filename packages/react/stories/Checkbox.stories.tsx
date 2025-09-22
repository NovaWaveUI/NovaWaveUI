import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CheckboxProps } from '../src/Checkbox/index';
import Checkbox from '../src/Checkbox/index';
import React from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The label of the checkbox.',
      defaultValue: 'Checkbox',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled.',
      defaultValue: false,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox.',
      defaultValue: 'md',
    },
    color: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
      ],
      description: 'The color of the checkbox.',
      defaultValue: 'primary',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'The border radius of the checkbox.',
      defaultValue: 'md',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: 'Checkbox',
    isDisabled: false,
    size: 'md',
    color: 'primary',
    radius: 'md',
  },
};
