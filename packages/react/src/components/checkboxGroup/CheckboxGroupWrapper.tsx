import React from 'react';
import { PolymorphicProps, useRenderProps } from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../slot';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

export type CheckboxGroupWrapperProps<T extends React.ElementType> =
  PolymorphicProps<T, {}>;

export function CheckboxGroupWrapper<T extends React.ElementType = 'div'>(
  props: CheckboxGroupWrapperProps<T>
) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot('wrapper', props);

  const { as: Component = 'div', asChild, ...rest } = slotProps;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

  const { renderValues } = useCheckboxGroupRenderContext(nwGroupState);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      {...renderProps}
      role="presentation"
      data-slot="wrapper"
    />
  );
}

CheckboxGroupWrapper.displayName = 'NovaWaveUI.CheckboxGroup.Wrapper';
