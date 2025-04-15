import '@testing-library/jest-dom';
import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NovaWaveUIProvider } from '@novawaveui/provider';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ToggleButton } from '../src/index';

const ProviderWrapper = ({ children }) => (
  <NovaWaveUIProvider>{children}</NovaWaveUIProvider>
);

expect.extend(toHaveNoViolations);

describe('Togglebutton', () => {
  it('renders correctly', () => {
    const wrapper = render(<ToggleButton />, {
      wrapper: ProviderWrapper,
    });

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('forwards a ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const wrapper = render(<ToggleButton ref={ref} />, {
      wrapper: ProviderWrapper,
    });

    expect(ref.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
