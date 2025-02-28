import type { Meta } from '@storybook/react';
import ButtonGroup, { ButtonGroupProps } from '../src/ButtonGroup';
import { buttonGroup } from '../../../core/theme/src/components/button';
import { Button } from '../src';

const meta = {
  title: 'Components/Button Group',
  component: ButtonGroup,
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
    isDisabled: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    controls: {
      exclude: /^(ref|children)$/,
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

const defaultProps = {
  ...buttonGroup.defaultVariants,
};

const Template = (args: ButtonGroupProps) => {
  return (
    <ButtonGroup {...args}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Vertical = {
  render: Template,
  args: {
    ...defaultProps,
    isVertical: true,
  },
};
