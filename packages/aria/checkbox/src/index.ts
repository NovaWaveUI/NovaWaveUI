import CheckboxInput from './checkboxInput';
import CheckboxLabel from './checkboxLabel';
import CheckboxRoot from './checkboxRoot';

export const AriaCheckbox = {
  Root: CheckboxRoot,
  Input: CheckboxInput,
  Label: CheckboxLabel,
} as const;

export { default as CheckboxInput } from './checkboxInput';
export { default as CheckboxLabel } from './checkboxLabel';
export { default as CheckboxRoot } from './checkboxRoot';

export type { CheckboxInputProps } from './checkboxInput';
export type { CheckboxLabelProps } from './checkboxLabel';
export type { AriaCheckboxProps } from './checkboxRoot';
export type { CheckboxContextValue } from './checkboxContext';

// Export the context so that consumers can use it if needed
export { CheckboxProvider, useCheckboxContext } from './checkboxContext';

// Export the helper factory function to get state data attributes
export { getCheckboxStateDataProps } from './checkboxData';
