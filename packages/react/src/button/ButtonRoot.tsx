import React, { useMemo } from 'react';
import {
  useDOMRef,
  useContextProps,
  forwardRefWith,
  useRenderProps,
} from '@novawaveui/react-utils';
import { useButton } from '@react-aria/button';
import { cn } from '@novawaveui/utils';
import { useHover } from '@react-aria/interactions';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import {
  ButtonContext,
  ButtonStateProvider,
  getButtonDataAttrs,
} from './context';
import {
  BaseButtonProps,
  ButtonRenderProps,
  ButtonStateContext,
} from './types';

const ButtonRoot = forwardRefWith.as<'button', BaseButtonProps<'button'>>(
  (props, ref) => {
    // First, extract the `as` prop and the rest of the props
    const { as: Component = 'button', ...restProps } = props;

    // Next, get the context props (if there is any), a context may not exist,
    // if it doesn't, we just use the original props
    // We also get the ref from the context and merge it with the original ref
    // so we can have access to the DOM element
    const [ctxProps, ctxRef] = useContextProps(restProps, ref, ButtonContext);

    // Create a DOM ref using the merged refs
    const domRef = useDOMRef(ctxRef);

    // Spread out and set default values for the props
    const {
      color = 'neutral',
      size = 'md',
      variant = 'solid',
      radius = 'md',
      isDisabled = false,
      isLoading = false,
    } = ctxProps;

    // Get the button props from the useButton hook
    // This will handle all the accessibility features for us
    // We pass the DOM ref to the hook so it can manage the focus
    // and other interactions
    const { buttonProps, isPressed } = useButton(
      {
        ...ctxProps,
        isDisabled,
        elementType: Component as React.ElementType,
      },
      domRef
    );

    // Get the hover interactions
    const { isHovered, hoverProps } = useHover(ctxProps);

    // Get the focus props
    const { focusProps, isFocused, isFocusVisible } = useFocusRing();

    // Prepare the render props
    const renderValues: ButtonRenderProps = {
      isPressed,
      isDisabled,
      isHovered,
      isFocused,
      isFocusVisible,
      isLoading,
    };

    // Get the render props using the useRenderProps utility
    // This will allow us to use the render props pattern
    // and pass the render values to the children
    const renderProps = useRenderProps({
      ...ctxProps,
      className: cn('nw-button', ctxProps.className),
      values: renderValues,
      defaultClassName: cn('nw-button', ctxProps.className),
    });

    const DOMProps = filterDOMProps(ctxProps);

    const buttonStateContext: ButtonStateContext = useMemo(() => {
      return {
        isDisabled,
        isLoading,
        isPressed,
        isHovered,
        isFocused,
        isFocusVisible,
        color,
        size,
        variant,
        radius,
      };
    }, [
      isDisabled,
      isLoading,
      isPressed,
      isHovered,
      isFocused,
      isFocusVisible,
      color,
      size,
      variant,
      radius,
    ]);

    const dataAttrs = getButtonDataAttrs(buttonStateContext);

    return (
      <ButtonStateProvider value={buttonStateContext}>
        <Component
          ref={domRef}
          {...mergeProps(DOMProps, buttonProps, hoverProps, focusProps)}
          className={renderProps.className}
          style={renderProps.style}
          {...dataAttrs}
          data-slot="root"
        >
          {renderProps.children}
        </Component>
      </ButtonStateProvider>
    );
  }
);

ButtonRoot.displayName = 'Button';

export default ButtonRoot;
