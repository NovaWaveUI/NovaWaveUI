import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonProps } from '../src/button/index';
import Button, { ButtonRoot } from '../src/button/index';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the button.',
      defaultValue: 'Button',
    },
    color: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
      ],
      description: 'The color of the button.',
      defaultValue: 'neutral',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button.',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'light'],
      description: 'The variant of the button.',
      defaultValue: 'solid',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'The border radius of the button.',
      defaultValue: 'md',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
      defaultValue: false,
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state.',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    color: 'neutral',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
  },
};

export const ChildrenFunction: Story = {
  args: {
    children: props => (props.isLoading ? 'Loading...' : 'Button'),
    color: 'primary',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: true,
  },
};

export const ClassnameFunction: Story = {
  args: {
    children: 'Button',
    className: ({ isDisabled }) =>
      isDisabled ? '!bg-secondary-500' : '!bg-green-500',
    color: 'primary',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: true,
  },
};

export const StateControlled: Story = {
  args: {
    children: 'Button',
    color: 'neutral',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
  },
  render: args => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <Button {...args} isLoading={isLoading} onPress={handleClick}>
        {isLoading ? 'Loading...' : 'Click Me'}
      </Button>
    );
  },
};

export const Polymorphic: Story = {
  args: {
    children: 'Button',
    color: 'neutral',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
  },
  render: args => {
    return (
      <div className="flex flex-col gap-4">
        <Button
          {...(args as ButtonProps<'a'>)}
          as="a"
          href="#"
          target="_blank"
          rel="noreferrer"
        >
          Link Button
        </Button>
        <Button {...(args as ButtonProps<'div'>)} as="div">
          Div Button
        </Button>
        <Button {...(args as ButtonProps<'span'>)} as="span">
          Span Button
        </Button>
      </div>
    );
  },
};

export const WithStartAndEndContent: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
    startContent: '🚀',
    endContent: '➡️',
  },
};

export const SlotAPIWay: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
  },
  render: args => (
    <Button.Root {...args}>
      <Button.StartContent>🚀</Button.StartContent>
      <Button.Text>Button</Button.Text>
      <Button.EndContent>➡️</Button.EndContent>
    </Button.Root>
  ),
};
