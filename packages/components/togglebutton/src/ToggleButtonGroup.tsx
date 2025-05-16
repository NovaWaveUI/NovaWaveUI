import React from 'react';
import {
  useToggleButtonGroup,
  UseToggleButtonGroupProps,
} from './useToggleButtonGroup';
import { ToggleButtonGroupProvider } from './ToggleButtonContext';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToggleButtonGroupProps extends UseToggleButtonGroupProps {}

const ToggleButtonGroup = React.forwardRef(
  (props: ToggleButtonGroupProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { Component, domRef, styles, getSlotProps, context, children } =
      useToggleButtonGroup({
        ...props,
        ref,
      });

    return (
      <ToggleButtonGroupProvider value={context}>
        <Component ref={domRef} className={styles} {...getSlotProps('base')}>
          {children}
        </Component>
      </ToggleButtonGroupProvider>
    );
  }
);

ToggleButtonGroup.displayName = 'NovawaveUI.ToggleButtonGroup';

export default ToggleButtonGroup;
