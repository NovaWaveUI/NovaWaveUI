import React, { ElementType, useMemo } from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useContextProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { useCheckboxGroupState } from 'react-stately';
import { AriaCheckboxGroupProps, useCheckboxGroup } from 'react-aria';
import { cn, filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../slot';
import { useLabelledBy } from '../../utils/aria/useLabel';
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
  // Extract the `as` prop and the rest of the props
  const { as: Component = 'div', asChild, ...rest } = props;

  // Determine if we should filter the DOM props
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the context props (if there is any), a context may not exist,
  // and merge with the local props
  const ctxProps = useContextProps(rest, useCheckboxGroupContextProps);

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
    'aria-labelledby': ariaLabelledBy,
  } = ctxProps;

  const { resolvedLabel, registerLabelId } = useLabelledBy(ariaLabelledBy);

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
      'aria-labelledby': resolvedLabel,
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
      setLabelId: registerLabelId,
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
      registerLabelId,
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
          ...labelProps,
          'aria-labelledby': ariaLabelledBy ? undefined : resolvedLabel,
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
        />
      </CheckboxGroupStateContext.Provider>
    </CheckboxGroupSlots.Provider>
  );
}

CheckboxGroup.displayName = 'NovaWaveUI.CheckboxGroup';
