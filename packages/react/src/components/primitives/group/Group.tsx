import React from 'react';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import { dataProps, useRenderProps, useSlottedContext } from '../../../utils';
import { GroupContext } from './context';
import { GroupProps } from './types';

export function Group(props: GroupProps) {
  // Use any context props and merge with local props
  const ctxProps = useSlottedContext(GroupContext, props);

  // Extract isReadOnly, isDisabled, isInvalid from context props
  const { isReadOnly, ...rest } = ctxProps;
  let { isDisabled, isInvalid } = rest;

  // Determine isDisabled and isInvalid values
  isDisabled ??=
    !!ctxProps['aria-disabled'] && ctxProps['aria-disabled'] !== 'false';
  isInvalid ??=
    !!ctxProps['aria-invalid'] && ctxProps['aria-invalid'] !== 'false';

  // Use useHover to get hover state and props
  const { hoverProps, isHovered } = useHover({
    isDisabled,
    ...ctxProps,
  });

  // Use useFocusRing to get focus within state and props
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    within: true,
  });

  // Generate render props
  const renderProps = useRenderProps({
    ...ctxProps,
    values: {
      isHovered,
      isFocusedWithin: isFocused,
      isFocusVisible,
      isDisabled,
      isInvalid,
    },
    defaultClassName: 'nw-group',
  });

  // Generate data attributes
  const dataAttrs = dataProps({
    hovered: isHovered,
    'focus-within': isFocused,
    'focus-visible': isFocusVisible,
    disabled: isDisabled,
    invalid: isInvalid,
    readonly: isReadOnly,
  });

  return (
    <div
      {...mergeProps(rest, hoverProps, focusProps)}
      {...dataAttrs}
      {...renderProps}
      role={ctxProps.role ?? 'group'}
      slot={ctxProps.slot ?? undefined}
    >
      {renderProps.children}
    </div>
  );
}
