import React from 'react';
import { Text, TextProps } from '../primitives/text';
import { TextFieldSlots } from './slots';

export type TextFieldErrorMessageProps<T extends React.ElementType> =
  TextProps<T>;

export function TextFieldErrorMessage<T extends React.ElementType = 'span'>(
  props: TextFieldErrorMessageProps<T>
) {
  // Get the slot props
  const slotProps = TextFieldSlots.useSlot('errorMessage', props);

  const errorMessageProps = {
    ...slotProps,
    'data-slot': 'textfield-errorMessage' as const,
  } as unknown as TextProps<T>;

  return <Text {...errorMessageProps} />;
}

TextFieldErrorMessage.displayName = 'NovaWaveUI.TextField.ErrorMessage';
