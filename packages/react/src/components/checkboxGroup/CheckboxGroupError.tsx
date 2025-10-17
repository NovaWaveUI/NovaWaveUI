import React, { useMemo } from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../slot';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

// The error props of the checkbox group
export type CheckboxGroupErrorProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

export function CheckboxGroupError<T extends React.ElementType = 'span'>(
  props: CheckboxGroupErrorProps<T>
) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot('error', props);

  const { as: Component = 'span', asChild, children, ...rest } = slotProps;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

  const { renderValues } = useCheckboxGroupRenderContext(nwGroupState);

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
    <RenderedComponent {...filteredProps} {...renderProps} data-slot="error" />
  );
}

CheckboxGroupError.displayName = 'NovaWaveUI.CheckboxGroup.Error';
