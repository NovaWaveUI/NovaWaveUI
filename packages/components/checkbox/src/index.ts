import CheckboxIcon from './checkboxIcon';
import CheckboxInput from './checkboxInput';
import CheckboxLabel from './checkboxLabel';
import CheckboxRoot from './checkboxRoot';

export { default as CheckboxRoot } from './checkboxRoot';
export { default as CheckboxInput } from './checkboxInput';
export { default as CheckboxLabel } from './checkboxLabel';
export { default as CheckboxIcon } from './checkboxIcon';

export type { CheckboxRootProps } from './checkboxRoot';
export type { CheckboxInputProps } from './checkboxInput';
export type { CheckboxLabelProps } from './checkboxLabel';
export type { CheckboxIconProps } from './checkboxIcon';

export const Checkbox = {
  Root: CheckboxRoot,
  Input: CheckboxInput,
  Label: CheckboxLabel,
  Icon: CheckboxIcon,
} as const;
