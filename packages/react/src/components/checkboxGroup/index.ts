import { CheckboxGroup as CheckboxGroupBase } from './CheckboxGroup';
import { CheckboxGroupDescription } from './CheckboxGroupDescription';
import { CheckboxGroupError } from './CheckboxGroupError';
import { CheckboxGroupLabel } from './CheckboxGroupLabel';
import { CheckboxGroupWrapper } from './CheckboxGroupWrapper';

export { useCheckboxGroupStateContext as useCheckboxGroupState } from './context';

export const CheckboxGroup = Object.assign(CheckboxGroupBase, {
  Label: CheckboxGroupLabel,
  Description: CheckboxGroupDescription,
  Error: CheckboxGroupError,
  Wrapper: CheckboxGroupWrapper,
});

export type { CheckboxGroupProps } from './CheckboxGroup';
export type { CheckboxGroupLabelProps } from './CheckboxGroupLabel';
export type { CheckboxGroupDescriptionProps } from './CheckboxGroupDescription';
export type { CheckboxGroupErrorProps } from './CheckboxGroupError';
export type { CheckboxGroupWrapperProps } from './CheckboxGroupWrapper';
