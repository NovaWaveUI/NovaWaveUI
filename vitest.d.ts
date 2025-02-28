import 'vitest';

interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): () => R;
}

declare module 'vitest' {
  export interface Assertion<T = any> extends CustomMatchers<T> {}
  export interface AsymmetricMatchersContaining extends CustomMatchers {}
}
