import type { Meta, StoryObj } from '@storybook/react';
import { checkboxStyles } from '@novawaveui/theme';
import { Checkbox } from '../src/index';
import { CheckboxProps } from '../src/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

const defaultProps = {
  ...checkboxStyles.defaultVariants,
};

const Template = (args: CheckboxProps) => <Checkbox {...args} />;

export const Default = {
  render: Template,
  args: {
    children: 'Checkbox',
    ...defaultProps,
  },
};
