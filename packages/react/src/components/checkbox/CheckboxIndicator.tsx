import React from 'react';
import { cn, filterDOMProps } from '../../utils';
import { PolymorphicProps } from '../../utils/react';
import { Slot } from '../slot';
import { useCheckboxState } from './context';

export type CheckboxIndicatorProps<T extends React.ElementType> =
  PolymorphicProps<T, {}>;

export function CheckboxIndicator<T extends React.ElementType = 'div'>(
  props: CheckboxIndicatorProps<T>
) {
  const { as: Component = 'div', asChild, ...rest } = props;

  const checkboxStateCtx = useCheckboxState();

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  const DOMProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...DOMProps}
      className={cn('nw-checkbox-indicator', rest.className)}
      {...checkboxStateCtx.styleDataAttrs}
      data-slot="checkbox-indicator"
    />
  );
}

CheckboxIndicator.displayName = 'NovaWaveUI.Checkbox.Indicator';
