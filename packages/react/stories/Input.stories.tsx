import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { InputProps } from '../src/components/primitives/input/types';
import { Input } from '../src/components/primitives/input/Input';
import { Label } from '../src/components/label';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the input.',
      defaultValue: 'Enter text here',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled.',
      defaultValue: false,
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Whether the input is marked as invalid.',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
  render: args => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="input-default">Default Input</Label>
      <Input id="input-default" {...args} />
    </div>
  ),
};
