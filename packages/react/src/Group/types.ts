import { RenderProps } from '@novawaveui/react-utils';
import { HoverProps } from '@react-aria/interactions';
import { AriaLabelingProps } from '@react-types/shared';
import { ElementType, HTMLAttributes } from 'react';

export interface GroupRenderProps {
  /**
   * Whether the group is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;

  /**
   * Whether an element within the group is focused.
   * @selector [data-focused]
   */
  isFocusedWithin: boolean;

  /**
   * Whether an element within the group is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;

  /**
   * Whether the group is disabled.
   */
  isDisabled: boolean;

  /**
   * Whether the group is in a loading state.
   * @selector [data-loading]
   */
  isLoading: boolean;

  /**
   * Whether the group is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export interface GroupProps<T extends ElementType = 'div'>
  extends Omit<HTMLAttributes<T>, 'children' | 'className' | 'style' | 'role'>,
    RenderProps<GroupRenderProps>,
    AriaLabelingProps,
    HoverProps {
  /**
   * Whether the group is disabled.
   */
  isDisabled?: boolean;

  /**
   * Whether the group is in a loading state.
   */
  isLoading?: boolean;

  /**
   * Whether the group is in an invalid state.
   */
  isInvalid?: boolean;

  /**
   * The HTML element or React component used to render the group.
   */
  as?: T;

  /**
   * The role of the group element.
   */
  role?: 'group' | 'region' | 'presentation';
}

export type GroupContextValue = GroupProps;
