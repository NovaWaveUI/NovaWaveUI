import React, { useMemo } from 'react';
import { cn, filterDOMProps } from '@novawaveui/utils';
import {
  PolymorphicProps,
  RenderProps,
  useContextProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { Slot } from '../slot';
import {
  ButtonGroupOrientation,
  ButtonGroupRenderProps,
  ButtonGroupStyleProps,
} from './types';
import {
  ButtonGroupContextType,
  ButtonGroupStateContext,
  useButtonGroupContextProps,
} from './context';

export type ButtonGroupProps<T extends React.ElementType> = PolymorphicProps<
  T,
  ButtonGroupStyleProps &
    RenderProps<ButtonGroupRenderProps> & {
      /**
       * Whether or not the buttons in the group are disabled.
       */
      isDisabled?: boolean;

      /**
       * The orientation of the button group.
       * @default 'horizontal'
       */
      orientation?: ButtonGroupOrientation;
    }
>;

/**
 * The ButtonGroup component is used to group multiple buttons together.
 * It provides a way to manage the state and props of the buttons in the group.
 * Each button in the group will inherit the props from the ButtonGroup.
 * Each button can also override the props from the ButtonGroup allowing for
 * a flexible API.
 *
 * @param props The props of the ButtonGroup component.
 * @returns The ButtonGroup component.
 */
export function ButtonGroup<T extends React.ElementType = 'div'>(
  props: ButtonGroupProps<T>
) {
  // Next, get the context props (if there is any), and merge it with
  // the local props
  const ctxProps = useContextProps(props, useButtonGroupContextProps);

  // Next, extract out default values for the props
  const {
    as: Component = 'div',
    asChild,
    isDisabled = false,
    orientation = 'horizontal',
    color = 'neutral',
    size = 'md',
    variant = 'solid',
    radius = 'md',
  } = ctxProps;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Create a render props value
  const renderValues: ButtonGroupRenderProps = {
    isDisabled,
  };

  // Get the rendered props
  const {
    children: renderPropsChildren,
    className: renderPropsClassName,
    ...renderProps
  } = useRenderProps({
    ...ctxProps,
    values: renderValues,
  });

  // Create a context value for the button group provider
  const contextValue = useMemo<ButtonGroupContextType>(() => {
    return {
      color,
      size,
      variant,
      radius,
      isDisabled,
      orientation,
    };
  }, [color, size, variant, radius, isDisabled, orientation]);

  const filteredProps = filterDOMProps<T>(ctxProps, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      ref={ctxProps.ref}
      className={cn('nw-button-group', renderPropsClassName)}
      {...filteredProps}
      {...renderProps}
      role="group"
      data-orientation={orientation}
    >
      <ButtonGroupStateContext.Provider value={contextValue}>
        {renderPropsChildren}
      </ButtonGroupStateContext.Provider>
    </RenderedComponent>
  );
}

ButtonGroup.displayName = 'NovaWaveUI.ButtonGroup';
