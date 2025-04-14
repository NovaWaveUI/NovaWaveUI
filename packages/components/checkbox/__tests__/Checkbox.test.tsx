import '@testing-library/jest-dom';
import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { NovaWaveUIProvider } from '@novawaveui/provider';
import { toHaveNoViolations } from 'jest-axe';
import Checkbox from '../src/Checkbox';

const ProviderWrapper = ({ children }) => (
  <NovaWaveUIProvider>{children}</NovaWaveUIProvider>
);

expect.extend(toHaveNoViolations);

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = render(<Checkbox />, {
      wrapper: ProviderWrapper,
    });

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('forwards a ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = render(<Checkbox ref={ref} />, {
      wrapper: ProviderWrapper,
    });

    expect(ref.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
