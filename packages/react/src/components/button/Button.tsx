'use client';

import React, { useMemo } from 'react';
import { AriaButtonProps, useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { HoverEvents } from '@react-types/shared';
import {
  PolymorphicProps,
  RenderProps,
  useContextProps,
  useRenderProps,
} from '../../utils/react';
import { cn, createDataPropsGetter, filterDOMProps } from '../../utils';
import { Slot } from '../slot';
import { useButtonGroup } from '../buttonGroup';
import { useDisableInteractions } from '../../hooks';
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

  const { as: Component = 'button', asChild, ...restProps } = ctxProps;
  // Get the props from the group if possible
  const buttonGroup = useButtonGroup();
  const isInGroup = !!buttonGroup;

  // Spread out and set default values for the props
  const {
    size = buttonGroup?.size ?? 'md',
    variant = buttonGroup?.variant ?? 'primary',
    isDisabled = buttonGroup?.isDisabled ?? false,
    isLoading = false,
  } = restProps;

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
      ...restProps,
      isDisabled: !isInteractive,
      elementType: Component as React.ElementType,
    },
    restProps.ref
  );
  // Filter DOM props to ensure mergeProps receives plain objects
  const filteredCtxProps = filterDOMProps<T>(restProps, {
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
    ...restProps,
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
    ...restProps,
    className: cn('nw-button', ctxProps.className),
    values: renderValues,
    defaultClassName: cn('nw-button', ctxProps.className),
  });

  const buttonStateContext: ButtonStateContextType = {
    isDisabled,
    isLoading,
    isPressed,
    isHovered,
    isFocused,
    isFocusVisible,
    size,
    variant,
    isInGroup,
  };

  const dataAttrs = createDataPropsGetter<ButtonStateContextType>(ctx => {
    return {
      hovered: ctx.isHovered,
      focused: ctx.isFocused,
      'focus-visible': ctx.isFocusVisible,
      pressed: ctx.isPressed,
      disabled: ctx.isDisabled,
      loading: ctx.isLoading,
      variant: ctx.variant,
      size: ctx.size,
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
          data-is-in-group={isInGroup || undefined}
          data-slot="button-root"
          data-component="button"
        />
      </ButtonStateContext.Provider>
    </ButtonSlots.Provider>
  );
}

Button.displayName = 'NovaWaveUI.Button';
