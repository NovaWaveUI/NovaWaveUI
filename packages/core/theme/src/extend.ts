/**
 * @fileoverview The extends file is used to define the functionality to expand NovaWaveUI components
 * in a clean and easy way.
 */

import { tv, TVReturnType } from 'tailwind-variants';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const extendComponentStyle = (
  baseStyle: TVReturnType<any, any, any, any, any, any>,
  extendedStyle: any
) => {
  const customTv = tv({
    extend: baseStyle,
    ...extendedStyle,
  });

  return customTv;
};
