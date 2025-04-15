import type { ToggleButtonVariantProps } from '@novawaveui/theme';

import { useMemo } from 'react';
import { NovaWaveUIProps } from '@novawaveui/core';
import { useDOMRef } from '@novawaveui/react-utils';
import { toggleButtonStyles } from '@novawaveui/theme';

interface Props extends NovaWaveUIProps<'button'> {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<HTMLButtonElement | null>;

  /**
   * Whether or not the button is toggled
   */
  isToggled?: boolean;

  /**
   * Is icon only
   */
  isIconOnly?: boolean;

  /**
   * Content that goes in front of the children of the button
   */
  startContent?: React.ReactNode;

  /**
   * Content that goes after the children of the button
   */
  endContent?: React.ReactNode;
}

export type UseTogglebuttonProps = Props & ToggleButtonVariantProps;

export function useTogglebutton(props: UseTogglebuttonProps) {
  const { ref, as, className, ...otherProps } = props;

  // Set the root element
  const Root = as || 'div';

  // Set up the ref for the DOM node
  const domRef = useDOMRef(ref);

  return {
    Root,
    domRef,
    ...otherProps,
  };
}
