import React from 'react';
import { useButton, UseButtonProps } from './useButton';

const Button = React.forwardRef(
  (props: UseButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
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
