import React, { ElementType, useMemo } from 'react';
import { useCheckboxGroupState } from 'react-stately';
import { AriaCheckboxGroupProps, useCheckboxGroup } from 'react-aria';
import { cn, filterDOMProps, useSlot } from '../../utils';
import {
  PolymorphicProps,
  RenderProps,
  useContextProps,
  useRenderProps,
} from '../../utils/react';
import { Slot } from '../slot';
import { CheckboxGroupRenderProps, CheckboxGroupStyleProps } from './types';
import { useCheckboxGroupRenderContext } from './state';
import {
  CheckboxGroupStateContext,
  CheckboxGroupStateContextType,
  useCheckboxGroupContextProps,
} from './context';
import { CheckboxGroupSlots } from './slots';

// The complete props of the checkbox group
export type CheckboxGroupProps<T extends React.ElementType> = Omit<
  PolymorphicProps<
    T,
    Omit<AriaCheckboxGroupProps, 'children'> &
      RenderProps<CheckboxGroupRenderProps> &
      CheckboxGroupStyleProps & {
        /**
         * The orientation of the checkbox group.
         * @default 'vertical'
         */
        orientation?: 'vertical' | 'horizontal';
      }
  >,
  'label'
>;

/**
 * The `CheckboxGroup` component is a wrapper that groups multiple checkbox inputs,
 * providing context and state management for them. It ensures that all checkboxes
 * within the group are accessible and behave consistently.
 * @param props The props for the CheckboxGroup component.
 * @returns The rendered CheckboxGroup component.
 */
export function CheckboxGroup<T extends React.ElementType = 'div'>(
  props: CheckboxGroupProps<T>
) {
  // Get the context props (if there is any), a context may not exist,
  // and merge with the local props
  const ctxProps = useContextProps(props, useCheckboxGroupContextProps);

  // Extract the `as` prop and the rest of the props
  const { as: Component = 'div', asChild, ...rest } = ctxProps;

  // Determine if we should filter the DOM props
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  const [labelRef, label] = useSlot(
    !ctxProps['aria-label'] && !ctxProps['aria-labelledby']
  );
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
  } = useCheckboxGroup(
    {
      ...ctxProps,
      label,
    },
    groupState
  );

  // Construct the value for the checkbox group state
  const checkboxGroupStateCtxValue = useMemo<CheckboxGroupStateContextType>(
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
    defaultClassName: cn('nw-checkbox-group', className),
  });

  const filteredProps = filterDOMProps<T>(
    { rest, ref: ctxProps.ref },
    {
      enabled: shouldFilterDOMProps,
    }
  );

  const RenderedComponent: ElementType = asChild ? Slot : Component;

  return (
    <CheckboxGroupSlots.Provider
      value={{
        label: {
          ref: labelRef,
          ...labelProps,
        },
        description: descriptionProps,
        error: errorMessageProps,
      }}
    >
      <CheckboxGroupStateContext.Provider value={checkboxGroupStateCtxValue}>
        <RenderedComponent
          {...groupProps}
          {...filteredProps}
          {...renderProps}
          {...dataAttrs}
          data-component="checkbox-group"
        />
      </CheckboxGroupStateContext.Provider>
    </CheckboxGroupSlots.Provider>
  );
}

CheckboxGroup.displayName = 'NovaWaveUI.CheckboxGroup';
