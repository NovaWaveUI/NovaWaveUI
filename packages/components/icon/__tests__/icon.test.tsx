import '@testing-library/jest-dom';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { NovaWaveUIProvider } from '@novawaveui/provider';
import { render } from '@testing-library/react';
import { Icon } from '../src';

const ProviderWrapper = ({ children }) => {
  return <NovaWaveUIProvider>{children}</NovaWaveUIProvider>;
};

const customRender = (ui: React.ReactElement, options?: any) => {
  return render(ui, { wrapper: ProviderWrapper, ...options });
};

const folderDownloadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
    />
  </svg>
);

describe('icon', () => {
  it('renders correctly', () => {
    const wrapper = customRender(
      <Icon data-testid="icon">{folderDownloadIcon}</Icon>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('renders correctly with custom data-* attributes', () => {
    const wrapper = customRender(
      <Icon data-testid="icon" data-custom="custom">
        {folderDownloadIcon}
      </Icon>
    );

    expect(wrapper.getByTestId('icon')).toHaveAttribute(
      'data-custom',
      'custom'
    );
  });

  it('renders correctly with size', () => {
    const wrapper = customRender(
      <Icon size="md" data-testid="icon">
        {folderDownloadIcon}
      </Icon>
    );

    expect(wrapper.getByTestId('icon')).toHaveClass('w-6 h-6');
  });

  it('contains data-icon attribute when provided icon name', () => {
    const wrapper = customRender(
      <Icon iconName="folder-download" data-testid="icon">
        {folderDownloadIcon}
      </Icon>
    );

    expect(wrapper.getByTestId('icon')).toHaveAttribute(
      'data-icon',
      'folder-download'
    );
  });
});
