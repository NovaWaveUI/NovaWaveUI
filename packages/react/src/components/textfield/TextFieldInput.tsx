import React from 'react';
import { Input, InputProps } from '../primitives/input';
import { TextFieldSlots } from './slots';

export type TextFieldInputProps = InputProps;

export function TextFieldInput(props: TextFieldInputProps) {
  const slotProps = TextFieldSlots.useSlot('input', props);

  const inputProps = {
    ...slotProps,
    'data-slot': 'textfield-input' as const,
  } as InputProps;

  return <Input {...inputProps} />;
}

TextFieldInput.displayName = 'NovaWaveUI.TextFieldInput';
