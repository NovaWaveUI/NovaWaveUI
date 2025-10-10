/* eslint-disable no-unused-vars */
import {
  PolymorphicProps,
  RenderProps,
  SlotProps,
} from '@novawaveui/react-utils';
import { NWColor, NWRadius, NWSize } from '@novawaveui/theme';
import { DisabledState, ReadOnlyState } from '@novawaveui/types';
import React from 'react';
import { AriaCheckboxGroupProps, Key } from 'react-aria';
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

// The root props of the checkbox group
export type CheckboxGroupRootProps<T extends React.ElementType> = Omit<
  PolymorphicProps<
    T,
    Omit<AriaCheckboxGroupProps, 'children'> &
      SlotProps &
      RenderProps<CheckboxGroupRenderProps> &
      CheckboxGroupStyleProps & {
        /**
         * The orientation of the checkbox group.
         * @default 'vertical'
         */
        orientation?: 'vertical' | 'horizontal';
      }
  >,
  'label'
>;

// The label props of the checkbox group
export type CheckboxGroupLabelProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>> & {
    /**
     * The ID of the element. Used to link the label to the checkbox group for accessibility.
     */
    id?: Key;
  };

// The description props of the checkbox group
export type CheckboxGroupDescriptionProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

// The error props of the checkbox group
export type CheckboxGroupErrorProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

// The wrapper props of the checkbox group
export type CheckboxGroupWrapperProps<T extends React.ElementType> =
  PolymorphicProps<T, {}>;

// The context value for the checkbox group props
export type CheckboxGroupContextValue<T extends React.ElementType> =
  CheckboxGroupRootProps<T>;

export interface CheckboxGroupStateContextValue<T extends React.ElementType>
  extends CheckboxGroupRenderProps {
  /**
   * The color of the checkbox group.
   */
  color?: CheckboxGroupRootProps<T>['color'];
  /**
   * The size of the checkbox group.
   */
  size?: CheckboxGroupRootProps<T>['size'];
  /**
   * The radius of the checkbox group.
   */
  radius?: CheckboxGroupRootProps<T>['radius'];
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
  /**
   * The function to set the ID of the label element.
   */
  setLabelId: (id: Key | undefined) => void;
}
