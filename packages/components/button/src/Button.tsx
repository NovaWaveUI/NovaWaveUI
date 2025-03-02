import React from 'react';
import { useButton, UseButtonProps } from './useButton';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ButtonProps extends UseButtonProps {}

const Button = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const {
      Component,
      domRef,
      children,
      styles,
      getSlotProps,
      startContent,
      endContent,
    } = useButton({
      ...props,
      ref,
    });

    return (
      <Component ref={domRef} className={styles} {...getSlotProps('base')}>
        {startContent}
        {children}
        {endContent}
      </Component>
    );
  }
);

Button.displayName = 'NovawaveUI.Button';

export default Button;
