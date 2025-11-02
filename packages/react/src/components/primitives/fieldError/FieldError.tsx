import React from 'react';
import { useRenderProps } from '../../../utils';
import { Text } from '../text';
import { FieldErrorInnerProps, FieldErrorProps } from './types';

export function FieldError(props: FieldErrorProps) {
  if (!props.isInvalid) {
    return;
  }

  return <FieldErrorInner {...props} />;
}
FieldError.displayName = 'NovaWaveUI.FieldError';

export function FieldErrorInner(props: FieldErrorInnerProps) {
  const { children, style, className, ...textProps } = props;

  const renderProps = useRenderProps({
    children,
    style,
    className,
    values: {
      isInvalid: props.isInvalid || false,
      validationDetails: props.validationDetails || {
        badInput: false,
        customError: false,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valueMissing: false,
        valid: true,
      },
      validationErrors: props.validationErrors || [],
    },
    defaultChildren:
      props.validationErrors?.length === 0
        ? undefined
        : props.validationErrors?.join(', '),
  });

  return <Text {...textProps} {...renderProps} />;
}
FieldErrorInner.displayName = 'NovaWaveUI.FieldErrorInner';
