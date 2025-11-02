import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '../src/components/textfield';
import { Button } from '../src/components/button/Button';

const meta: Meta<typeof TextField.Root> = {
  title: 'Components/TextField',
  component: TextField.Root,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the TextField.',
      defaultValue: 'md',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only.',
      defaultValue: false,
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the input is marked as invalid.',
      defaultValue: false,
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the input is required.',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled.',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField.Root>;

export const Default: Story = {
  args: {
    size: 'md',
    isReadOnly: false,
    isInvalid: false,
    isRequired: false,
    isDisabled: false,
  },
  render: args => (
    <TextField.Root {...args}>
      <TextField.Label>Default TextField</TextField.Label>
      <TextField.Input placeholder="Enter text here" />
      <TextField.ErrorField>This field is required</TextField.ErrorField>
    </TextField.Root>
  ),
};

export const Description: Story = {
  args: {
    size: 'md',
    isReadOnly: false,
    isInvalid: false,
    isRequired: false,
    isDisabled: false,
  },
  render: args => (
    <TextField.Root {...args} name="first-name">
      <TextField.Label>Default TextField</TextField.Label>
      <TextField.Input placeholder="Enter text here" />
      <TextField.Description>
        Please enter your full name.
      </TextField.Description>
      <TextField.ErrorField>This field is required</TextField.ErrorField>
    </TextField.Root>
  ),
};

export const Validation: Story = {
  args: {
    size: 'md',
    isReadOnly: false,
    isInvalid: false,
    isRequired: false,
    isDisabled: false,
  },
  render: args => {
    return (
      <form
        name="validation-form"
        className="flex flex-col gap-2 w-fit"
        onSubmit={e => e.preventDefault()}
      >
        <TextField.Root {...args} isRequired name="validated-field">
          <TextField.Label>Validated TextField</TextField.Label>
          <TextField.Input />
          <TextField.ErrorField>Please enter a value.</TextField.ErrorField>
        </TextField.Root>
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    );
  },
};
