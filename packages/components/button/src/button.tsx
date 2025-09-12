import React from 'react';
import AriaButton, { AriaButtonProps } from '@novawaveui/aria-button';

export type ButtonProps = AriaButtonProps & {
  color?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  variant?: 'solid' | 'faded' | 'outlined' | 'ghost' | 'light';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  isLoading?: boolean;
  isIconOnly?: boolean;
};

const Button = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const { color, variant, size, radius, isLoading, isIconOnly, ...rest } =
      props;

    const dataAttributes = {
      'data-color': color,
      'data-variant': variant,
      'data-size': size,
      'data-radius': radius,
      'data-loading': isLoading ? true : undefined,
      'data-icon-only': isIconOnly ? true : undefined,
    };

    return (
      <AriaButton ref={ref} {...rest} {...dataAttributes} className="nw-button">
        Button
      </AriaButton>
    );
  }
);

Button.displayName = 'NovawaveUI.Button';

export default Button;
