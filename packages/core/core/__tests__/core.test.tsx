import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { extendComponent } from '../src';
import { Button, testButtonStyles } from '../src/no-slot-test';

describe('core', () => {
  it('should create a new extended component', () => {
    const ExtendedButton = extendComponent(
      Button,
      testButtonStyles.extend({
        variants: {
          color: {
            olive:
              'text-white bg-olive-600 hover:bg-olive-700 focus:ring-olive-500',
          },
          isScalable: {
            true: 'scale-110',
            false: 'scale-100',
          },
        },
        defaultVariants: {
          color: 'olive',
          isScalable: false,
        },
      })
    );
    console.log(
      'Display Name:',
      ExtendedButton.displayName || 'Unnamed Component'
    );
    const wrapper = render(<ExtendedButton color="olive" rounded="lg" />);
    const buttonElement = wrapper.container.querySelector('button');
    console.log(buttonElement?.className);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
