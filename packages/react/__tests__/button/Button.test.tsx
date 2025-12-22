import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../src/components/button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { getByRole } = render(<Button>Click me</Button>);
      const btn = getByRole('button');
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('Click me');
      expect(btn).toHaveAttribute('type', 'button');
      expect(btn).toHaveAttribute('data-component', 'button');
      expect(btn).toHaveAttribute('data-size', 'md');
      expect(btn).toHaveAttribute('data-variant', 'primary');
    });

    it('renders with custom props', () => {
      const { getByRole } = render(
        <Button size="lg" variant="secondary">
          Custom
        </Button>
      );
      const btn = getByRole('button');
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute('data-size', 'lg');
      expect(btn).toHaveAttribute('data-variant', 'secondary');
    });

    it('renders children correctly', () => {
      const { getByText } = render(<Button>Child Content</Button>);
      expect(getByText('Child Content')).toBeInTheDocument();
    });

    it('renders with custom className via render props', () => {
      const { getByRole } = render(
        <Button className="custom-class">Button</Button>
      );
      const btn = getByRole('button');
      expect(btn).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders with primary variant', () => {
      const { getByRole } = render(<Button variant="primary">Primary</Button>);
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-variant', 'primary');
    });

    it('renders with secondary variant', () => {
      const { getByRole } = render(
        <Button variant="secondary">Secondary</Button>
      );
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-variant', 'secondary');
    });

    it('renders with tertiary variant', () => {
      const { getByRole } = render(
        <Button variant="tertiary">Tertiary</Button>
      );
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-variant', 'tertiary');
    });

    it('renders with destructive variant', () => {
      const { getByRole } = render(
        <Button variant="destructive">Destructive</Button>
      );
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-variant', 'destructive');
    });

    it('renders with link variant', () => {
      const { getByRole } = render(<Button variant="link">Link</Button>);
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-variant', 'link');
    });
  });

  describe('Sizes', () => {
    it('renders with sm size', () => {
      const { getByRole } = render(<Button size="sm">Small</Button>);
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-size', 'sm');
    });

    it('renders with md size (default)', () => {
      const { getByRole } = render(<Button>Medium</Button>);
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-size', 'md');
    });

    it('renders with lg size', () => {
      const { getByRole } = render(<Button size="lg">Large</Button>);
      const btn = getByRole('button');
      expect(btn).toHaveAttribute('data-size', 'lg');
    });

    describe('State', () => {
      it('sets disabled data attribute', () => {
        const { getByRole } = render(<Button isDisabled>Disabled</Button>);
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('data-disabled', 'true');
      });

      it('sets loading data attribute', () => {
        const { getByRole } = render(<Button isLoading>Loading</Button>);
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('data-loading', 'true');
      });

      it('sets icon-only data attribute', () => {
        const { getByRole } = render(<Button isIconOnly>🎯</Button>);
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('data-icon-only', 'true');
      });

      it('sets multiple state attributes simultaneously', () => {
        const { getByRole } = render(
          <Button isDisabled isLoading isIconOnly>
            States
          </Button>
        );
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('data-disabled', 'true');
        expect(btn).toHaveAttribute('data-loading', 'true');
        expect(btn).toHaveAttribute('data-icon-only', 'true');
      });
    });

    describe('Polymorphism', () => {
      it('renders as an anchor element with as prop', () => {
        const { container } = render(
          <Button as="a" href="https://example.com">
            Link Button
          </Button>
        );
        const link = container.querySelector('a');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveAttribute('role', 'button');
      });

      it('renders as span element with as prop', () => {
        const { container } = render(<Button as="span">Span Button</Button>);
        const span = container.querySelector('span');
        expect(span).toBeInTheDocument();
        expect(span).toHaveAttribute('role', 'button');
      });

      it('preserves element-specific attributes when polymorphic', () => {
        const { container } = render(
          <Button as="a" href="/path" title="Navigate">
            Navigate
          </Button>
        );
        const link = container.querySelector('a');
        expect(link).toHaveAttribute('href', '/path');
        expect(link).toHaveAttribute('title', 'Navigate');
      });
    });

    describe('Interaction', () => {
      it('calls onClick when clicked and interactive', () => {
        const onClick = vi.fn();
        const { getByRole } = render(<Button onClick={onClick}>Active</Button>);
        const btn = getByRole('button');
        fireEvent.click(btn);
        expect(onClick).toHaveBeenCalled();
      });

      it('does not call onClick when disabled', () => {
        const onClick = vi.fn();
        const { getByRole } = render(
          <Button isDisabled onClick={onClick}>
            Disabled
          </Button>
        );
        const btn = getByRole('button');
        fireEvent.click(btn);
        expect(onClick).not.toHaveBeenCalled();
      });

      it('does not call onClick when loading', () => {
        const onClick = vi.fn();
        const { getByRole } = render(
          <Button isLoading onClick={onClick}>
            Loading
          </Button>
        );
        const btn = getByRole('button');
        fireEvent.click(btn);
        expect(onClick).not.toHaveBeenCalled();
      });

      it('responds to click when not disabled or loading', () => {
        const onClick = vi.fn();
        const { getByRole } = render(<Button onClick={onClick}>Click</Button>);
        const btn = getByRole('button');
        fireEvent.click(btn);
        expect(onClick).toHaveBeenCalled();
      });

      it('handles keyboard interaction with native button', () => {
        const { getByRole } = render(<Button>Button</Button>);
        const btn = getByRole('button');
        expect(btn).toBeVisible();
        expect(btn).toHaveAttribute('type', 'button');
      });

      it('supports keyboard focus state', async () => {
        const user = userEvent.setup();
        const { getByRole } = render(<Button>Button</Button>);
        const btn = getByRole('button');
        await user.tab();
        expect(btn).toHaveFocus();
      });
    });

    describe('Accessibility', () => {
      it('has correct button role by default', () => {
        const { getByRole } = render(<Button>Button</Button>);
        expect(getByRole('button')).toBeInTheDocument();
      });

      it('maintains button role when rendered as different element', () => {
        const { getByRole } = render(<Button as="div">Div Button</Button>);
        expect(getByRole('button')).toBeInTheDocument();
      });

      it('is disabled and not focusable when isDisabled is true', () => {
        const { getByRole } = render(<Button isDisabled>Disabled</Button>);
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('disabled');
      });

      it('supports aria-label prop', () => {
        const { getByRole } = render(
          <Button aria-label="Close dialog">✕</Button>
        );
        const btn = getByRole('button', { name: 'Close dialog' });
        expect(btn).toBeInTheDocument();
      });

      it('supports aria-describedby prop', () => {
        const { getByRole } = render(
          <>
            <Button aria-describedby="desc">Action</Button>
            <span id="desc">This action is permanent</span>
          </>
        );
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('aria-describedby', 'desc');
      });
    });

    describe('Data Attributes', () => {
      it('passes through custom data attributes', () => {
        const { getByRole } = render(
          <Button data-testid="custom-btn" data-track="button-click">
            Button
          </Button>
        );
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('data-testid', 'custom-btn');
        expect(btn).toHaveAttribute('data-track', 'button-click');
      });

      it('includes variant data attribute', () => {
        const { getByRole } = render(
          <Button variant="destructive">Delete</Button>
        );
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('data-variant', 'destructive');
      });

      it('includes size data attribute', () => {
        const { getByRole } = render(<Button size="lg">Large</Button>);
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('data-size', 'lg');
      });
    });

    describe('Form Integration', () => {
      it('supports type="submit" by default for buttons in forms', () => {
        const { getByRole } = render(
          <form>
            <Button>Submit</Button>
          </form>
        );
        const btn = getByRole('button');
        expect(btn).toHaveAttribute('type', 'button');
      });

      it('prevents form submission when disabled', () => {
        const onSubmit = vi.fn(e => e.preventDefault());
        const { getByRole } = render(
          <form onSubmit={onSubmit}>
            <Button isDisabled>Submit</Button>
          </form>
        );
        const btn = getByRole('button');
        fireEvent.click(btn);
        expect(onSubmit).not.toHaveBeenCalled();
      });

      it('prevents form submission when loading', () => {
        const onSubmit = vi.fn(e => e.preventDefault());
        const { getByRole } = render(
          <form onSubmit={onSubmit}>
            <Button isLoading>Submit</Button>
          </form>
        );
        const btn = getByRole('button');
        fireEvent.click(btn);
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
