import React from 'react';
import { useButtonGroup, UseButtonGroupProps } from './useButtonGroup';
import { ButtonGroupProvider } from './ButtonGroupContext';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ButtonGroupProps extends UseButtonGroupProps {}

const ButtonGroup = React.forwardRef(
  (props: ButtonGroupProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { Component, domRef, styles, getSlotProps, context, children } =
      useButtonGroup({
        ...props,
        ref,
      });

    return (
      <ButtonGroupProvider value={context}>
        <Component ref={domRef} className={styles} {...getSlotProps('base')}>
          {children}
        </Component>
      </ButtonGroupProvider>
    );
  }
);

ButtonGroup.displayName = 'NovawaveUI.ButtonGroup';

export default ButtonGroup;
