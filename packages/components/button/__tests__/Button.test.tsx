import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../src/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
