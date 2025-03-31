import { describe, it } from '@jest/globals';
import { createNonSlotComposer } from '../composer';

describe('createNonSlotVariants', () => {
  it('should handle a basic common configuration', () => {
    const testOut = createNonSlotComposer({
      base: ['base-class', 'array-of-classes'],
      variants: {
        color: {
          primary: 'text-blue-500',
          secondary: 'text-green-500',
          danger: 'text-red-500',
        },
        isDisabled: {
          true: 'opacity-50 cursor-not-allowed',
        },
        isBig: {
          true: 'text-lg',
          false: 'text-sm',
        },
        isHappy: {
          false: 'text-gray-700',
        },
        size: {
          small: 'text-xs',
          medium: 'text-sm',
          large: 'text-lg',
        },
      },
      defaultVariants: {
        color: 'primary', // Default to primary color
        isDisabled: true, // Default to disabled
        isBig: false, // Default to not big
        size: 'medium', // Default to medium size
      },
    });

    testOut.extend({
      variants: {
        color: {
          primary: 'text-blue-extended-500', // Existing color variant
          warning: 'text-yellow-500', // Adding a new color variant
        },
        newVariant: {
          hereIsAnOption: 'new-option-class', // Adding a new variant
        },
        newBooleanVariant: {
          true: 'new-boolean-true-class',
        },
      },
      defaultVariants: {
        color: 'warning',
        size: 'large',
      },
      compoundVariants: [
        {
          color: 'warning',
          newVariant: 'hereIsAnOption',
          newBooleanVariant: true,
          className: 'compound-warning-option', // This class will be applied if all conditions are met
        },
      ],
    });
  });
});
