import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../src/components/primitives/input';
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
      <Input id="input-default" className="w-1/4 h-10" {...args} />
    </div>
  ),
};

export const Types: Story = {
  args: {
    placeholder: 'Enter text here',
  },
  render: args => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-default">Default Input</Label>
        <Input id="input-default" className="w-1/4 h-10" {...args} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-password">Password</Label>
        <Input
          id="input-password"
          type="password"
          className="w-1/4 h-10"
          {...args}
          placeholder="Password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-number">Number Input</Label>
        <Input
          id="input-number"
          type="number"
          className="w-1/4 h-10"
          min={0}
          max={100}
          step={1}
          {...args}
          placeholder="Enter a number"
        />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    placeholder: 'Enter text here',
  },
  render: args => {
    const [value, setValue] = React.useState('');

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-controlled">Controlled Input</Label>
        <Input
          id="input-controlled"
          className="w-1/4 h-10"
          value={value}
          onChange={e => setValue(e.target.value)}
          {...args}
        />
        <span>Current value: {value}</span>
      </div>
    );
  },
};
