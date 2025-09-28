import React, { useMemo } from 'react';
import { cn } from '@novawaveui/utils';
import {
  PolymorphicProps,
  RenderProps,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@react-aria/utils';
import {
  ButtonGroupContextValue,
  ButtonGroupOrientation,
  ButtonGroupRenderProps,
  ButtonGroupStyleProps,
} from './types';
import { ButtonGroupPropsProvider, ButtonGroupProvider } from './context';

export type ButtonGroupRootProps<T extends React.ElementType = 'div'> =
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
  // Extract the `as` prop and the rest of the props
  const {
    as: Component = 'div',
    children,
    className,
    style,
    ref,
    ...rest
  } = props;

  // Next, get the context props (if there is any), and merge it with
  // the local props
  const [ctxProps, ctxRef] = useContextProps(
    rest,
    ref,
    ButtonGroupPropsProvider
  );

  // Next, extract out default values for the props
  const {
    isDisabled = false,
    orientation = 'horizontal',
    color = 'neutral',
    size = 'md',
    variant = 'solid',
    radius = 'md',
  } = ctxProps;

  // Merge the refs
  const domRef = useDOMRef(ctxRef);

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
    children,
    className,
    style,
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

  const DOMProps = filterDOMProps(ctxProps as any);

  return (
    <Component
      ref={domRef}
      className={cn('nw-button-group', renderPropsClassName)}
      {...DOMProps}
      {...renderProps}
      role="group"
      data-orientation={orientation}
    >
      <ButtonGroupProvider value={contextValue}>
        {renderPropsChildren}
      </ButtonGroupProvider>
    </Component>
  );
}

ButtonGroup.displayName = 'NovaWaveUI.ButtonGroup';
