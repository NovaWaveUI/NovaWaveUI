import React, { ElementType } from 'react';

export type TextProps<T extends ElementType = 'span'> =
  React.ComponentPropsWithoutRef<T>;

export type TextContextValue = TextProps;
