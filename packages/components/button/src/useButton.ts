import { useMemo } from 'react';
import { buttonStyles, ButtonVariantProps } from '../styles/button';

interface Props {
  /**
   * Ref to the DOM node.
   */
  ref?: React.ForwardedRef<HTMLButtonElement | null>;
}

export type UseButtonProps = Props & ButtonVariantProps;

export const useButton = ({ ref, ...props }: UseButtonProps) => {
  const styles = useMemo(() => buttonStyles(), []);

  return {
    ref,
    styles,
  };
};
