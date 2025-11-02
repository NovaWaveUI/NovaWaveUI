import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonProps } from '../src/components/button/index';
import { Button } from '../src/components/button/index';
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button.',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'link'],
      description: 'The variant of the button.',
      defaultValue: 'solid',
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
type Story = StoryObj<ButtonProps<any>>;

export const Default: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'primary',
    isDisabled: false,
    isLoading: false,
  },
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
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="tertiary">
        Tertiary
      </Button>
      <Button {...args} variant='destructive'>
        Destructive
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const ChildrenFunction: Story = {
  args: {
    children: ({ isLoading }) => (isLoading ? 'Loading...' : 'Button'),
    size: 'md',
    variant: 'primary',
    isDisabled: false,
    isLoading: true,
  },
};

export const ClassnameFunction: Story = {
  args: {
    children: 'Button',
    className: ({ isDisabled }) =>
      isDisabled ? '!bg-accent-500' : '!bg-green-500',
    size: 'md',
    variant: 'primary',
    isDisabled: false,
    isLoading: true,
  },
};

export const StateControlled: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'primary',
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
    size: 'md',
    variant: 'primary',
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
    size: 'md',
    variant: 'primary',
    isDisabled: false,
    isLoading: false,
  },
  render: args => (
    <Button {...args}>
      <Button.StartContent>
        <UserIcon />
      </Button.StartContent>
      <Button.Text>Log In</Button.Text>
      <Button.EndContent>
        <ArrowRightIcon />
      </Button.EndContent>
    </Button>
  ),
};

export const SlotAPIWay: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'primary',
    isDisabled: false,
    isLoading: false,
  },
  render: args => (
    <Button {...args}>
      <Button.StartContent>
        <UserIcon />
      </Button.StartContent>
      <Button.Text>Log In</Button.Text>
      <Button.EndContent>
        <ArrowRightIcon />
      </Button.EndContent>
    </Button>
  ),
};

export const NextJSLink: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'primary',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
  },
  render: args => {
    // Simulating Next.js Link component
    const Link = React.forwardRef<
      HTMLAnchorElement,
      React.ComponentPropsWithoutRef<'a'>
    >(({ href, children, ...rest }, ref) => (
      <a href={href} ref={ref} {...rest}>
        {children}
      </a>
    ));
    Link.displayName = 'Link';

    return (
      <Button
        {...(args as ButtonProps<'a'>)}
        as={Link}
        href="#"
        target="_blank"
        rel="noreferrer"
      >
        Home
      </Button>
    );
  },
};

export const AsChildProp: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    isDisabled: false,
    isLoading: false,
    asChild: true,
  },
  render: args => {
    return (
      <div className="flex flex-col gap-4">
        <Button {...(args as ButtonProps<'button'>)}>
          <a href="#" target="_blank" rel="noreferrer">
            Link Button
          </a>
        </Button>
      </div>
    );
  },
};
