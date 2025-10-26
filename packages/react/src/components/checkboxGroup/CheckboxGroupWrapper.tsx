import React from 'react';
import { PolymorphicProps, useRenderProps } from '../../utils/react';
import { cn, filterDOMProps } from '../../utils';
import { Slot } from '../slot';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';

export type CheckboxGroupWrapperProps<T extends React.ElementType> =
  PolymorphicProps<T, {}>;

export function CheckboxGroupWrapper<T extends React.ElementType = 'div'>(
  props: CheckboxGroupWrapperProps<T>
) {
  const { as: Component = 'div', asChild, ...rest } = props;

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
    className: cn('nw-checkbox-group-wrapper', rest.className),
    defaultClassName: cn('nw-checkbox-group-wrapper', rest.className),
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      {...renderProps}
      {...dataAttrs}
      role="presentation"
      data-slot="checkbox-group-wrapper"
    />
  );
}

CheckboxGroupWrapper.displayName = 'NovaWaveUI.CheckboxGroup.Wrapper';
