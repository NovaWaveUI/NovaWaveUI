import CheckboxIcon from './checkboxIcon';
import CheckboxInput from './checkboxInput';
import CheckboxLabel from './checkboxLabel';
import CheckboxRoot from './checkboxRoot';

export const AriaCheckbox = {
  Root: CheckboxRoot,
  Input: CheckboxInput,
  Label: CheckboxLabel,
  Icon: CheckboxIcon,
} as const;

export { default as CheckboxInput } from './checkboxInput';
export { default as CheckboxIcon } from './checkboxIcon';
export { default as CheckboxLabel } from './checkboxLabel';
export { default as CheckboxRoot } from './checkboxRoot';

export type { CheckboxInputProps } from './checkboxInput';
export type { CheckboxIconProps } from './checkboxIcon';
export type { CheckboxLabelProps } from './checkboxLabel';
export type { AriaCheckboxProps } from './checkboxRoot';
export type { CheckboxContextValue } from './checkboxContext';
