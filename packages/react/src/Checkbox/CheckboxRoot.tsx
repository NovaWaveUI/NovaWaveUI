import React, { useMemo } from 'react';
import {
  RenderProps,
  SlotProps,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '@novawaveui/react-utils';
import {
  AriaCheckboxProps,
  HoverEvents,
  mergeProps,
  useCheckbox,
  useCheckboxGroupItem,
  useFocusRing,
  useHover,
  VisuallyHidden,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import { cn, filterDOMProps } from '@novawaveui/utils';
import { useCheckboxGroupNWState } from '../CheckboxGroup';
import {
  CheckboxRenderProps,
  CheckboxStateContextValue,
  CheckboxStyleProps,
} from './types';
import {
  CheckboxPropsProvider,
  CheckboxStateProvider,
  getCheckboxDataAttrs,
} from './context';
import { CheckboxSlots } from './slots';

export type CheckboxRootProps = Omit<
  AriaCheckboxProps,
  'children' | 'className' | 'style'
> &
  HoverEvents &
  SlotProps &
  RenderProps<CheckboxRenderProps> &
  CheckboxStyleProps & {
    /**
     * A ref to the internal input element.
     */
    inputRef?: React.Ref<HTMLInputElement | null>;
  };

export default function CheckboxRoot(props: CheckboxRootProps) {
  // Extract out the user provided ref for the input element
  const { inputRef: userProvidedInputRef, ...rest } = props;

  // Get the context props, if any, and merge them with the original props
  const [ctxProps, ctxRef] = useContextProps(rest, CheckboxPropsProvider);

  // Create a merged ref to the DOM element
  const domRef = useDOMRef(ctxRef);

  // Create a merged ref for the input element
  const inputRef = useDOMRef<HTMLInputElement>(userProvidedInputRef);

  // Get the props from the group if possible
  const groupState = useCheckboxGroupNWState();
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
          // @ts-expect-error - Value will be populated
          value: ctxProps.value,
          children:
            typeof ctxProps.children === 'function' ? true : ctxProps.children,
        },
        groupState.state,
        inputRef
      )
    : useCheckbox(
        {
          ...ctxProps,
          children:
            typeof ctxProps.children === 'function' ? true : ctxProps.children,
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
    className: cn('nw-checkbox', ctxProps.className),
    values: renderValues,
    defaultClassName: cn('nw-checkbox', ctxProps.className),
  });

  const stateCtx = useMemo<CheckboxStateContextValue>(
    () => ({
      color,
      size,
      radius,
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
    }),
    [
      color,
      size,
      radius,
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
    ]
  );

  const dataAttrs = getCheckboxDataAttrs(stateCtx);

  const filteredProps = filterDOMProps(restProps);

  return (
    <CheckboxSlots.Provider value={{}}>
      <CheckboxStateProvider value={stateCtx}>
        <label
          ref={domRef}
          className={renderProps.className}
          style={renderProps.style}
          {...mergeProps(filteredProps, hoverProps, labelProps)}
          {...dataAttrs}
          data-slot="root"
        >
          <VisuallyHidden elementType="span">
            <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
          </VisuallyHidden>
          {renderProps.children}
        </label>
      </CheckboxStateProvider>
    </CheckboxSlots.Provider>
  );
}

CheckboxRoot.displayName = 'NovaWaveUI.CheckboxRoot';
