import { useMemo } from 'react';
import {
  forwardRefWith,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '@novawaveui/react-utils';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { dataProps, filterDOMProps } from '@novawaveui/utils';
import { GroupProps, GroupRenderProps } from './types';
import { GroupContext } from './context';

const Group = forwardRefWith.as<'div', GroupProps<'div'>>((props, ref) => {
  // Extract the `as` prop and the rest of the props
  const { as: Component = 'div', children, ...rest } = props;

  // Next, get the context props (if there is any), and merge it with
  // the local props
  const [ctxProps, ctxRef] = useContextProps(rest, ref, GroupContext);

  const { isLoading = false } = ctxProps;

  const isDisabled =
    ctxProps.isDisabled ??
    (!!ctxProps['aria-disabled'] && ctxProps['aria-disabled'] !== 'false');
  const isInvalid =
    ctxProps.isInvalid ??
    (!!ctxProps['aria-invalid'] && ctxProps['aria-invalid'] !== 'false');

  const isInteractive = useMemo(
    () => !isDisabled && !isLoading,
    [isDisabled, isLoading]
  );

  // Create a DOM ref using the merged refs
  const domRef = useDOMRef(ctxRef);

  // Next, get the hover and focus props
  const { hoverProps, isHovered } = useHover({
    ...ctxProps,
    isDisabled: !isInteractive,
  });
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    within: true,
  });

  const renderValues = useMemo<GroupRenderProps>(() => {
    return {
      isDisabled,
      isFocusedWithin: isFocused,
      isFocusVisible,
      isHovered,
      isLoading,
      isInvalid,
    };
  }, [isDisabled, isFocused, isFocusVisible, isHovered, isLoading, isInvalid]);

  const renderProps = useRenderProps({
    ...ctxProps,
    values: renderValues,
    children,
  });

  const DOMProps = filterDOMProps(ctxProps);

  // Create the data attributes
  const dataAttrs = useMemo(
    () =>
      dataProps({
        hovered: isHovered,
        focused: isFocused,
        'focus-visible': isFocusVisible,
        disabled: isDisabled,
        loading: isLoading,
        invalid: isInvalid,
      }),
    [isHovered, isFocused, isFocusVisible, isDisabled, isLoading, isInvalid]
  );

  return (
    <Component
      {...mergeProps(DOMProps, focusProps, hoverProps)}
      {...renderProps}
      ref={domRef}
      role={ctxProps.role ?? 'group'}
      {...dataAttrs}
    >
      {renderProps.children}
    </Component>
  );
});

Group.displayName = 'NovaWaveUI.Group';

export default Group;
