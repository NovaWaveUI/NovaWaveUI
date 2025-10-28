'use client';

import React from 'react';
import { cn } from '../../utils';
import { RenderProps, useRenderProps } from '../../utils/react';
import { Text, TextProps } from '../primitives/text';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

// The error props of the checkbox group
export type CheckboxGroupErrorProps<T extends React.ElementType> = Omit<
  TextProps<T>,
  'children' | 'className' | 'style'
> &
  RenderProps<CheckboxGroupRenderProps>;

export function CheckboxGroupError<T extends React.ElementType = 'span'>(
  props: CheckboxGroupErrorProps<T>
) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot(
    'error',
    props
  ) as CheckboxGroupErrorProps<T>;

  // Extract the children from the slot props
  const { children } = slotProps;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);

  // Only show the children if the checkbox group is in an invalid state
  const resolvedChildren =
    children && nwGroupState.isInvalid ? children : undefined;

  const renderProps = useRenderProps({
    ...slotProps,
    children: resolvedChildren,
    values: renderValues,
    className: cn('nw-checkbox-group-error', slotProps.className),
    defaultClassName: cn('nw-checkbox-group-error', slotProps.className),
  });

  const finalProps = {
    ...slotProps,
    ...renderProps,
    ...dataAttrs,
    'data-slot': 'checkbox-group-error' as const,
  } as TextProps<T>;

  return <Text {...finalProps} />;
}

CheckboxGroupError.displayName = 'NovaWaveUI.CheckboxGroup.Error';
