import React from 'react';
import { useButton, UseButtonProps } from './useButton';

export interface ButtonProps extends UseButtonProps {}

const Button = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const { styles, ref: domRef, ...rest } = useButton({ ...props, ref });

    return (
      <button ref={domRef} className={styles} {...rest}>
        Button
      </button>
    );
  }
);

Button.displayName = 'NovawaveUI.Button';

export default Button;
