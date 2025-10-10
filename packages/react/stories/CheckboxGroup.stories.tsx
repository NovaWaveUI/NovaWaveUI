import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckboxGroup from '../src/CheckboxGroup';
import Checkbox, { CheckboxProps } from '../src/Checkbox';
import { Button } from '../src/Button';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Checkbox Group',
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: [
        'className',
        'style',
        'slot',
        'children',
        'as',
        'asChild',
        'ref',
      ],
    },
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox.',
      table: {
        defaultValue: { summary: 'md' },
      },
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
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'The border radius of the checkbox.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the checkbox group is required.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The orientation of the checkbox group.',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

/**
 * A simple wrapper around the Checkbox component to include an indicator and icon.
 * @param props - The props for the Checkbox component.
 * @returns The Checkbox component with an indicator and icon.
 */
function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox {...props}>
      <Checkbox.Indicator>
        <Checkbox.Icon />
      </Checkbox.Indicator>
      <Checkbox.Label>{props.children}</Checkbox.Label>
    </Checkbox>
  );
}

export const Default: Story = {
  args: {
    color: 'primary',
    size: 'md',
    radius: 'md',
    isDisabled: false,
  },
  render: args => (
    <CheckboxGroup {...args} defaultValue={['react']}>
      <CheckboxGroup.Label>Frameworks Used</CheckboxGroup.Label>
      <CheckboxGroup.Wrapper>
        <CustomCheckbox value="react">React</CustomCheckbox>
        <CustomCheckbox value="vue">Vue</CustomCheckbox>
        <CustomCheckbox value="angular" isDisabled>
          Angular (Disabled)
        </CustomCheckbox>
        <CustomCheckbox value="svelte">Svelte</CustomCheckbox>
      </CheckboxGroup.Wrapper>
      <CheckboxGroup.Description>
        Select all that apply.
      </CheckboxGroup.Description>
      <CheckboxGroup.Error />
    </CheckboxGroup>
  ),
};

export const Horizontal: Story = {
  args: {
    color: 'primary',
    size: 'md',
    radius: 'md',
    isDisabled: false,
    orientation: 'horizontal',
  },
  render: args => (
    <CheckboxGroup {...args} defaultValue={['react']}>
      <CheckboxGroup.Label>Frameworks Used</CheckboxGroup.Label>
      <CheckboxGroup.Wrapper>
        <CustomCheckbox value="react">React</CustomCheckbox>
        <CustomCheckbox value="vue">Vue</CustomCheckbox>
        <CustomCheckbox value="angular" isDisabled>
          Angular (Disabled)
        </CustomCheckbox>
        <CustomCheckbox value="svelte">Svelte</CustomCheckbox>
      </CheckboxGroup.Wrapper>
      <CheckboxGroup.Description>
        Select all that apply.
      </CheckboxGroup.Description>
      <CheckboxGroup.Error />
    </CheckboxGroup>
  ),
};

export const Required: Story = {
  args: {
    color: 'primary',
    size: 'md',
    radius: 'md',
    isDisabled: false,
    isRequired: true,
  },
  render: args => (
    <CheckboxGroup {...args} defaultValue={['react']}>
      <CheckboxGroup.Label>Frameworks Used</CheckboxGroup.Label>
      <CheckboxGroup.Wrapper>
        <CustomCheckbox value="react">React</CustomCheckbox>
        <CustomCheckbox value="vue">Vue</CustomCheckbox>
        <CustomCheckbox value="angular" isDisabled>
          Angular (Disabled)
        </CustomCheckbox>
        <CustomCheckbox value="svelte">Svelte</CustomCheckbox>
      </CheckboxGroup.Wrapper>
      <CheckboxGroup.Description>
        Select all that apply.
      </CheckboxGroup.Description>
      <CheckboxGroup.Error />
    </CheckboxGroup>
  ),
};

export const Disabled: Story = {
  args: {
    color: 'primary',
    size: 'md',
    radius: 'md',
    isDisabled: true,
  },
  render: args => (
    <CheckboxGroup {...args} defaultValue={['react']}>
      <CheckboxGroup.Label>Frameworks Used</CheckboxGroup.Label>
      <CheckboxGroup.Wrapper>
        <CustomCheckbox value="react">React</CustomCheckbox>
        <CustomCheckbox value="vue">Vue</CustomCheckbox>
        <CustomCheckbox value="angular">Angular</CustomCheckbox>
        <CustomCheckbox value="svelte">Svelte</CustomCheckbox>
      </CheckboxGroup.Wrapper>
      <CheckboxGroup.Description>
        Select all that apply.
      </CheckboxGroup.Description>
      <CheckboxGroup.Error />
    </CheckboxGroup>
  ),
};

export const WithError: Story = {
  args: {
    color: 'primary',
    size: 'md',
    radius: 'md',
    isDisabled: false,
  },
  render: args => (
    <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
      <CheckboxGroup
        {...args}
        defaultValue={[]}
        isRequired
        validationBehavior="native"
        errorMessage="You must select at least one framework."
      >
        <CheckboxGroup.Label>Frameworks Used</CheckboxGroup.Label>
        <CheckboxGroup.Wrapper>
          <CustomCheckbox value="react">React</CustomCheckbox>
          <CustomCheckbox value="vue">Vue</CustomCheckbox>
          <CustomCheckbox value="angular">Angular</CustomCheckbox>
          <CustomCheckbox value="svelte">Svelte</CustomCheckbox>
        </CheckboxGroup.Wrapper>
        <CheckboxGroup.Description>
          Select all that apply.
        </CheckboxGroup.Description>
        <CheckboxGroup.Error>
          You must select at least one framework.
        </CheckboxGroup.Error>
      </CheckboxGroup>
      <Button type="submit" className="max-w-4">
        Submit
      </Button>
      <p>
        Try submitting the form without selecting any options to see the error
        message.
      </p>
    </form>
  ),
};
