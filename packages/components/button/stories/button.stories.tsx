import type { Meta } from '@storybook/react';
import { Button } from '../src/index';

const meta = {
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;

const Template = args => <Button {...args} />;

export const Default = {
  render: Template,
  args: {},
};
