// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from '../src';

const click = (el: HTMLElement) => {
  fireEvent.click(el);
};

describe('Button (headless)', () => {
  describe('Rendering', () => {
    it('renders a native button with defaults', () => {
      render(<Button>Press me</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Press me');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('data-component', 'button');
      expect(button).not.toHaveAttribute('data-disabled');
      expect(button).not.toHaveAttribute('data-loading');
    });

    it('supports polymorphic rendering', () => {
      render(
        <Button as="a" href="#section">
          Linky
        </Button>,
      );
      const anchor = screen.getByRole('button');

      expect(anchor.tagName).toBe('A');
      expect(anchor).toHaveAttribute('href', '#section');
      expect(anchor).toHaveAttribute('data-component', 'button');
    });

    it('renders render-prop children with state values', () => {
      render(
        <Button isDisabled>
          {({ isDisabled }) => (
            <span>State: {isDisabled ? 'disabled' : 'active'}</span>
          )}
        </Button>,
      );

      expect(screen.getByText('State: disabled')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('fires onPress when interactive', () => {
      const onPress = vi.fn();
      render(<Button onPress={onPress}>Press</Button>);
      const button = screen.getByRole('button');

      click(button);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not fire onPress when disabled', () => {
      const onPress = vi.fn();
      render(
        <Button isDisabled onPress={onPress}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole('button');

      click(button);
      expect(onPress).not.toHaveBeenCalled();
      expect(button).toHaveAttribute('data-disabled', 'true');
    });

    it('does not fire onPress when loading and forces safe type', () => {
      const onPress = vi.fn();
      render(
        <Button type="submit" isLoading onPress={onPress}>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');

      click(button);
      expect(onPress).not.toHaveBeenCalled();
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Data attributes', () => {
    it('marks icon-only buttons', () => {
      render(<Button isIconOnly aria-label="Icon only" />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('data-icon-only', 'true');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Accessible</Button>);
      // Skip color-contrast rule for tests as it is not relevant in headless components
      // We will also be testing accessibility in the styled versions of the components
      // via Storybook vitest addon
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
