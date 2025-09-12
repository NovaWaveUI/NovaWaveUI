import React, { useState } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import { AriaCheckboxProps as RACheckboxProps } from '@react-types/checkbox';
import {
  forwardRefWith,
  PolymorphicProps,
  useDOMRef,
} from '@novawaveui/react-utils';
import { useToggleState } from '@react-stately/toggle';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { FocusState } from '@novawaveui/types';
import { CheckboxContextValue, CheckboxProvider } from './checkboxContext';
import { getCheckboxDataProps } from './checkboxData';

type Props = RACheckboxProps & {
  className?: string;
  children?: React.ReactNode;
};

export type AriaCheckboxProps<E extends React.ElementType = 'div'> =
  PolymorphicProps<E, Props>;

const CheckboxRoot = forwardRefWith.as<'div', Props>((props, ref) => {
  const { children, isIndeterminate, isRequired, isInvalid, className, as } =
    props;
  const state = useToggleState(props);

  // Create useState hooks for focus states
  const [focusState, setFocusState] = useState<FocusState>({
    isFocused: false,
    isFocusVisible: false,
  });

  // Create a non-null ref to the input element
  // We will pass it to the context provider
  // so that when the input is rendered in a child (separate) component
  // it can receive the ref
  // We will also merge with consumer forwarded refs if they are
  // passed to that component as well
  const inputRef = useDOMRef<HTMLInputElement>();

  const ariaCheckbox = useCheckbox(props, state, inputRef);

  // Get the press properties for the root element
  const { isPressed, pressProps } = usePress({
    isDisabled: ariaCheckbox.isDisabled,
  });

  // Get the hover properties for the root element
  const { hoverProps, isHovered } = useHover({
    isDisabled: ariaCheckbox.isDisabled,
  });

  // Merge the interaction props
  const mergedProps = mergeProps(hoverProps, pressProps, props);

  // Create a non-null ref to the root element
  // useDOMRef will either create a non-null new ref
  // or use the forwarded ref passed to the component
  const domRef = useDOMRef<HTMLDivElement>(ref);

  // Create the context value so that others can use it
  const contextValue: CheckboxContextValue = {
    state,
    aria: ariaCheckbox,
    inputRef,
    setFocusState,
    ...focusState,
    isHovered,
    isPressed,
    isIndeterminate,
    isDisabled: ariaCheckbox.isDisabled,
    isRequired,
    isSelected: ariaCheckbox.isSelected,
    isInvalid: ariaCheckbox.isInvalid || isInvalid,
    isReadOnly: ariaCheckbox.isReadOnly,
  };

  // Create the data attrributes for the states
  const dataAttrs = getCheckboxDataProps(contextValue, 'root');

  // Get the component
  const Component = as || 'div';

  return (
    <CheckboxProvider value={contextValue}>
      <Component
        className={className}
        ref={domRef}
        {...mergedProps}
        {...dataAttrs}
      >
        {children}
      </Component>
    </CheckboxProvider>
  );
});

CheckboxRoot.displayName = 'NovawaveUI.AriaCheckbox.Root';

export default CheckboxRoot;
