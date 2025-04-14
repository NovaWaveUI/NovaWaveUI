import type { CheckboxVariantProps } from '@novawaveui/theme';

import { useMemo } from 'react';
import { NovaWaveUIProps } from '@novawaveui/core';
import { useDOMRef } from '@novawaveui/react-utils';
import { checkboxStyles } from '@novawaveui/theme';

interface Props extends NovaWaveUIProps<'div'> {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<HTMLDivElement | null>;
}

export type UseCheckboxProps = Props & CheckboxVariantProps;

export function useCheckbox(props: UseCheckboxProps) {
  const { ref, as, className, ...otherProps } = props;

  // Set the root element
  const Root = as || 'div';

  // Set up the ref for the DOM node
  const domRef = useDOMRef(ref);

  const { base } = useMemo(() => {
    return checkboxStyles();
  }, [className]);

  return {
    Root,
    domRef,
    base,
    ...otherProps,
  };
}
