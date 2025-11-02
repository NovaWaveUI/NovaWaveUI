import React from 'react';
import { ValidationResult } from '@react-types/shared';
import { RenderProps } from '../../../utils';

export interface FieldErrorRenderProps extends ValidationResult {}

export interface FieldErrorBaseProps
  extends RenderProps<FieldErrorRenderProps>,
    Partial<ValidationResult> {}

export interface FieldErrorProps
  extends FieldErrorBaseProps,
    Omit<
      React.ComponentPropsWithRef<'div'>,
      'children' | 'className' | 'style'
    > {}

export interface FieldErrorInnerProps
  extends FieldErrorBaseProps,
    Omit<
      React.ComponentPropsWithRef<'span'>,
      'children' | 'className' | 'style'
    > {}
