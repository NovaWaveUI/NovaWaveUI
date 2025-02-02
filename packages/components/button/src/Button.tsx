import React from 'react';
import { useButton, UseButtonProps } from './useButton';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ButtonProps extends UseButtonProps {}

const Button = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const { Root, domRef, children, styles, getButtonProps } = useButton({
      ...props,
      ref,
    });

    return (
      <Root ref={domRef} className={styles} {...getButtonProps()}>
        {children}
      </Root>
    );
  }
);

Button.displayName = 'NovawaveUI.Button';

export default Button;
