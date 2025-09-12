import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Checkbox, CheckboxRoot } from '../src/index';

const meta: Meta<typeof CheckboxRoot> = {
  title: 'Components/Checkbox',
  component: CheckboxRoot,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: [
        'neutral',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxRoot>;

export const Default = {
  render: (args: Story) => (
    <Checkbox.Root {...args}>
      <Checkbox.Input />
      <Checkbox.Icon asChild>
        <CheckIcon />
      </Checkbox.Icon>
      <Checkbox.Label>Checkbox</Checkbox.Label>
    </Checkbox.Root>
  ),
  args: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
};
