import type { Meta, StoryObj } from '@storybook/react';
import { togglebuttonStyles } from '@novawaveui/theme';
import { Togglebutton } from '../src/index';
import { TogglebuttonProps } from '../src/Togglebutton';

const meta: Meta<typeof Togglebutton> = {
  title: 'Components/Togglebutton',
  component: Togglebutton,
  tags: ['autodocs']
} satisfies Meta<typeof Togglebutton>;

export default meta;

const defaultProps = {
  ...togglebuttonStyles.defaultVariants,
};

const Template = (args: TogglebuttonProps) => <Togglebutton {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
}
