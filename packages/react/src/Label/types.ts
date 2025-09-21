import React, { ElementType } from 'react';

export type LabelProps<T extends ElementType = 'label'> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };

export type LabelContextValue = LabelProps;
