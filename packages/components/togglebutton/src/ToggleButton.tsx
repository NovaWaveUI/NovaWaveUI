import React from 'react';
import { useTogglebutton, UseTogglebuttonProps } from './useToggleButton';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TogglebuttonProps extends UseTogglebuttonProps {}

const Togglebutton = React.forwardRef(
  (props: TogglebuttonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const { Root, domRef, children, ...otherProps } = useTogglebutton({
      ...props,
      ref,
    });

    return (
      <Root ref={domRef} {...otherProps}>
        {children}
      </Root>
    );
  }
);

Togglebutton.displayName = 'NovawaveUI.Togglebutton';

export default Togglebutton;
