import { RenderProps, SlotProps } from '@novawaveui/react-utils';
import { NWColor, NWRadius, NWSize } from '@novawaveui/theme';
import { DisabledState, ReadOnlyState } from '@novawaveui/types';
import { AriaCheckboxGroupProps } from 'react-aria';
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
   * The color of the checkbox group.
   */
  color?: NWColor;
  /**
   * The size of the checkbox group.
   */
  size?: NWSize;
  /**
   * The radius of the checkbox group.
   */
  radius?: NWRadius;
}

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, 'children'>,
    SlotProps,
    RenderProps<CheckboxGroupRenderProps>,
    CheckboxGroupStyleProps {}

export type CheckboxGroupPropsContextValue = CheckboxGroupProps;

export interface CheckboxGroupNWStateContextValue
  extends CheckboxGroupRenderProps {
  /**
   * The color of the checkbox group.
   */
  color?: CheckboxGroupProps['color'];
  /**
   * The size of the checkbox group.
   */
  size?: CheckboxGroupProps['size'];
  /**
   * The radius of the checkbox group.
   */
  radius?: CheckboxGroupProps['radius'];
  /**
   * The validation details of the checkbox group.
   */
  validationDetails?: ValidityState;
  /**
   * The validation errors of the checkbox group.
   */
  validationErrors?: string[];
  /**
   * The orientation of the checkbox group.
   */
  orientation?: 'vertical' | 'horizontal';
}
