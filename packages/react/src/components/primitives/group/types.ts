import React from 'react';
import { DisabledState, HoverState } from '@novawaveui/types';
import { AriaLabelingProps } from '@react-types/shared';
import { HoverProps } from 'react-aria';
import { RenderProps, SlotProps } from '../../../utils';

export interface GroupRenderProps extends HoverState, DisabledState {
  /**
   * Whether the element is focused within the group.
   * @selector [data-focused]
   */
  isFocusedWithin: boolean;
  /**
   * Whether the element is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the group is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export interface GroupProps
  extends AriaLabelingProps,
    Omit<
      React.ComponentPropsWithRef<'div'>,
      'children' | 'style' | 'className' | 'role' | 'slot'
    >,
    HoverProps,
    SlotProps,
    RenderProps<GroupRenderProps> {
  /**
   * Whether the group is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the group is in an invalid state.
   */
  isInvalid?: boolean;
  /**
   * Whether the group is read only.
   */
  isReadOnly?: boolean;
  /**
   * The role of the group.
   * By default, this is set to "group". Use `'region'` when the contents of the group
   * is important enough to be included in a page summary or table of contents. Use
   * `'presentation'` when the group is purely presentational.
   * @default 'group'
   */
  role?: 'group' | 'region' | 'presentation';
}
