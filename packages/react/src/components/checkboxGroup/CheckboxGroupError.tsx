import React, { useMemo } from 'react';
import { cn, filterDOMProps } from '../../utils';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '../../utils/react';
import { Slot } from '../slot';
import { CheckboxGroupRenderProps } from './types';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';
import { TextProps } from '../primitives/text';

// The error props of the checkbox group
export type CheckboxGroupErrorProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

export function CheckboxGroupError<T extends React.ElementType = 'span'>(
  props: CheckboxGroupErrorProps<T>
) {
  const { as: Component = 'span', asChild, children, ...rest } = props;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

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
    className: cn('nw-checkbox-group-error', rest.className),
    defaultClassName: cn('nw-checkbox-group-error', rest.className),
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  const errorProps = {
    ...filteredProps,
    ...renderProps,
    ...dataAttrs,
    slot: 'error',
    'data-slot': 'checkbox-group-error' as const,
  } as TextProps<T>;

  return (
    <RenderedComponent
      {...filteredProps}
      {...renderProps}
      {...dataAttrs}
      data-slot="checkbox-group-error"
    />
  );
}

CheckboxGroupError.displayName = 'NovaWaveUI.CheckboxGroup.Error';
