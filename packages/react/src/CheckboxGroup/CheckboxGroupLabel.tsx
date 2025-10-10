import { ElementType, useLayoutEffect } from 'react';
import { useRenderProps } from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { useCheckboxGroupState } from './context';
import { useCheckboxGroupRenderContext } from './state';
import { CheckboxGroupSlots } from './slots';
import { CheckboxGroupLabelProps } from './types';

export default function CheckboxGroupLabel<T extends ElementType = 'span'>(
  props: CheckboxGroupLabelProps<T>
) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot(
    'checkbox-group-label',
    props
  ) as CheckboxGroupLabelProps<T>;

  const { as: Component = 'span', asChild, id, ...rest } = slotProps;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupState();

  // Register the label ID
  useLayoutEffect(() => {
    if (id) {
      nwGroupState?.setLabelId(id);
    }
    return () => {
      if (id) {
        nwGroupState?.setLabelId(undefined);
      }
    };
  }, [id, nwGroupState]);

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const RenderedComponent: ElementType = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      {...renderProps}
      {...dataAttrs}
      data-slot="checkbox-group-label"
    />
  );
}

CheckboxGroupLabel.displayName = 'NovaWaveUI.CheckboxGroup.Label';
