import React from 'react';
import type { AriaCheckboxProps } from '@novawaveui/aria-checkbox';
import { AriaCheckbox } from '@novawaveui/aria-checkbox';
import {
  NovaWaveUIColor,
  NovaWaveUIRadiusSize,
  NovaWaveUISize,
  NovaWaveUIVariants,
} from '@novawaveui/types';
import { forwardRefWith } from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import {
  CheckboxStyledContextValue,
  CheckboxStyleProvider,
} from './checkboxContext';
import { getCheckboxDataProps } from './checkboxData';

export type CheckboxRootProps = AriaCheckboxProps & {
  color?: NovaWaveUIColor;
  variant?: NovaWaveUIVariants;
  size?: NovaWaveUISize;
  radius?: NovaWaveUIRadiusSize;
  isLoading?: boolean;
};

export const CheckboxRoot = forwardRefWith.as<'div', CheckboxRootProps>(
  (props, ref) => {
    const {
      color = 'neutral',
      size = 'md',
      radius = 'md',
      variant = 'solid',
      isLoading = false,
      className,
      children,
      ...rest
    } = props;

    const styledContextValue: CheckboxStyledContextValue = {
      color,
      size,
      radius,
      variant,
      isLoading,
    };

    const dataAttributes = getCheckboxDataProps(styledContextValue);

    return (
      <CheckboxStyleProvider value={styledContextValue}>
        <AriaCheckbox.Root
          ref={ref}
          className={cn('nw-checkbox', className)}
          {...rest}
          {...dataAttributes}
        >
          {children}
        </AriaCheckbox.Root>
      </CheckboxStyleProvider>
    );
  }
);

CheckboxRoot.displayName = 'NovaWaveUI.Checkbox.Root';

export default CheckboxRoot;
