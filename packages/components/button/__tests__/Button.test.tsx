import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { NovaWaveUIProvider } from '@novawaveui/provider';
import { axe } from 'jest-axe';
import userEvent, { UserEvent } from '@testing-library/user-event';
import Button from '../src/Button';

const ProviderWrapper = ({ children }) => (
  <NovaWaveUIProvider>{children}</NovaWaveUIProvider>
);

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
    const onPress = vitest.fn();
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
    const onPress = vitest.fn();
    const onClick = vitest.fn();
    const wrapper = render(<Button onPress={onPress}>Click Me</Button>, {
      wrapper: ProviderWrapper,
    });

    const button = wrapper.getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should trigger custom onPress event', async () => {
    const onPress = vitest.fn();
    const wrapper = render(<Button onPress={onPress}>Click Me</Button>, {
      wrapper: ProviderWrapper,
    });

    const button = wrapper.getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
  });
});
