import React from 'react';
import { useRenderProps } from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { useButtonState } from './context';
import { ButtonTextProps } from './types';
import { ButtonSlots } from './slots';
import { useButtonRenderContext } from './state';

function ButtonText<T extends React.ElementType = 'span'>(
  props: ButtonTextProps<T>
) {
  // Extract the props for this slot from the context
  const slotProps = ButtonSlots.useSlot('text', props) as ButtonTextProps<T>;

  // First, extract the `as` prop and the rest of the props
  const { as: Component = 'span', asChild, ...rest } = slotProps;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the button state context so that we can get the current state
  // and data properties
  const buttonStateCtx = useButtonState();

  // Get the data attributes from the context
  const { dataAttrs, renderValues } = useButtonRenderContext(buttonStateCtx);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      {...dataAttrs}
      {...renderProps}
      data-slot="text"
    />
  );
}

ButtonText.displayName = 'NovaWaveUI.Button.Text';

export default ButtonText;
