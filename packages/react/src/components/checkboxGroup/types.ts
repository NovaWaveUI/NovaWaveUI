import { DisabledState, ReadOnlyState, NWSize } from '@novawaveui/types';
import { CheckboxGroupState } from 'react-stately';

export interface CheckboxGroupRenderProps extends DisabledState, ReadOnlyState {
  /**
   * Whether or not the checkbox group is read only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the checkbox group is required.
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether the checkbox group is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * State of the checkbox group.
   */
  state: CheckboxGroupState;
}

export interface CheckboxGroupStyleProps {
  /**
   * The size of the checkbox group.
   */
  size?: NWSize;
}
