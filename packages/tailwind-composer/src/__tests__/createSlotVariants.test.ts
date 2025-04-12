import { describe, expect, it } from '@jest/globals';
import { createSlotComposer } from '../composer';

describe('createSlotVariants', () => {
  it('should handle a basic slot configuration', () => {
    const testConfig = createSlotComposer({
      slots: {
        header: 'header-class', // Base class for the header slot
        footer: 'footer-class', // Base class for the footer slot
      },
      variants: {
        color: {
          primary: {
            header: 'text-blue-500', // Header class for primary color
            footer: 'text-blue-300', // Footer class for primary color
          },
          secondary: {
            header: 'text-green-500',
          },
        },
        size: {
          sm: {
            header: 'text-sm', // Header class for small size
            footer: 'text-sm', // Footer class for small size
          },
          lg: {
            header: 'text-lg', // Header class for large size
            footer: 'text-lg', // Footer class for large size
          },
        },
        isDisabled: {
          true: {
            footer: 'opacity-50 cursor-not-allowed', // Footer class for disabled state
          },
        },
      },
      defaultVariants: {
        isDisabled: false,
        color: 'primary',
      },
      compoundVariants: [
        {
          color: 'primary',
          size: ['sm', 'lg'],
          className: {
            footer: 'primary-sm-footer-class',
          },
        },
      ],
    });

    const { header, footer } = testConfig({
      isDisabled: false,
      color: 'primary',
    });

    let expectedClasses = ['header-class', 'text-blue-500'];
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(header()).toHaveClass(expectedClasses);

    expectedClasses = ['footer-class', 'text-blue-300'];
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(footer()).toHaveClass(expectedClasses);

    // Test extending the configuration
    const extendedTestConfig = testConfig.extend({
      slots: {
        body: 'body-class', // Adding a new slot for the body
      },
      variants: {
        color: {
          primary: {
            body: 'text-blue-700', // Body class for primary color
          },
        },
        newVariant: {
          someValue: {
            header: 'new-header-class', // New variant for header
            footer: 'new-footer-class', // New variant for footer,
            body: 'new-body-class', // New variant for body
          },
        },
        isDisabled: {
          true: {
            header: 'opacity-50 cursor-not-allowed', // Header class for disabled state
            body: 'opacity-50 cursor-not-allowed', // Body class for disabled state
          },
          false: {
            body: 'opacity-100 cursor-auto', // Body class for enabled state
          },
        },
      },
      defaultVariants: {
        color: 'primary',
        isDisabled: false,
        newVariant: 'someValue',
        size: 'sm',
      },
      compoundVariants: [
        {
          newVariant: 'someValue',
          size: ['sm', 'lg'],
          className: {
            body: 'new-someValue-sm-body-class', // This class will be applied if the new variant and size conditions are met
          },
        },
      ],
    });

    const {
      header: extendedHeader,
      footer: extendedFooter,
      body: extendedBody,
    } = extendedTestConfig({ isDisabled: false, color: 'primary', size: 'sm' });

    let result = extendedHeader();
    expectedClasses = [
      'header-class',
      'text-blue-500',
      'new-header-class',
      'text-sm',
    ];
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(result).toHaveClass(expectedClasses);

    result = extendedFooter();
    expectedClasses = [
      'footer-class',
      'text-blue-300',
      'new-footer-class',
      'text-sm',
      'primary-sm-footer-class',
    ];
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(result).toHaveClass(expectedClasses);

    result = extendedBody();
    expectedClasses = [
      'body-class',
      'text-blue-700',
      'opacity-100',
      'cursor-auto',
      'new-body-class',
      'new-someValue-sm-body-class',
    ];
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(result).toHaveClass(expectedClasses);

    result = extendedBody({ isDisabled: true });
    expectedClasses = [
      'body-class',
      'text-blue-700',
      'opacity-50',
      'cursor-not-allowed',
      'new-body-class',
      'new-someValue-sm-body-class',
    ];
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(result).toHaveClass(expectedClasses);
  });

  it('should work if className is passed in with the slot style functions', () => {
    const testConfig = createSlotComposer({
      slots: {
        header: 'header-class',
        footer: 'footer-class',
      },
      variants: {
        color: {
          primary: {
            header: 'text-blue-500',
            footer: 'text-blue-300',
          },
        },
        isDisabled: {
          true: {
            footer: 'opacity-50 cursor-not-allowed',
          },
        },
      },
      defaultVariants: {
        color: 'primary',
        isDisabled: false,
      },
    });

    const { header, footer } = testConfig({
      className: {
        header: 'custom-header-class',
        footer: 'custom-footer-class',
      },
    });

    // @ts-expect-error - toHaveClass is a custom matcher
    expect(header()).toHaveClass([
      'header-class',
      'text-blue-500',
      'custom-header-class',
    ]);
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(footer()).toHaveClass([
      'footer-class',
      'text-blue-300',
      'custom-footer-class',
    ]);
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(footer({ className: 'extra-class' })).toHaveClass([
      'footer-class',
      'text-blue-300',
      'custom-footer-class',
      'extra-class',
    ]);
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(header({ className: 'extra-class' })).toHaveClass([
      'header-class',
      'text-blue-500',
      'custom-header-class',
      'extra-class',
    ]);
    // @ts-expect-error - toHaveClass is a custom matcher
    expect(footer({ isDisabled: true })).toHaveClass([
      'footer-class',
      'text-blue-300',
      'custom-footer-class',
      'opacity-50',
      'cursor-not-allowed',
    ]);
  });
});
