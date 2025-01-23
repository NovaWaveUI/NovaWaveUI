import type { Meta } from '@storybook/react';
import { Button } from '../src/index';
import { buttonStyles } from '../src/styles/button';
import { ButtonProps } from '../src/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
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
    variant: {
      control: { type: 'select' },
      options: ['solid', 'faded', 'bordered', 'ghost', 'light'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

const defaultProps = {
  ...buttonStyles.defaultVariants,
};

const Template = (args: ButtonProps) => <Button {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
