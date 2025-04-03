// eslint-disable unicorn/prevent-abbreviations
import React, { useMemo } from 'react';
import {
  createNonSlotComposer,
  ExtractVariantNonSlottedProps,
} from '@novawaveui/tailwind-composer';
import { NovaWaveUIProps } from './types';
import { mapPropsToVariants, objectToDeps } from './utils';

const testButtonStyles = createNonSlotComposer({
  base: 'inline-flex items-center justify-center rounded-md border border-transparent text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    color: {
      primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
      danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
      success:
        'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
      warning:
        'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      info: 'text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300',
      light: 'text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-100',
      dark: 'text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-700',
    },
    size: {
      sm: 'px-2.5 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      none: 'shadow-none',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    rounded: 'md',
    shadow: 'md',
  },
  compoundVariants: [
    {
      color: 'primary',
      size: 'sm',
      className: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
    {
      color: 'secondary',
      size: 'sm',
      className: 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    },
  ],
});

interface ButtonProps
  extends Omit<NovaWaveUIProps<'button'>, 'color'>,
    ExtractVariantNonSlottedProps<typeof testButtonStyles> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, _ref) => {
    const { children, className, ...rest } = props;
    const [, variantProps] = mapPropsToVariants(
      props,
      testButtonStyles.variantKeys!,
      false
    );

    const styles = useMemo(
      () => testButtonStyles({ ...variantProps, className }),
      [objectToDeps(variantProps), className]
    );

    const domRef = React.useRef<HTMLButtonElement>(null);

    return (
      <button
        ref={domRef}
        className={styles}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'NovaWaveUIButtonTest';

export { Button, testButtonStyles };
