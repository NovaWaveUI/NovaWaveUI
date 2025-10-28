'use client';

import React from 'react';
import { Group, GroupProps } from '../primitives/group';
import { useCheckboxGroupStateContext } from './context';
import { useCheckboxGroupRenderContext } from './state';
import { CheckboxGroupSlots } from './slots';

export type CheckboxGroupWrapperProps = GroupProps;

export function CheckboxGroupWrapper(props: CheckboxGroupWrapperProps) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot(
    'wrapper',
    props
  ) as CheckboxGroupWrapperProps;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupStateContext();

  const { dataAttrs } = useCheckboxGroupRenderContext(nwGroupState);

  return (
    <Group
      {...dataAttrs}
      {...slotProps}
      role="presentation"
      data-slot="checkbox-group-wrapper"
    />
  );
}

CheckboxGroupWrapper.displayName = 'NovaWaveUI.CheckboxGroup.Wrapper';
