import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../src/button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default = {
  render: (args: Story) => <Button {...args} />,
  args: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
};
