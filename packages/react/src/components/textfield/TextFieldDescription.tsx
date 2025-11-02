import React from 'react';
import { TextProps } from '../primitives/text';
import { TextFieldSlots } from './slots';

export type TextFieldDescriptionProps<T extends React.ElementType> =
  TextProps<T>;

export function TextFieldDescription<T extends React.ElementType = 'span'>(
  props: TextFieldDescriptionProps<T>
) {
  const slotProps = TextFieldSlots.useSlot('description', props);

  const descriptionProps = {
    ...slotProps,
    'data-slot': 'textfield-description' as const,
  } as unknown as TextProps<T>;

  return <span {...descriptionProps} />;
}

TextFieldDescription.displayName = 'NovaWaveUI.TextField.Description';
