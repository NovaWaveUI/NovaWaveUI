import React, { useMemo } from 'react';
import {
  useDOMRef,
  useContextProps,
  forwardRefWith,
  useRenderProps,
} from '@novawaveui/react-utils';
import { useButton } from '@react-aria/button';
import { cn, filterDOMProps } from '@novawaveui/utils';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { DOMAttributes, FocusableElement } from '@react-types/shared';
import {
  ButtonContext,
  ButtonStateProvider,
  getButtonDataAttrs,
  useButtonGroup,
} from './context';
import {
  BaseButtonProps,
  ButtonRenderProps,
  ButtonStateContextValue,
} from './types';
import { ButtonSlots } from './slots';

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

    // Get the props from the group if possible
    const buttonGroup = useButtonGroup();
    const isInGroup = !!buttonGroup;

    // Spread out and set default values for the props
    const {
      color = buttonGroup?.color ?? 'neutral',
      size = buttonGroup?.size ?? 'md',
      variant = buttonGroup?.variant ?? 'solid',
      radius = buttonGroup?.radius ?? 'md',
      isDisabled = buttonGroup?.isDisabled ?? false,
      isLoading = false,
    } = ctxProps;

    // Get the button props from the useButton hook
    // This will handle all the accessibility features for us
    // We pass the DOM ref to the hook so it can manage the focus
    // and other interactions
    // eslint-disable-next-line prefer-const
    let { buttonProps, isPressed } = useButton(
      {
        ...ctxProps,
        isDisabled,
        elementType: Component as React.ElementType,
      },
      domRef
    );
    // Disable all interactions if the button is disabled or loading
    const isInteractive = useMemo(
      () => !isDisabled && !isLoading,
      [isDisabled, isLoading]
    );
    buttonProps = useDisableInteractions(buttonProps, isInteractive);

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

    const buttonStateContext: ButtonStateContextValue = useMemo(() => {
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
        isInGroup,
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
      isInGroup,
    ]);

    const dataAttrs = getButtonDataAttrs(buttonStateContext);

    return (
      <ButtonSlots.Provider>
        <ButtonStateProvider value={buttonStateContext}>
          <Component
            ref={domRef}
            {...mergeProps(DOMProps, buttonProps, hoverProps, focusProps)}
            type={
              Component === 'button' &&
              // @ts-expect-error TS doesn't know about our type override
              buttonProps.type === 'submit' &&
              !isInteractive
                ? 'button'
                : // @ts-expect-error TS doesn't know about our type override
                  buttonProps.type
            } // Prevent form submission if button is disabled or loading
            className={renderProps.className}
            style={renderProps.style}
            {...dataAttrs}
            data-slot="root"
          >
            {renderProps.children}
          </Component>
        </ButtonStateProvider>
      </ButtonSlots.Provider>
    );
  }
);

function useDisableInteractions(
  props: DOMAttributes<FocusableElement>,
  isInteractive: boolean
) {
  if (isInteractive) {
    return props;
  }

  // Create a shallow copy and remove all interaction handlers except focus/blur
  const newProps = { ...props } as Record<string, unknown>;
  for (const key in newProps) {
    if (
      key.startsWith('on') &&
      typeof newProps[key] === 'function' &&
      !(key.includes('Focus') || key.includes('Blur'))
    ) {
      delete newProps[key];
    }
  }
  return newProps as DOMAttributes<FocusableElement>;
}

ButtonRoot.displayName = 'Button';

export default ButtonRoot;
