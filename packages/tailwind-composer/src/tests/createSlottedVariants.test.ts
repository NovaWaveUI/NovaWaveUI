import { describe, expect, it } from 'vitest';
import { createSlottedVariants } from '../index.js';
import { ExtractVariantProps } from '../types.js';

describe('createSlottedVariants', () => {
  it('should create a slotted variant function', () => {
    const testStyles = createSlottedVariants({
      slots: {
        root: 'flex flex-col',
        header: 'p-4 bg-gray-100',
        title: 'text-lg font-bold',
      },
      variants: {
        color: {
          primary: { root: 'bg-blue-500', title: 'text-white' },
          secondary: {
            root: 'bg-gray-500',
            title: 'text-white',
            header: 'text-gray-700',
          },
        },
        size: {
          sm: { root: 'text-sm', title: 'text-sm' },
          md: { root: 'text-base', title: 'text-base' },
        },
      },
    });

    let { header, root, title } = testStyles({
      color: 'primary',
      size: 'sm',
    });
    expect(root()).toBe('flex flex-col bg-blue-500 text-sm');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-white text-sm');

    ({ header, root, title } = testStyles({
      color: 'secondary',
      size: 'md',
    }));
    expect(root()).toBe('flex flex-col bg-gray-500 text-base');
    expect(header()).toBe('p-4 bg-gray-100 text-gray-700');
    expect(title()).toBe('font-bold text-white text-base');

    ({ header, root, title } = testStyles({
      color: 'primary',
      size: 'md',
    }));
    expect(root()).toBe('flex flex-col bg-blue-500 text-base');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-white text-base');

    ({ header, root, title } = testStyles({
      color: 'secondary',
      size: 'sm',
    }));
    expect(root()).toBe('flex flex-col bg-gray-500 text-sm');
    expect(header()).toBe('p-4 bg-gray-100 text-gray-700');
    expect(title()).toBe('font-bold text-white text-sm');
  });

  it('should handle default variants', () => {
    const testStyles = createSlottedVariants({
      slots: {
        root: 'flex flex-col',
        header: 'p-4 bg-gray-100',
        title: 'text-lg font-bold',
      },
      variants: {
        color: {
          primary: { root: 'bg-blue-500', title: 'text-white' },
          secondary: {
            root: 'bg-gray-500',
            title: 'text-white',
            header: 'text-gray-700',
          },
        },
        size: {
          sm: { root: 'text-sm', title: 'text-sm' },
          md: { root: 'text-base', title: 'text-base' },
        },
      },
      defaultVariants: {
        color: 'primary',
        size: 'md',
      },
    });

    let { header, root, title } = testStyles();
    expect(root()).toBe('flex flex-col bg-blue-500 text-base');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-white text-base');

    ({ header, root, title } = testStyles({ color: 'secondary' }));
    expect(root()).toBe('flex flex-col bg-gray-500 text-base');
    expect(header()).toBe('p-4 bg-gray-100 text-gray-700');
    expect(title()).toBe('font-bold text-white text-base');

    ({ header, root, title } = testStyles({ size: 'sm' }));
    expect(root()).toBe('flex flex-col bg-blue-500 text-sm');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-white text-sm');

    ({ header, root, title } = testStyles({ color: 'primary', size: 'sm' }));
    expect(root()).toBe('flex flex-col bg-blue-500 text-sm');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-white text-sm');
  });

  it('should handle compound variants', () => {
    const testStyles = createSlottedVariants({
      slots: {
        root: 'flex flex-col',
        header: 'p-4 bg-gray-100',
        title: 'text-lg font-bold',
      },
      variants: {
        color: {
          primary: { root: 'bg-blue-500', title: 'text-white' },
          secondary: {
            root: 'bg-gray-500',
            title: 'text-white',
            header: 'text-gray-700',
          },
        },
        size: {
          sm: { root: 'text-sm', title: 'text-sm' },
          md: { root: 'text-base', title: 'text-base' },
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          size: 'sm',
          className: { root: 'border border-blue-700' },
        },
        {
          color: 'secondary',
          size: 'md',
          className: { root: 'border border-gray-700' },
        },
        {
          color: ['primary', 'secondary'],
          size: 'sm',
          className: { header: 'bg-green-900' },
        },
      ],
    });

    let { header, root, title } = testStyles({
      color: 'primary',
      size: 'sm',
    });
    expect(root()).toBe(
      'flex flex-col bg-blue-500 text-sm border border-blue-700'
    );
    expect(header()).toBe('p-4 bg-green-900');
    expect(title()).toBe('font-bold text-white text-sm');

    ({ header, root, title } = testStyles({
      color: 'secondary',
      size: 'md',
    }));
    expect(root()).toBe(
      'flex flex-col bg-gray-500 text-base border border-gray-700'
    );
    expect(header()).toBe('p-4 bg-gray-100 text-gray-700');
    expect(title()).toBe('font-bold text-white text-base');

    ({ header, root, title } = testStyles({
      color: 'primary',
      size: 'md',
    }));
    expect(root()).toBe('flex flex-col bg-blue-500 text-base');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-white text-base');

    ({ header, root, title } = testStyles({
      color: 'secondary',
      size: 'sm',
    }));
  });

  it('should handle boolean variants', () => {
    const testStyles = createSlottedVariants({
      slots: {
        root: 'flex flex-col',
        header: 'p-4 bg-gray-100',
        title: 'text-lg font-bold',
      },
      variants: {
        color: {
          primary: { root: 'bg-blue-500', title: 'text-white' },
          secondary: {
            root: 'bg-gray-500',
            title: 'text-white',
            header: 'text-gray-700',
          },
        },
        isDisabled: {
          true: { root: 'opacity-50 pointer-events-none' },
        },
        isActive: {
          false: { root: 'opacity-10' },
        },
      },
    });

    let { header, root, title } = testStyles({
      color: 'primary',
      isDisabled: true,
    });
    expect(root()).toBe(
      'flex flex-col bg-blue-500 opacity-50 pointer-events-none'
    );
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('text-lg font-bold text-white');

    ({ header, root, title } = testStyles({
      color: 'secondary',
      isDisabled: false,
    }));
    expect(root()).toBe('flex flex-col bg-gray-500');
    expect(header()).toBe('p-4 bg-gray-100 text-gray-700');
    expect(title()).toBe('text-lg font-bold text-white');

    ({ header, root, title } = testStyles({
      color: 'primary',
      isDisabled: false,
    }));
    expect(root()).toBe('flex flex-col bg-blue-500');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('text-lg font-bold text-white');

    ({ header, root, title } = testStyles({
      color: 'secondary',
      isDisabled: true,
    }));
    expect(root()).toBe(
      'flex flex-col bg-gray-500 opacity-50 pointer-events-none'
    );
    expect(header()).toBe('p-4 bg-gray-100 text-gray-700');
    expect(title()).toBe('text-lg font-bold text-white');
  });

  it('should handle an extended style', () => {
    const testStyles = createSlottedVariants({
      slots: {
        root: 'flex flex-col',
        header: 'p-4 bg-gray-100',
        title: 'text-lg font-bold',
      },
      variants: {
        color: {
          primary: { root: 'bg-blue-500', title: 'text-white' },
          secondary: {
            root: 'bg-gray-500',
            title: 'text-white',
            header: 'text-gray-700',
          },
        },
        size: {
          sm: { root: 'text-sm', title: 'text-sm' },
          md: { root: 'text-base', title: 'text-base' },
        },
      },
      defaultVariants: {
        color: 'primary',
        size: 'md',
      },
    });

    let resultingStyle = testStyles({
      color: 'primary',
      size: 'sm',
    });

    let { root, header, title } = resultingStyle;

    expect(root('bg-red-500')).toBe('flex flex-col text-sm bg-red-500');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-white text-sm');

    const extendedStyle = testStyles.extend({
      variants: {
        color: {
          warning: {
            root: 'bg-yellow-500',
            title: 'text-black',
          },
        },
      },
    });

    resultingStyle = extendedStyle({
      color: 'warning',
      size: 'sm',
    });

    ({ root, header, title } = resultingStyle);
    expect(root('bg-red-500')).toBe('flex flex-col text-sm bg-red-500');
    expect(header()).toBe('p-4 bg-gray-100');
    expect(title()).toBe('font-bold text-black text-sm');
    expect(title('text-red-500')).toBe('font-bold text-sm text-red-500');
  });

  it('should show the correct variants and variant values', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const testStyles = createSlottedVariants({
      slots: {
        root: 'flex flex-col',
        header: 'p-4 bg-gray-100',
        title: 'text-lg font-bold',
      },
      variants: {
        color: {
          primary: { root: 'bg-blue-500', title: 'text-white' },
          secondary: {
            root: 'bg-gray-500',
            title: 'text-white',
            header: 'text-gray-700',
          },
        },
        size: {
          sm: { root: 'text-sm', title: 'text-sm' },
          md: { root: 'text-base', title: 'text-base' },
        },
      },
    });

    type Variants = ExtractVariantProps<typeof testStyles>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const variants: Variants = {
      color: 'primary',
      size: 'sm',
    };
  });
});
