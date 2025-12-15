import React, { useCallback, useState } from 'react';
import { useTextField } from 'react-aria';
import { filterDOMProps } from '@react-aria/utils';
import {
  cn,
  dataProps,
  useDOMRef,
  useRenderProps,
  useSlot,
  useSlottedContext,
} from '../../utils';
import { TextFieldContext } from './context';
import { TextFieldProps } from './types';
import { TextFieldSlots } from './slots';

export function TextField(props: TextFieldProps) {
  // Get the context props from the TextFieldContext if any
  // and merge them with the passed props
  const ctxProps = useSlottedContext(TextFieldContext, props);

  const { validationBehavior = 'native' } = ctxProps;
  const inputRef = useDOMRef<HTMLInputElement>();
  const [labelRef, label] = useSlot(
    !props['aria-label'] && !props['aria-labelledby']
  );
  const [inputElementType, setInputElementType] = useState<
    'input' | 'textarea'
  >('input');
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    ...validation
  } = useTextField<any>(
    {
      ...ctxProps,
      inputElementType,
      label,
      validationBehavior,
    },
    inputRef
  );

  const inputOrTextAreaRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (el) {
        setInputElementType(
          el instanceof HTMLTextAreaElement ? 'textarea' : 'input'
        );
      }
    },
    [inputRef]
  );

  const renderProps = useRenderProps({
    ...ctxProps,
    values: {
      isDisabled: ctxProps.isDisabled || false,
      isInvalid: validation.isInvalid,
      isReadOnly: ctxProps.isReadOnly || false,
      isRequired: ctxProps.isRequired || false,
    },
    defaultClassName: cn('nw-textfield', ctxProps.className),
  });

  const DOMProps = filterDOMProps(ctxProps, { global: true });

  const dataAttrs = dataProps({
    invalid: validation.isInvalid,
  });

  return (
    <div
      {...DOMProps}
      {...dataAttrs}
      {...renderProps}
      slot={ctxProps.slot || undefined}
      data-component="textfield"
    >
      <TextFieldSlots.Provider
        value={{
          input: { ...inputProps, ref: inputOrTextAreaRef },
          label: {
            ...labelProps,
            required: ctxProps.isRequired,
            ref: labelRef,
          },
          errorField: {
            ...errorMessageProps,
            isInvalid: validation.isInvalid,
            validationErrors: validation.validationErrors,
            validationDetails: validation.validationDetails,
          },
          errorMessage: {
            ...errorMessageProps,
            isInvalid: validation.isInvalid,
            validationErrors: validation.validationErrors,
            validationDetails: validation.validationDetails,
          },
          description: descriptionProps,
        }}
      >
        {renderProps.children}
      </TextFieldSlots.Provider>
    </div>
  );
}
