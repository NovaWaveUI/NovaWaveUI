import {
  forwardRefWith,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '@novawaveui/react-utils';
import { BaseCheckboxProps, CheckboxRenderProps } from './types';
import { CheckboxContext, useCheckboxState } from './context';
import {
  useCheckbox,
  useCheckboxGroupItem,
  useFocusRing,
  useHover,
  VisuallyHidden,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import { useMemo } from 'react';

const CheckboxRoot = forwardRefWith.ref<'label', BaseCheckboxProps>(
  (props, ref) => {
    // Extract out the user provided ref for the input element
    const { inputRef: userProvidedInputRef, ...rest } = props;
    // Get the context props, if any, and merge them with the original props
    const [ctxProps, ctxRef] = useContextProps(rest, ref, CheckboxContext);

    // Create a merged ref to the DOM element
    const domRef = useDOMRef(ctxRef);

    // Create a merged ref for the input element
    const inputRef = useDOMRef<HTMLInputElement>(userProvidedInputRef);

    // Get the props from the group if possible
    const groupState = useCheckboxState();
    const isInGroup = !!groupState;

    // Spread out and set default values for the props
    const {
      color = groupState?.color ?? 'neutral',
      size = groupState?.size ?? 'md',
      radius = groupState?.radius ?? 'md',
      ...restProps
    } = ctxProps;

    // Get the props from the useCheckboxGroupItem if in a group or
    // the useCheckbox if standalone
    // This will handle all the accessibility features for us
    const {
      labelProps,
      inputProps,
      isDisabled,
      isInvalid,
      isPressed,
      isReadOnly,
      isSelected,
    } = isInGroup
      ? useCheckboxGroupItem(
          {
            ...ctxProps,
            // Value is optional for standalone checkboxes, but required for CheckboxGroup items;
            // it's passed explicitly here to avoid typescript error (requires ignore).
            // @ts-expect-error - For group, it should be provided
            value: ctxProps.value,
            children:
              typeof ctxProps.children === 'function'
                ? true
                : ctxProps.children,
          },
          groupState,
          inputRef
        )
      : useCheckbox(
          {
            ...ctxProps,
            children:
              typeof ctxProps.children === 'function'
                ? true
                : ctxProps.children,
          },
          useToggleState(ctxProps),
          inputRef
        );

    const isInteractive = !isDisabled && !isReadOnly;
    const { isFocused, isFocusVisible, focusProps } = useFocusRing();

    const { isHovered, hoverProps } = useHover({
      ...ctxProps,
      isDisabled: !isInteractive,
    });

    const renderValues = useMemo<CheckboxRenderProps>(() => {
      return {
        isDisabled,
        isFocused,
        isFocusVisible,
        isHovered,
        isPressed,
        isReadOnly,
        isSelected,
        isInvalid,
        isRequired: ctxProps.isRequired || false,
        isIndeterminate: ctxProps.isIndeterminate || false,
      };
    }, [
      isDisabled,
      isFocused,
      isFocusVisible,
      isHovered,
      isPressed,
      isReadOnly,
      isSelected,
      isInvalid,
      ctxProps.isRequired,
      ctxProps.isIndeterminate,
    ]);

    const renderProps = useRenderProps({
      ...ctxProps,
      values: renderValues,
      defaultClassName: 'nw-checkbox',
      className: ctxProps.className,
    });

    return (
      <label>
        <VisuallyHidden elementType="span">
          <input ref={inputRef} />
        </VisuallyHidden>
      </label>
    );
  }
);
