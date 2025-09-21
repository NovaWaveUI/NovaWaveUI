import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonProps } from '../src/Button/index';
import Button from '../src/Button/index';
import { UserIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
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
      options: ['solid', 'bordered', 'ghost', 'light'],
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

export const Colors: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'solid',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
  },
  render: args => (
    <div className="flex flex-col gap-4 max-w-3xs">
      <Button {...args} color="neutral">
        Neutral
      </Button>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="danger">
        Danger
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    size: 'md',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
  },
  render: args => (
    <div className="flex flex-col gap-4 max-w-3xs">
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="bordered">
        Bordered
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="light">
        Light
      </Button>
    </div>
  ),
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
      <Button
        {...args}
        isLoading={isLoading}
        onPress={handleClick}
        type="submit"
      >
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
      <Button.StartContent>
        <UserIcon />
      </Button.StartContent>
      <Button.Text>Log In</Button.Text>
      <Button.EndContent>
        <ArrowRightIcon />
      </Button.EndContent>
    </Button.Root>
  ),
};
