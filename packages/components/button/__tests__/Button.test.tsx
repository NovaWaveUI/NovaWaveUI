import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NovaWaveUIProvider } from '@novawaveui/provider';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { ButtonProps } from '@react-types/button';
import { testButtonStyles } from '@novawaveui/theme';
import { extendButton } from '../src/extendButton';
import Button from '../src/Button';

const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <NovaWaveUIProvider>{children}</NovaWaveUIProvider>;

expect.extend(toHaveNoViolations);

describe('Button', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders correctly', () => {
    const wrapper = render(<Button>Click Me</Button>, {
      wrapper: ProviderWrapper,
    });

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('forwards a ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const wrapper = render(<Button ref={ref}>Click Me</Button>, {
      wrapper: ProviderWrapper,
    });

    expect(ref.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders with start content', () => {
    const wrapper = render(
      <Button startContent={<span>👋</span>}>Click Me</Button>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders with end content', () => {
    const wrapper = render(
      <Button endContent={<span>👋</span>}>Click Me</Button>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders with start and end content', () => {
    const wrapper = render(
      <Button startContent={<span>👋</span>} endContent={<span>👋</span>}>
        Click Me
      </Button>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders children correctly', () => {
    const wrapper = render(
      <Button>
        <span>👋</span>
      </Button>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('has no accessibility violations', async () => {
    const wrapper = render(<Button>Click Me</Button>, {
      wrapper: ProviderWrapper,
    });

    const results = await axe(wrapper.container);

    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with start content', async () => {
    const wrapper = render(
      <Button startContent={<span>👋</span>}>Click Me</Button>,
      {
        wrapper: ProviderWrapper,
      }
    );

    const results = await axe(wrapper.container);

    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with end content', async () => {
    const wrapper = render(
      <Button endContent={<span>👋</span>}>Click Me</Button>,
      {
        wrapper: ProviderWrapper,
      }
    );

    const results = await axe(wrapper.container);

    expect(results).toHaveNoViolations();
  });

  it('should ignore events when disabled', async () => {
    const onPress = jest.fn();
    const wrapper = render(
      <Button isDisabled onPress={onPress}>
        Click Me
      </Button>,
      {
        wrapper: ProviderWrapper,
      }
    );

    const button = wrapper.getByRole('button');

    await user.click(button);

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should call onPress when clicked', async () => {
    const onPress = jest.fn();
    const onClick = jest.fn();
    const wrapper = render(<Button onPress={onPress}>Click Me</Button>, {
      wrapper: ProviderWrapper,
    });

    const button = wrapper.getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should trigger custom onPress event', async () => {
    const onPress = jest.fn();
    const wrapper = render(<Button onPress={onPress}>Click Me</Button>, {
      wrapper: ProviderWrapper,
    });

    const button = wrapper.getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
  });

  it('should allow for a custom style to be given', () => {
    const extendedButtonStyles = testButtonStyles.extend({
      variants: {
        color: {
          teal: 'text-teal-500',
        },
        someOtherVariant: {
          someOtherValue: 'text-red-500',
          someOtherValueTwo: 'text-blue-500',
        },
      },
    });

    const CustomButton = extendButton(extendedButtonStyles);

    const wrapper = render(<CustomButton color="teal">Click Me</CustomButton>, {
      wrapper: ProviderWrapper,
    });

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
