import '@testing-library/jest-dom';
import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NovaWaveUIProvider } from '@novawaveui/provider';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { ToggleButton } from '../src/index';

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <NovaWaveUIProvider>{children}</NovaWaveUIProvider>
);

expect.extend(toHaveNoViolations);

describe('ToggleButton', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders correctly', () => {
    const wrapper = render(<ToggleButton>Click Me</ToggleButton>, {
      wrapper: ProviderWrapper,
    });

    const button = wrapper.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('forwards a ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const wrapper = render(<ToggleButton ref={ref}>Click Me</ToggleButton>, {
      wrapper: ProviderWrapper,
    });

    expect(ref.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders with start content', () => {
    const wrapper = render(
      <ToggleButton startContent={<span>👋</span>}>Click Me</ToggleButton>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders with end content', () => {
    const wrapper = render(
      <ToggleButton endContent={<span>👋</span>}>Click Me</ToggleButton>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders with start and end content', () => {
    const wrapper = render(
      <ToggleButton startContent={<span>👋</span>} endContent={<span>👋</span>}>
        Click Me
      </ToggleButton>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders children correctly', () => {
    const wrapper = render(
      <ToggleButton>
        <span>Hello</span>
      </ToggleButton>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('passes accessibility tests', async () => {
    const { container } = render(
      <ToggleButton>
        <span>Hello</span>
      </ToggleButton>,
      {
        wrapper: ProviderWrapper,
      }
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should toggle when clicked', async () => {
    const wrapper = render(<ToggleButton>Toggle Me</ToggleButton>, {
      wrapper: ProviderWrapper,
    });

    const button = wrapper.getByRole('button');

    // Initial state - not pressed
    expect(button).toHaveAttribute('aria-pressed', 'false');

    // Click to toggle on
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');

    // Click to toggle off
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('should call onPress when clicked', async () => {
    const onPress = jest.fn();
    const wrapper = render(
      <ToggleButton onPress={onPress}>Click Me</ToggleButton>,
      {
        wrapper: ProviderWrapper,
      }
    );

    const button = wrapper.getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
  });
});
