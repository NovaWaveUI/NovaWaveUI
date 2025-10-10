import React, { useMemo } from 'react';
import { useRenderProps } from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { CheckboxGroupErrorProps } from './types';
import { useCheckboxGroupRenderContext } from './state';
import { useCheckboxGroupState } from './context';
import { CheckboxGroupSlots } from './slots';

export default function CheckboxGroupError<
  T extends React.ElementType = 'span',
>(props: CheckboxGroupErrorProps<T>) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot('checkbox-group-error', props);

  const { as: Component = 'span', asChild, children, ...rest } = slotProps;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupState();

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);

  // Only show the children if the checkbox group is in an invalid state
  const resolvedChildren = useMemo(
    () => (children && nwGroupState.isInvalid ? children : undefined),
    [children, renderValues.isInvalid]
  );

  const renderProps = useRenderProps({
    ...rest,
    children: resolvedChildren,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      {...dataAttrs}
      {...renderProps}
      data-slot="checkbox-group-error"
    />
  );
}

CheckboxGroupError.displayName = 'NovaWaveUI.CheckboxGroup.Error';
