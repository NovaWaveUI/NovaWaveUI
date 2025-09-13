import React from 'react';
import { mergeProps, mergeRefs } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { useSafeLayoutEffect } from '@novawaveui/use-safe-layout-effect';
import { forwardRefWith } from '@novawaveui/react-utils';
import { useCheckboxContext } from './checkboxContext';
import { getCheckboxStateDataProps } from './checkboxData';

export type CheckboxInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxInput = forwardRefWith.ref<'input', CheckboxInputProps>(
  (props, ref) => {
    // Get the checkbox context
    const context = useCheckboxContext();

    // Merge the input props from context with the props passed to the component
    const inputProps = context.aria.inputProps;
    const mergedInputProps = { ...inputProps, ...props };

    // Merge refs together
    const inputRef = mergeRefs(ref, context.inputRef);

    // Create the focus interaction
    const { focusProps, isFocused, isFocusVisible } = useFocusRing({
      autoFocus: mergedInputProps.autoFocus,
    });

    // Update the context focus state when it changes
    useSafeLayoutEffect(() => {
      context.setFocusState({ isFocused, isFocusVisible });
    }, [isFocused, isFocusVisible, context.setFocusState]);

    // Taken from HeroUI, we need to sync the ref checked state in the input element
    // with the current state, in case external libraries are used to control the checkbox
    useSafeLayoutEffect(() => {
      // @ts-expect-error - We know the ref is set because it's merged with context ref
      // which is always set in the root component
      if (!inputRef || !inputRef.current) return;
      // @ts-expect-error - We know the ref is set because it's merged with context ref
      const isInputRefChecked = !!inputRef.current.checked;

      context.state.setSelected(isInputRefChecked);
    }, [inputRef, context.state]);

    // Merge together the final input props
    const mergedProps = mergeProps(mergedInputProps, focusProps);

    // Get the data attributes for the input
    const dataAttrs = getCheckboxStateDataProps(context);

    return (
      <input {...mergedProps} ref={inputRef} {...dataAttrs} data-slot="input" />
    );
  }
);

CheckboxInput.displayName = 'NovaWaveUI.AriaCheckbox.Input';

export default CheckboxInput;
