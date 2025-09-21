import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ButtonRoot from './ButtonRoot';

describe('ButtonRoot', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<ButtonRoot>Click me</ButtonRoot>);
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
      <ButtonRoot color="primary" size="lg" variant="bordered" radius="full">
        Custom
      </ButtonRoot>
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('data-color', 'primary');
    expect(btn).toHaveAttribute('data-size', 'lg');
    expect(btn).toHaveAttribute('data-variant', 'bordered');
    expect(btn).toHaveAttribute('data-radius', 'full');
  });

  it('renders as a different element', () => {
    const { getByText } = render(
      <ButtonRoot as="a" href="https://example.com">
        Link
      </ButtonRoot>
    );
    const link = getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('removes interaction handlers when disabled', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <ButtonRoot isDisabled onClick={onClick}>
        Disabled
      </ButtonRoot>
    );
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('data-disabled', 'true');
  });

  it('removes interaction handlers when loading', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <ButtonRoot isLoading onClick={onClick}>
        Loading
      </ButtonRoot>
    );
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('data-loading', 'true');
  });

  it('calls onClick when interactive', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <ButtonRoot onClick={onClick}>Active</ButtonRoot>
    );
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders children', () => {
    const { getByText } = render(<ButtonRoot>Child</ButtonRoot>);
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('sets correct data attributes for state', () => {
    const { getByRole } = render(
      <ButtonRoot isDisabled isLoading>
        States
      </ButtonRoot>
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('data-disabled', 'true');
    expect(btn).toHaveAttribute('data-loading', 'true');
  });
});
