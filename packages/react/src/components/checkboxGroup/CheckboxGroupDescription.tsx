import React from 'react';
import { cn } from '../../utils';
import { RenderProps, useRenderProps } from '../../utils/react';
import { Text, TextProps } from '../primitives/text';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

export type CheckboxGroupDescriptionProps<T extends React.ElementType> = Omit<
  TextProps<T>,
  'children' | 'style' | 'className'
> &
  RenderProps<CheckboxGroupRenderProps>;

export function CheckboxGroupDescription<T extends React.ElementType = 'span'>(
  props: CheckboxGroupDescriptionProps<T>
) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot(
    'description',
    props
  ) as CheckboxGroupDescriptionProps<T>;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);

  const renderProps = useRenderProps({
    ...slotProps,
    values: renderValues,
    className: cn('nw-checkbox-group-description', slotProps.className),
    defaultClassName: cn('nw-checkbox-group-description', slotProps.className),
  });

  // Construct the final props for the Text component
  // The Text component will filter out any non-DOM props automatically
  const finalProps = {
    ...slotProps,
    ...renderProps,
    ...dataAttrs,
    'data-slot': 'checkbox-group-description' as const,
  } as TextProps<T>;

  return <Text {...finalProps} />;
}

CheckboxGroupDescription.displayName = 'NovaWaveUI.CheckboxGroup.Description';
