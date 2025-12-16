import React from 'react';
import { InputContext, InputProps } from '../primitives/input';
import { TextAreaContext, TextAreaProps } from '../primitives/textarea';
import { TextFieldSlots } from './slots';

export interface TextFieldInputProps {
  /**
   * The React children. Must consume the InputContext.
   */
  children?: React.ReactNode;
}

export function TextFieldInput(props: TextFieldInputProps) {
  const slotProps = TextFieldSlots.useSlot('input', {});

  const inputProps = {
    ...slotProps,
    'data-slot': 'textfield-input' as const,
  } as InputProps;

  const textAreaProps = {
    ...slotProps,
    'data-slot': 'textfield-textarea' as const,
  } as TextAreaProps;

  return (
    <TextAreaContext.Provider value={textAreaProps}>
      <InputContext.Provider value={inputProps}>
        {props.children}
      </InputContext.Provider>
    </TextAreaContext.Provider>
  );
}

TextFieldInput.displayName = 'NovaWaveUI.TextFieldInput';
