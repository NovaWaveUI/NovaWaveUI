import { Meta } from '@storybook/react';
import ToggleButtonGroup from '../src/ToggleButtonGroup';
import { toggleButtonGroup } from '@novawaveui/theme';
import { ToggleButton } from '../src';
import { NovaWaveIcon } from '@novawaveui/novawaveicon';

const meta = {
  title: 'Components/Toggle Button Group',
  component: ToggleButtonGroup,
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
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
  },
  parameters: {
    controls: {
      exclude: /^(ref|children)$/,
    },
  },
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;

const defaultProps = {
  ...toggleButtonGroup.defaultVariants,
};

const Template = (args: any) => {
  return (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="button1">Button 1</ToggleButton>
      <ToggleButton id="button2">Button 2</ToggleButton>
      <ToggleButton id="button3">Button 3</ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

const TemplateIcons = (args: any) => {
  return (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="bold" isIconOnly>
        <NovaWaveIcon icon="BoldIcon" variant="solid" />
      </ToggleButton>
      <ToggleButton id="italic" isIconOnly>
        <NovaWaveIcon icon="ItalicIcon" variant="solid" />
      </ToggleButton>
      <ToggleButton id="underline" isIconOnly>
        <NovaWaveIcon icon="UnderlineIcon" variant="solid" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const IconOnly = {
  render: TemplateIcons,
  args: {
    ...defaultProps,
  },
};

const TemplateOneDisabled = (args: any) => {
  return (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="button1" isDisabled>
        Button 1
      </ToggleButton>
      <ToggleButton id="button2">Button 2</ToggleButton>
      <ToggleButton id="button3">Button 3</ToggleButton>
    </ToggleButtonGroup>
  );
};

export const OneDisabled = {
  render: TemplateOneDisabled,
  args: {
    ...defaultProps,
  },
};
