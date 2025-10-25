import React from 'react';
import { cn, filterDOMProps } from '../../utils';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '../../utils/react';
import { Text, TextProps } from '../primitives/text';
import { CheckboxGroupRenderProps } from './types';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

export type CheckboxGroupDescriptionProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

export function CheckboxGroupDescription<T extends React.ElementType = 'span'>(
  props: CheckboxGroupDescriptionProps<T>
) {
  const { as: Component = 'span', asChild, ...rest } = props;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
    className: cn('nw-checkbox-group-description', rest.className),
    defaultClassName: cn('nw-checkbox-group-description', rest.className),
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const descriptionProps = {
    ...filteredProps,
    ...renderProps,
    ...dataAttrs,
    slot: 'description',
    'data-slot': 'checkbox-group-description' as const,
  } as TextProps<T>;

  return <Text {...descriptionProps} />;
}

CheckboxGroupDescription.displayName = 'NovaWaveUI.CheckboxGroup.Description';
