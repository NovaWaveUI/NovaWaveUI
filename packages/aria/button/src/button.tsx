import React from 'react';
import { useDOMRef } from '@novawaveui/react-utils';
import { AriaButtonProps as RAAriaButtonProps } from '@react-types/button';
import { useButton } from '@react-aria/button';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';

export type AriaButtonProps = RAAriaButtonProps & {
  className?: string;
};

const Button = React.forwardRef(
  (props: AriaButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    // Extract props
    const { isDisabled, children, className } = props;

    // Create a non-null ref
    const domRef = useDOMRef<HTMLButtonElement>(ref);

    // Get the hover properties
    const { hoverProps, isHovered } = useHover({
      isDisabled,
    });

    const { isPressed, pressProps } = usePress({ isDisabled });

    const { focusProps, isFocusVisible, isFocused } = useFocusRing();

    const { buttonProps } = useButton(props, domRef);

    const mergedProps = mergeProps(
      buttonProps,
      hoverProps,
      pressProps,
      focusProps
    );

    // Create a map of the data-* attributes to use
    const dataAttributes = {
      'data-hovered': isHovered ? true : undefined,
      'data-disabled': isDisabled ? true : undefined,
      'data-pressed': isPressed ? true : undefined,
      'data-focused': isFocused ? true : undefined,
      'data-focus-visible': isFocusVisible ? true : undefined,
    };

    return (
      <button
        ref={domRef}
        {...mergedProps}
        {...dataAttributes}
        className={className}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'NovawaveUI.AriaButton';

export default Button;
