import React from 'react';
import { FieldError, FieldErrorProps } from '../primitives/fieldError';
import { TextFieldSlots } from './slots';

export type TextFieldErrorProps = FieldErrorProps;

export function TextFieldError(props: TextFieldErrorProps) {
  const slotProps = TextFieldSlots.useSlot('errorField', props);

  const errorProps = {
    ...slotProps,
    'data-slot': 'textfield-errorField' as const,
  } as FieldErrorProps;

  return <FieldError {...errorProps} />;
}

TextFieldError.displayName = 'NovaWaveUI.TextField.Error';
