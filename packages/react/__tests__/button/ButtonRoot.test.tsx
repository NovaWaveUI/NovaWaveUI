import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../src/Button/ButtonRoot';

describe('ButtonRoot', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const btn = getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Click me');
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toHaveAttribute('data-slot', 'root');
    expect(btn).toHaveAttribute('data-color', 'neutral');
    expect(btn).toHaveAttribute('data-size', 'md');
    expect(btn).toHaveAttribute('data-variant', 'solid');
    expect(btn).toHaveAttribute('data-radius', 'md');
  });

  it('renders with custom props', () => {
    const { getByRole } = render(
      <Button color="primary" size="lg" variant="bordered" radius="full">
        Custom
      </Button>
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('data-color', 'primary');
    expect(btn).toHaveAttribute('data-size', 'lg');
    expect(btn).toHaveAttribute('data-variant', 'bordered');
    expect(btn).toHaveAttribute('data-radius', 'full');
  });

  it('renders as a different element', () => {
    const { getByText } = render(
      <Button as="a" href="https://example.com">
        Link
      </Button>
    );
    const link = getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('removes interaction handlers when disabled', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Button isDisabled onClick={onClick}>
        Disabled
      </Button>
    );
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('data-disabled', 'true');
  });

  it('removes interaction handlers when loading', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Button isLoading onClick={onClick}>
        Loading
      </Button>
    );
    const btn = getByRole('button');
    console.log(btn);
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('data-loading', 'true');
  });

  it('calls onClick when interactive', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Active</Button>);
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders children', () => {
    const { getByText } = render(<Button>Child</Button>);
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('sets correct data attributes for state', () => {
    const { getByRole } = render(
      <Button isDisabled isLoading>
        States
      </Button>
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('data-disabled', 'true');
    expect(btn).toHaveAttribute('data-loading', 'true');
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
