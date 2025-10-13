import React from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../slot';
import { CheckboxRenderProps } from './types';
import { CheckboxSlots } from './slots';
import { useCheckboxState } from './context';
import { useCheckboxRenderContext } from './state';
import { CheckIcon, LineIcon } from './icons';

export type CheckboxIconProps<T extends React.ElementType> = PolymorphicProps<
  T,
  RenderProps<CheckboxRenderProps>
>;

export function CheckboxIcon<T extends React.ElementType = 'span'>(
  props: CheckboxIconProps<T>
) {
  // Next get any slot props
  const slotProps = CheckboxSlots.useSlot(
    'checkbox-icon',
    props
  ) as CheckboxIconProps<T>;

  const { as: Component = 'span', asChild, ...rest } = slotProps;
  let { children } = slotProps;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the checkbox state so that we get the current state
  // and data properties
  const checkboxStateCtx = useCheckboxState();

  // Get the data attributes from the context
  const { renderValues } = useCheckboxRenderContext(checkboxStateCtx);

  if (!children) {
    children = ({ isIndeterminate }) =>
      isIndeterminate ? <LineIcon /> : <CheckIcon />;
  }

  const renderProps = useRenderProps({
    ...rest,
    children,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      className={renderProps.className}
      style={renderProps.style}
      data-slot="checkbox-icon"
      aria-hidden={true}
    >
      {renderProps.children}
    </RenderedComponent>
  );
}

CheckboxIcon.displayName = 'NovaWaveUI.CheckboxIcon';
