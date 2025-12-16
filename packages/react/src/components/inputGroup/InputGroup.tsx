'use client';
import React, { ElementType } from 'react';
import { ProviderSlotProps, useSlottedContext } from '../../utils';
import { Text, TextContext } from '../primitives/text';
import { Group } from '../primitives/group';
import { Input, InputContext, InputProps } from '../primitives/input';
import {
  InputGroupEndContentProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupStartContentProps,
} from './types';
import { InputGroupSlots } from './slots';
import { InputGroupContext } from './context';

export function InputGroupRoot(props: InputGroupProps) {
  // Get the context props from InputGroupContext if any
  // and merge them with the passed props
  const ctxProps = useSlottedContext(InputGroupContext, props);

  return (
    <InputGroupSlots.Provider value={{}}>
      <Group {...ctxProps} data-component="inputgroup" />
    </InputGroupSlots.Provider>
  );
}

InputGroupRoot.displayName = 'NovaWaveUI.InputGroup.Root';

export function InputGroupStartContentProvider(props: ProviderSlotProps) {
  // Get the slot props
  const slotProps = InputGroupSlots.useSlot('startContent', {});

  const startContentProps = {
    ...slotProps,
    'data-slot': 'inputgroup-startContent' as const,
  } as InputGroupStartContentProps<ElementType>;

  return (
    <TextContext.Provider value={startContentProps}>
      {props.children}
    </TextContext.Provider>
  );
}

InputGroupStartContentProvider.displayName =
  'NovaWaveUI.InputGroup.StartContentProvider';

export function InputGroupStartContent<T extends ElementType = 'span'>(
  props: InputGroupStartContentProps<T>
) {
  return <Text {...props} />;
}

InputGroupStartContent.displayName = 'NovaWaveUI.InputGroup.StartContent';

export function InputGroupEndContentProvider(props: ProviderSlotProps) {
  // Get the slot props
  const slotProps = InputGroupSlots.useSlot('endContent', {});

  const endContentProps = {
    ...slotProps,
    'data-slot': 'inputgroup-endContent' as const,
  } as InputGroupEndContentProps<ElementType>;

  return (
    <TextContext.Provider value={endContentProps}>
      {props.children}
    </TextContext.Provider>
  );
}

InputGroupEndContentProvider.displayName =
  'NovaWaveUI.InputGroup.EndContentProvider';

export function InputGroupEndContent<T extends ElementType = 'span'>(
  props: InputGroupEndContentProps<T>
) {
  return <Text {...props} />;
}

InputGroupEndContent.displayName = 'NovaWaveUI.InputGroup.EndContent';

export function InputGroupInputProvider(props: ProviderSlotProps) {
  // Get the slot props
  const slotProps = InputGroupSlots.useSlot('input', {});

  const inputProps = {
    ...slotProps,
    'data-slot': 'inputgroup-input' as const,
  } as InputProps;

  return (
    <InputContext.Provider value={inputProps}>
      {props.children}
    </InputContext.Provider>
  );
}

InputGroupInputProvider.displayName = 'NovaWaveUI.InputGroup.InputProvider';

export function InputGroupInput(props: InputGroupInputProps) {
  return (
    <InputGroupInputProvider>
      <Input {...props} />
    </InputGroupInputProvider>
  );
}

InputGroupInput.displayName = 'NovaWaveUI.InputGroup.Input';
