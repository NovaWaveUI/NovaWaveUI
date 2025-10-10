import { useContextProps, useRenderProps } from '@novawaveui/react-utils';
import { useCheckboxGroupState } from 'react-stately';
import { useCheckboxGroup } from 'react-aria';
import React, { ElementType, useMemo } from 'react';
import { cn, filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { useLabelledBy } from '../utils/aria/useLabel';
import {
  CheckboxGroupStateContextValue,
  CheckboxGroupRootProps,
} from './types';
import {
  CheckboxGroupStateProvider,
  CheckboxGroupContext,
  CheckboxGroupProvider,
} from './context';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupRenderContext } from './state';

export default function CheckboxGroupRoot<T extends React.ElementType = 'div'>(
  props: CheckboxGroupRootProps<T>
) {
  // Extract the `as` prop and the rest of the props
  const { as: Component = 'div', asChild, ...rest } = props;

  // Determine if we should filter the DOM props
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the context props (if there is any), a context may not exist,
  // and merge with the local props
  const [ctxProps, ctxRef] = useContextProps(rest, CheckboxGroupContext);

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
  const checkboxGroupStateCtxValue = useMemo<
    CheckboxGroupStateContextValue<any>
  >(
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
    { rest, ref: ctxRef },
    {
      enabled: shouldFilterDOMProps,
    }
  );

  const RenderedComponent: ElementType = asChild ? Slot : Component;

  console.log(resolvedLabel);

  return (
    <CheckboxGroupSlots.Provider
      value={{
        'checkbox-group-label': {
          ...labelProps,
          'aria-labelledby': ariaLabelledBy ? undefined : resolvedLabel,
        },
        'checkbox-group-description': descriptionProps,
        'checkbox-group-error': errorMessageProps,
      }}
    >
      <CheckboxGroupProvider value={ctxProps}>
        <CheckboxGroupStateProvider value={checkboxGroupStateCtxValue}>
          <RenderedComponent
            {...groupProps}
            {...filteredProps}
            {...renderProps}
            {...dataAttrs}
          />
        </CheckboxGroupStateProvider>
      </CheckboxGroupProvider>
    </CheckboxGroupSlots.Provider>
  );
}

CheckboxGroupRoot.displayName = 'NovaWaveUI.CheckboxGroup.Root';
