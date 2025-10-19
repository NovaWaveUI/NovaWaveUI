import React from 'react';
import {
  DisabledState,
  FocusState,
  HoverState,
  PressState,
  ReadOnlyState,
  SelectionState,
  NWColor,
  NWRadius,
  NWSize,
} from '@novawaveui/types';
import { HoverEvents } from '@react-types/shared';
import { AriaCheckboxGroupProps, AriaCheckboxProps } from 'react-aria';
import { CheckboxGroupState } from 'react-stately';
import { RenderProps } from '../../utils/react';

export interface CheckboxRenderProps
  extends FocusState,
    HoverState,
    PressState,
    DisabledState,
    ReadOnlyState,
    SelectionState {
  /**
   * Whether or not the checkbox is currently indeterminate.
   * @selector [data-indeterminate]
   */
  isIndeterminate: boolean;
  /**
   * Whether or not the checkbox is required.
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether or not the checkbox is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export interface CheckboxStyleProps {
  /**
   * The color of the checkbox.
   */
  color?: NWColor;
  /**
   * The size of the checkbox.
   */
  size?: NWSize;
  /**
   * The radius of the checkbox.
   */
  radius?: NWRadius;
}

export interface CheckboxRootProps
  extends Omit<AriaCheckboxProps, 'children' | 'className' | 'style'>,
    HoverEvents,
    RenderProps<CheckboxRenderProps>,
    CheckboxStyleProps {
  /**
   * A ref to the internal input element.
   */
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export type CheckboxPropsContextValue = CheckboxRootProps;

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
    RenderProps<CheckboxGroupRenderProps>,
    CheckboxGroupStyleProps {}

export type CheckboxGroupPropsContextValue = CheckboxGroupProps;

export interface CheckboxGroupStateContextValue
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
}
