import React, { ElementType } from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { Key } from 'react-aria';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../slot';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

// The label props of the checkbox group
export type CheckboxGroupLabelProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>> & {
    /**
     * The ID of the element. Used to link the label to the checkbox group for accessibility.
     */
    id?: Key;
  };

export function CheckboxGroupLabel<T extends React.ElementType = 'span'>(
  props: CheckboxGroupLabelProps<T>
) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot(
    'label',
    props
  ) as CheckboxGroupLabelProps<T>;

  const { as: Component = 'span', asChild, ...rest } = slotProps;

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

  const RenderedComponent: ElementType = asChild ? Slot : Component;

  return (
    <RenderedComponent {...filteredProps} {...renderProps} data-slot="label" />
  );
}

CheckboxGroupLabel.displayName = 'NovaWaveUI.CheckboxGroup.Label';
