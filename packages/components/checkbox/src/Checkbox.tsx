import React from 'react';
import { useCheckbox, UseCheckboxProps } from './useCheckbox';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CheckboxProps extends UseCheckboxProps {}

const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { Root, domRef, children, base, ...otherProps } = useCheckbox({
      ...props,
      ref,
    });

    return (
      <Root ref={domRef} className={base()} {...otherProps}>
        {children}
      </Root>
    );
  }
);

Checkbox.displayName = 'NovawaveUI.Checkbox';

export default Checkbox;
