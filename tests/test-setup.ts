import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  enumerable: true,
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.console.error = jest.fn().mockImplementation(message => {
  if (
    message &&
    typeof message === 'string' &&
    message.includes('Warning: `ReactDOMTestUtils.act`')
  ) {
    return;
  }
});

configure({ reactStrictMode: process.env.STRICT_MODE === 'true' });
