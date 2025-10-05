import {
  PolymorphicProps,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { useCheckboxGroupState } from 'react-stately';
import { AriaCheckboxGroupProps, useCheckboxGroup } from 'react-aria';
import React, { useMemo } from 'react';
import { cn, filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import {
  CheckboxGroupNWStateContextValue,
  CheckboxGroupRenderProps,
  CheckboxGroupStyleProps,
} from './types';
import {
  CheckboxGroupNWStateProvider,
  CheckboxGroupPropsContext,
  CheckboxGroupPropsProvider,
} from './context';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupRenderContext } from './state';

export type CheckboxGroupRootProps<T extends React.ElementType> =
  PolymorphicProps<
    T,
    Omit<AriaCheckboxGroupProps, 'children'> &
      SlotProps &
      RenderProps<CheckboxGroupRenderProps> &
      CheckboxGroupStyleProps & {
        /**
         * The orientation of the checkbox group.
         * @default 'vertical'
         */
        orientation?: 'vertical' | 'horizontal';
      }
  >;

export default function CheckboxGroupRoot<T extends React.ElementType = 'div'>(
  props: CheckboxGroupRootProps<T>
) {
  // Extract the `as` prop and the rest of the props
  const { as: Component = 'div', asChild, ...rest } = props;

  // Determine if we should filter the DOM props
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the context props (if there is any), a context may not exist,
  // and merge with the local props
  const [ctxProps, ctxRef] = useContextProps(rest, CheckboxGroupPropsContext);

  // Spread out and set default values for the props
  const {
    children,
    className,
    style,
    color = 'neutral',
    size = 'md',
    radius = 'md',
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    orientation = 'vertical',
  } = ctxProps;

  // Call the React Aria useCheckboxGroup to get the group props
  // This will handle all the accessibility features for us
  const groupState = useCheckboxGroupState(ctxProps);
  const {
    groupProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    labelProps,
    validationDetails,
    validationErrors,
  } = useCheckboxGroup(ctxProps, groupState);

  // Construct the value for the checkbox group state
  const checkboxGroupStateCtxValue = useMemo<CheckboxGroupNWStateContextValue>(
    () => ({
      color,
      radius,
      size,
      state: groupState,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      validationDetails,
      validationErrors,
      orientation,
    }),
    [
      color,
      radius,
      size,
      groupState,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      validationDetails,
      validationErrors,
      orientation,
    ]
  );

  // Create the value for the group render props
  const { dataAttrs, renderValues } = useCheckboxGroupRenderContext(
    checkboxGroupStateCtxValue
  );

  // Use the render props to get the final children, className and style
  const renderProps = useRenderProps({
    ...ctxProps,
    values: renderValues,
    className: cn('nw-checkbox-group', className),
    style,
    children,
  });

  const filteredProps = filterDOMProps<T>(
    { rest, ref: ctxRef },
    {
      enabled: shouldFilterDOMProps,
    }
  );

  const RenderedComponent = asChild ? Slot : Component;

  console.log(labelProps);

  return (
    <CheckboxGroupSlots.Provider
      value={{
        'checkbox-group-label': { ...labelProps, children: ctxProps.label },
        'checkbox-group-description': descriptionProps,
        'checkbox-group-error': errorMessageProps,
      }}
    >
      <CheckboxGroupPropsProvider value={ctxProps}>
        <CheckboxGroupNWStateProvider value={checkboxGroupStateCtxValue}>
          <RenderedComponent
            {...groupProps}
            {...filteredProps}
            {...renderProps}
            {...dataAttrs}
          />
        </CheckboxGroupNWStateProvider>
      </CheckboxGroupPropsProvider>
    </CheckboxGroupSlots.Provider>
  );
}

CheckboxGroupRoot.displayName = 'NovaWaveUI.CheckboxGroup.Root';
