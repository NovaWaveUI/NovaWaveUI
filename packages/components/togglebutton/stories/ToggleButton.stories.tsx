import type { Meta } from '@storybook/react';
import { toggleButtonStyles } from '@novawaveui/theme';
import { heroIcons, NovaWaveIcon } from '@novawaveui/novawaveicon';
import { ToggleButton } from '../src/index';
import { ToggleButtonProps } from '../src/ToggleButton';

const iconNames = Object.keys(
  heroIcons.solid
) as (keyof typeof heroIcons.solid)[];

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/Toggle Button',
  component: ToggleButton,
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
} satisfies Meta<typeof ToggleButton>;

export default meta;

const defaultProps = {
  ...toggleButtonStyles.defaultVariants,
};

const Template = (args: ToggleButtonProps) => <ToggleButton {...args} />;

export const Default = {
  render: Template,
  parameters: {
    controls: {
      exclude: /isSelected$|as$|ref$|motionProps$/,
    },
  },
  args: {
    ...defaultProps,
    children: 'Button',
  },
};
