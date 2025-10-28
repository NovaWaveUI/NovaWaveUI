'use client';

import React from 'react';
import { cn } from '../../utils';
import { RenderProps, useRenderProps } from '../../utils/react';
import { Text, TextProps } from '../primitives/text';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

// The label props of the checkbox group
export type CheckboxGroupLabelProps<T extends React.ElementType> = Omit<
  TextProps<T>,
  'children' | 'className' | 'style'
> &
  RenderProps<CheckboxGroupRenderProps>;

export function CheckboxGroupLabel<T extends React.ElementType = 'span'>(
  props: CheckboxGroupLabelProps<T>
) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot(
    'label',
    props
  ) as CheckboxGroupLabelProps<T>;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);

  const renderProps = useRenderProps({
    ...slotProps,
    values: renderValues,
    className: cn('nw-checkbox-group-label', slotProps.className),
    defaultClassName: cn('nw-checkbox-group-label', slotProps.className),
  });

  const finalProps = {
    ...slotProps,
    ...renderProps,
    ...dataAttrs,
    'data-slot': 'checkbox-group-label' as const,
  } as TextProps<T>;

  return <Text {...finalProps} />;
}

CheckboxGroupLabel.displayName = 'NovaWaveUI.CheckboxGroup.Label';
