import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CheckboxProps } from '../src/Checkbox/index';
import Checkbox from '../src/Checkbox/index';
import { LineIcon } from '../src/Checkbox/LineIcon';
import { CheckIcon } from '../src/Checkbox/CheckIcon';
import { HeartIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['inputRef', 'className', 'style', 'slot'],
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The label of the checkbox.',
    },
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
    isIndeterminate: {
      control: 'boolean',
      description:
        'Whether the checkbox is in an indeterminate state (usually used for parent checkboxes).',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the checkbox is read-only.',
      defaultValue: false,
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the checkbox is in an invalid state.',
      defaultValue: false,
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the checkbox is required.',
      defaultValue: false,
    },
    defaultSelected: {
      control: 'boolean',
      description: 'The default selected state of the checkbox.',
      defaultValue: false,
    },
  },
  render: (args: CheckboxProps) => (
    <Checkbox {...args}>
      <Checkbox.Indicator>
        <Checkbox.Icon>
          {({ isIndeterminate }) =>
            isIndeterminate ? <LineIcon /> : <CheckIcon />
          }
        </Checkbox.Icon>
      </Checkbox.Indicator>
      <Checkbox.Label>{args.children}</Checkbox.Label>
    </Checkbox>
  ),
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
    isIndeterminate: false,
    isReadOnly: false,
    isInvalid: false,
    isRequired: false,
    defaultSelected: false,
  },
};

export const Indeterminate: Story = {
  args: {
    ...Default.args,
    children: 'Indeterminate Checkbox',
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    children: 'Disabled Checkbox',
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    children: 'Read-Only Checkbox',
    isReadOnly: true,
    defaultSelected: true,
  },
};

export const Invalid: Story = {
  args: {
    ...Default.args,
    children: 'Invalid Checkbox',
    isInvalid: true,
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    children: 'Required Checkbox',
    isRequired: true,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    children: 'Large Checkbox',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    children: 'Small Checkbox',
    size: 'sm',
  },
};

export const CustomIcon: Story = {
  args: {
    ...Default.args,
    children: 'Custom Icon Checkbox',
  },
  render: (args: CheckboxProps) => (
    <Checkbox {...args}>
      <Checkbox.Indicator>
        <Checkbox.Icon>
          {({ isIndeterminate }) =>
            isIndeterminate ? (
              <span style={{ fontSize: '18px' }}>—</span>
            ) : (
              <HeartIcon />
            )
          }
        </Checkbox.Icon>
      </Checkbox.Indicator>
      <Checkbox.Label>{args.children}</Checkbox.Label>
    </Checkbox>
  ),
};

export const StateControl: Story = {
  args: {
    ...Default.args,
    children: 'Controlled Checkbox',
    defaultSelected: undefined,
  },
  render: (args: CheckboxProps) => {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="flex flex-col justify-center items-start gap-4">
        <Checkbox
          {...args}
          isSelected={isSelected}
          onChange={setIsSelected}
          style={{ marginRight: '10px' }}
        >
          <Checkbox.Indicator>
            <Checkbox.Icon>
              {({ isIndeterminate }) =>
                isIndeterminate ? <LineIcon /> : <CheckIcon />
              }
            </Checkbox.Icon>
          </Checkbox.Indicator>
          <Checkbox.Label>{args.children}</Checkbox.Label>
        </Checkbox>
        <button onClick={() => setIsSelected(!isSelected)}>
          Toggle Checkbox
        </button>
        <span>Checkbox is {isSelected ? 'checked' : 'unchecked'}</span>
      </div>
    );
  },
};
