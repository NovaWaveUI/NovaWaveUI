import React, { useMemo } from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useContextProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { AriaButtonProps, useButton } from '@react-aria/button';
import { cn, createDataPropsGetter, filterDOMProps } from '@novawaveui/utils';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import {
  DOMAttributes,
  FocusableElement,
  HoverEvents,
} from '@react-types/shared';
import { Slot } from '../slot';
import { useButtonGroup } from '../buttonGroup';
import { ButtonRenderProps, ButtonStyleProps } from './types';
import {
  ButtonStateContext,
  ButtonStateContextType,
  useButtonContextProps,
} from './context';
import { ButtonSlots } from './slots';

export type ButtonProps<T extends React.ElementType> = PolymorphicProps<
  T,
  Omit<AriaButtonProps<T>, 'children' | 'elementType'> &
    HoverEvents &
    RenderProps<ButtonRenderProps> &
    ButtonStyleProps & {
      /**
       * Whether or not the button is in a loading state.
       */
      isLoading?: boolean;
    }
>;

export function Button<T extends React.ElementType = 'button'>(
  props: ButtonProps<T>
) {
  // Next, get the context props (if there is any), a context may not exist,
  // if it doesn't, we just use the original props
  // We also get the ref from the context and merge it with the original ref
  // so we can have access to the DOM element
  const ctxProps = useContextProps(props, useButtonContextProps);

  const { as: Component = 'button', asChild } = ctxProps;
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
  const { buttonProps, isPressed } = useButton(
    {
      ...ctxProps,
      isDisabled: !isInteractive,
      elementType: Component as React.ElementType,
    },
    ctxProps.ref
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
    className: cn('nw-button group', ctxProps.className),
    values: renderValues,
    defaultClassName: cn('nw-button group', ctxProps.className),
  });

  const buttonStateContext: ButtonStateContextType = useMemo(() => {
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

  const dataAttrs = createDataPropsGetter<ButtonStateContextType>(ctx => {
    return {
      hovered: ctx.isHovered,
      focused: ctx.isFocused,
      'focus-visible': ctx.isFocusVisible,
      pressed: ctx.isPressed,
      disabled: ctx.isDisabled,
      loading: ctx.isLoading,
      color: ctx.color,
      variant: ctx.variant,
      size: ctx.size,
      radius: ctx.radius,
      'in-group': ctx.isInGroup,
    };
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <ButtonSlots.Provider value={{}}>
      <ButtonStateContext.Provider value={buttonStateContext}>
        <RenderedComponent
          ref={ctxProps.ref}
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
          {...dataAttrs(buttonStateContext)}
          data-slot="root"
        />
      </ButtonStateContext.Provider>
    </ButtonSlots.Provider>
  );
}

Button.displayName = 'NovaWaveUI.Button';

/**
 * useDisableInteractions is a hook that removes all interaction handlers based
 * on a DOM element if it is not interactive (disabled or loading).
 *
 * @param props The props to filter
 * @param isInteractive Whether or not the element is active.
 * @returns A list of filtered props based on the interactivity.
 */
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
