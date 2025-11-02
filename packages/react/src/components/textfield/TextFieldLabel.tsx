import React from 'react';
import { Label, LabelProps } from '../label';
import { TextFieldSlots } from './slots';

export type TextFieldLabelProps<T extends React.ElementType = 'label'> =
  LabelProps<T>;

export function TextFieldLabel<T extends React.ElementType = 'label'>(
  props: TextFieldLabelProps<T>
) {
  const slotProps = TextFieldSlots.useSlot('label', props);

  // Need to add unknown but this is type-safe
  const labelProps = {
    ...slotProps,
    as: props.as || 'label',
    'data-slot': 'textfield-label' as const,
  } as unknown as TextFieldLabelProps<T>;

  return <Label {...labelProps} />;
}

TextFieldLabel.displayName = 'NovaWaveUI.TextField.Label';
