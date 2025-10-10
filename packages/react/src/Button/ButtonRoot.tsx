import React, { useMemo } from 'react';
import { useContextProps, useRenderProps } from '@novawaveui/react-utils';
import { useButton } from '@react-aria/button';
import { cn, filterDOMProps } from '@novawaveui/utils';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { DOMAttributes, FocusableElement } from '@react-types/shared';
import { Slot } from '../Slot';
import {
  ButtonContext,
  ButtonStateProvider,
  getButtonDataAttrs,
  useButtonGroup,
} from './context';
import {
  ButtonRenderProps,
  ButtonRootProps,
  ButtonStateContextValue,
} from './types';
import { ButtonSlots } from './slots';

export function ButtonRoot<T extends React.ElementType = 'button'>(
  props: ButtonRootProps<T>
) {
  const { as: Component = 'button', asChild, ...restProps } = props;

  // Next, get the context props (if there is any), a context may not exist,
  // if it doesn't, we just use the original props
  // We also get the ref from the context and merge it with the original ref
  // so we can have access to the DOM element
  const [ctxProps, mergedRef] = useContextProps(restProps, ButtonContext);

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

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Disable all interactions if the button is disabled or loading
  const isInteractive = useMemo(
    () => !isDisabled && !isLoading,
    [isDisabled, isLoading]
  );

  // Get the button props from the useButton hook
  // This will handle all the accessibility features for us
  // We pass the DOM ref to the hook so it can manage the focus
  // and other interactions
  // eslint-disable-next-line prefer-const
  let { buttonProps, isPressed } = useButton(
    {
      ...ctxProps,
      isDisabled: !isInteractive,
      elementType: Component as React.ElementType,
    },
    mergedRef
  );
  // Filter DOM props to ensure mergeProps receives plain objects
  const filteredCtxProps = filterDOMProps<T>(ctxProps, {
    enabled: shouldFilterDOMProps,
  }) as Record<string, unknown>;
  const disabledInteractionProps = useDisableInteractions(
    buttonProps,
    isInteractive
  );
  const mergedButtonProps = mergeProps(
    disabledInteractionProps,
    filteredCtxProps
  );

  // Get the hover interactions
  const { isHovered, hoverProps } = useHover({
    ...ctxProps,
    isDisabled: !isInteractive,
  });

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

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <ButtonSlots.Provider value={{}}>
      <ButtonStateProvider value={buttonStateContext}>
        <RenderedComponent
          ref={mergedRef}
          {...mergeProps(mergedButtonProps, hoverProps, focusProps)}
          type={
            Component === 'button' &&
            // @ts-expect-error TS doesn't know about our type override
            buttonProps.type === 'submit' &&
            !isInteractive
              ? 'button'
              : // @ts-expect-error TS doesn't know about our type override
                buttonProps.type
          } // Prevent form submission if button is disabled or loading
          {...renderProps}
          {...dataAttrs}
          data-slot="root"
        />
      </ButtonStateProvider>
    </ButtonSlots.Provider>
  );
}

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

ButtonRoot.displayName = 'NovaWaveUI.Button.Root';

export default ButtonRoot;
