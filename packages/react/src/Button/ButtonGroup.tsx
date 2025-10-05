import React, { useMemo } from 'react';
import { cn, filterDOMProps } from '@novawaveui/utils';
import {
  PolymorphicProps,
  RenderProps,
  useContextProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { Slot } from '../Slot';
import {
  ButtonGroupContextValue,
  ButtonGroupOrientation,
  ButtonGroupRenderProps,
  ButtonGroupStyleProps,
} from './types';
import { ButtonGroupPropsProvider, ButtonGroupProvider } from './context';

export type ButtonGroupRootProps<T extends React.ElementType> =
  PolymorphicProps<
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

export default function ButtonGroup<T extends React.ElementType = 'div'>(
  props: ButtonGroupRootProps<T>
) {
  // Next, get the context props (if there is any), and merge it with
  // the local props
  const [ctxProps, ctxRef] = useContextProps(props, ButtonGroupPropsProvider);

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
  const contextValue = useMemo<ButtonGroupContextValue>(() => {
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
      ref={ctxRef}
      className={cn('nw-button-group', renderPropsClassName)}
      {...filteredProps}
      {...renderProps}
      role="group"
      data-orientation={orientation}
    >
      <ButtonGroupProvider value={contextValue}>
        {renderPropsChildren}
      </ButtonGroupProvider>
    </RenderedComponent>
  );
}

ButtonGroup.displayName = 'NovaWaveUI.ButtonGroup';
