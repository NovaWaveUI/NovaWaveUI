import type { Meta } from '@storybook/react';
import { Button } from '../src/index';
import { buttonStyles } from '@novawaveui/theme';
import { ButtonProps } from '../src/Button';
import { heroIcons, NovaWaveIcon } from '@novawaveui/novawaveicon';

const iconNames = Object.keys(
  heroIcons.solid
) as (keyof typeof heroIcons.solid)[];

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
    isDisabled: {
      control: { type: 'boolean' },
    },
    children: {
      type: 'string',
    },
    startContent: {
      options: iconNames,
      mapping: Object.fromEntries(
        iconNames.map(iconName => [
          iconName,
          <NovaWaveIcon
            key={iconName}
            icon={iconName}
            variant="solid"
            color="auto"
          />,
        ])
      ),
      control: { type: 'select' },
    },
    endContent: {
      options: iconNames,
      mapping: Object.fromEntries(
        iconNames.map(iconName => [
          iconName,
          <NovaWaveIcon
            key={iconName}
            icon={iconName}
            variant="solid"
            color="auto"
          />,
        ])
      ),
      control: { type: 'select' },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

const defaultProps = {
  ...buttonStyles.defaultVariants,
};

const Template = (args: ButtonProps) => <Button {...args} />;

export const Default = {
  render: Template,
  args: {
    children: 'Button',
    ...defaultProps,
  },
};

export const Solid = {
  render: Template,
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
};

export const Faded = {
  render: Template,
  args: {
    children: 'Button',
    variant: 'faded',
  },
};

export const Bordered = {
  render: Template,
  args: {
    children: 'Button',
    variant: 'bordered',
  },
};

export const Ghost = {
  render: Template,
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const Light = {
  render: Template,
  args: {
    children: 'Button',
    variant: 'light',
  },
};

export const Primary = {
  render: Template,
  args: {
    children: 'Button',
    color: 'primary',
  },
};

export const Secondary = {
  render: Template,
  args: {
    children: 'Button',
    color: 'secondary',
  },
};

export const Success = {
  render: Template,
  args: {
    children: 'Button',
    color: 'success',
  },
};

export const Warning = {
  render: Template,
  args: {
    children: 'Button',
    color: 'warning',
  },
};

export const Danger = {
  render: Template,
  args: {
    children: 'Button',
    color: 'danger',
  },
};

export const Disabled = {
  render: Template,
  args: {
    children: 'Button',
    isDisabled: true,
  },
};

export const Loading = {
  render: Template,
  args: {
    children: 'Button',
    isLoading: true,
  },
};

export const IconOnly = {
  render: Template,
  args: {
    children: undefined,
    isIconOnly: true,
    startContent: 'StarIcon',
  },
};
