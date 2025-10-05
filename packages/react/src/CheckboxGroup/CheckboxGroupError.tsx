import React, { useMemo } from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { CheckboxGroupRenderProps } from './types';
import { useCheckboxGroupRenderContext } from './state';
import { useCheckboxGroupNWState } from './context';
import { CheckboxGroupSlots } from './slots';

export type CheckboxGroupErrorProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

export default function CheckboxGroupError<
  T extends React.ElementType = 'span',
>(props: CheckboxGroupErrorProps<T>) {
  // First, register the slot
  CheckboxGroupSlots.useRegisterSlot('checkbox-group-error');

  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot('checkbox-group-error', props);

  const { as: Component = 'span', asChild, children, ...rest } = slotProps;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupNWState();

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);
  console.log(nwGroupState);

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
