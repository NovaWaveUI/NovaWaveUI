import React from 'react';
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
import { cn, dataProps, filterDOMProps } from '../../utils';
import {
  Provider,
  RenderProps,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '../../utils/react';
import { useCheckboxGroupState } from '../checkboxGroup';
import { LabelContext } from '../label';
import { CheckboxRenderProps, CheckboxStyleProps } from './types';
import {
  CheckboxState,
  CheckboxStateContextValue,
  useCheckboxContextProps,
} from './context';

export type CheckboxProps = Omit<
  AriaCheckboxProps,
  'children' | 'className' | 'style'
> &
  HoverEvents &
  RenderProps<CheckboxRenderProps> &
  CheckboxStyleProps & {
    /**
     * A ref to the internal input element.
     */
    inputRef?: React.Ref<HTMLInputElement | null>;
    /**
     * The ref for the checkbox root (label) element.
     */
    ref?: React.Ref<HTMLLabelElement | null>;
  };

export function Checkbox(props: CheckboxProps) {
  // Extract out the user provided ref for the input element
  const { inputRef: userProvidedInputRef, ...rest } = props;

  // Get the context props, if any, and merge them with the original props
  const ctxProps = useContextProps(rest, useCheckboxContextProps);

  // Create a merged ref to the DOM element
  const domRef = useDOMRef(ctxProps.ref);

  // Create a merged ref for the input element
  const inputRef = useDOMRef<HTMLInputElement>(userProvidedInputRef);

  // Get the props from the group if possible
  const groupState = useCheckboxGroupState();
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
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useCheckboxGroupItem(
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
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useCheckbox(
        {
          ...ctxProps,
          children:
            typeof ctxProps.children === 'function' ? true : ctxProps.children,
        },
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useToggleState(ctxProps),
        inputRef
      );

  const isInteractive = !isDisabled && !isReadOnly;
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();

  const { isHovered, hoverProps } = useHover({
    ...ctxProps,
    isDisabled: !isInteractive,
  });

  const renderValues: CheckboxRenderProps = {
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

  const renderProps = useRenderProps({
    ...ctxProps,
    className: cn('nw-checkbox', ctxProps.className),
    values: renderValues,
    defaultClassName: cn('nw-checkbox', ctxProps.className),
  });

  const stateCtx: CheckboxStateContextValue = {
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
    styleDataAttrs: dataProps({
      color: color,
      size: size,
      radius: radius,
    }),
  };

  const dataAttrs = dataProps({
    hovered: stateCtx.isHovered,
    focused: stateCtx.isFocused,
    'focus-visible': stateCtx.isFocusVisible,
    pressed: stateCtx.isPressed,
    disabled: stateCtx.isDisabled,
    indeterminate: stateCtx.isIndeterminate,
    selected: stateCtx.isSelected,
    color: stateCtx.color,
    size: stateCtx.size,
    radius: stateCtx.radius,
    required: stateCtx.isRequired,
    'read-only': stateCtx.isReadOnly,
    invalid: stateCtx.isInvalid,
  });

  const filteredProps = filterDOMProps(restProps);

  return (
    <Provider values={[[LabelContext, { ...labelProps, as: 'span' }]]}>
      <CheckboxState.Provider value={stateCtx}>
        <label
          ref={domRef}
          className={renderProps.className}
          style={renderProps.style}
          {...mergeProps(filteredProps, hoverProps, labelProps)}
          {...dataAttrs}
          data-slot="checkbox-root"
          data-component="checkbox"
        >
          <VisuallyHidden elementType="span">
            <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
          </VisuallyHidden>
          {renderProps.children}
        </label>
      </CheckboxState.Provider>
    </Provider>
  );
}

Checkbox.displayName = 'NovaWaveUI.Checkbox';
