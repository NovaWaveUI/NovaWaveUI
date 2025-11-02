import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../src/components/label';
import { TextArea } from '../src/components/primitives/textarea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
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
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
  render: args => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="textarea-default">Default TextArea</Label>
      <TextArea id="textarea-default" className="w-1/4 h-10" {...args} />
    </div>
  ),
};
