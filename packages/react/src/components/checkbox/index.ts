/* eslint-disable no-unused-vars */
import React from 'react';
import { Checkbox as CheckboxBase, CheckboxProps } from './Checkbox';
import { CheckboxIcon, CheckboxIconProps } from './CheckboxIcon';
import { CheckboxIndicator, CheckboxIndicatorProps } from './CheckboxIndicator';
import { CheckboxLabel, CheckboxLabelProps } from './CheckboxLabel';

export interface CheckboxType {
  (props: CheckboxProps): React.ReactElement | null;
  Label: <T extends Exclude<React.ElementType, 'label'>>(
    props: CheckboxLabelProps<T>
  ) => React.ReactElement | null;
  Icon: <T extends React.ElementType = 'span'>(
    props: CheckboxIconProps<T>
  ) => React.ReactElement | null;
  Indicator: <T extends React.ElementType = 'div'>(
    props: CheckboxIndicatorProps<T>
  ) => React.ReactElement | null;
}

/**
 * The `Checkbox` component is used to allow users to select one or more options from a set.
 */
export const Checkbox = Object.assign(CheckboxBase, {
  Icon: CheckboxIcon,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
}) as CheckboxType;

export type { CheckboxProps } from './Checkbox';
export type { CheckboxIconProps } from './CheckboxIcon';
export type { CheckboxIndicatorProps } from './CheckboxIndicator';
export type { CheckboxLabelProps } from './CheckboxLabel';
export type { CheckboxRenderProps, CheckboxStyleProps } from './types';
export {
  CheckboxContext,
  CheckboxState,
  useCheckboxContextProps,
} from './context';
