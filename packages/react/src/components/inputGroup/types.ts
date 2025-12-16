import { ElementType } from 'react';
import { TextProps } from '../primitives/text';
import { InputProps } from '../primitives/input';
import { GroupProps } from '../primitives/group';

export interface InputGroupStyleProps {
  /**
   * The size of the input group.
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * ==============================
 * InputGroup Props
 * ==============================
 */
export interface InputGroupProps extends InputGroupStyleProps, GroupProps {}

/**
 * ==============================
 * InputGroup Slot Props
 * ==============================
 */

export type InputGroupStartContentProps<T extends ElementType> = TextProps<T>;
export type InputGroupEndContentProps<T extends ElementType> = TextProps<T>;
export type InputGroupInputProps = InputProps;
