import { NovaWaveUIProps, PropGetter, mergeProperties } from '@novawaveui/core';
import { error } from '@novawaveui/dev-utils';
import React, { cloneElement, useCallback, useMemo } from 'react';
import { dataAttr } from '@novawaveui/aria-utils';
import { iconStyles, IconVariantProps } from './styles/icon';

interface Props extends NovaWaveUIProps<'span'> {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<HTMLSpanElement | null>;

  /**
   * Whether or not this icon should be hidden from assistive technologies.
   * Defaults to false.
   */
  isHidden?: boolean;

  /**
   * The aria-label / alt text for the icon. This should be provided if there
   * is no supporting text for the icon.
   */
  label?: string;

  /**
   * A name used for the `data-icon` attribute. If label is provided
   * then the value of label is used. If both label and `iconName` are provided
   * then `iconName` will be used first.
   */
  iconName?: string;

  /**
   * Additional styles that should be merged with the current styles. These styles
   * will take precedence over the current styles.
   */
  className?: string;

  /**
   * The icon.
   */
  children?: React.ReactNode;
}

export type UseIconProps = Props & IconVariantProps;

export const useIcon = (props: UseIconProps) => {
  const {
    as: _as,
    size = 'md',
    className,
    iconName,
    label,
    isHidden,
    children,
    ...rest
  } = props;

  // First, check if the `children` prop is a valid React element
  if (!React.isValidElement(children)) {
    error('Icon component expects a single valid React element.', 'Icon');
    return children;
  }

  const styles = useMemo(
    () =>
      iconStyles({
        size,
        className,
      }),
    [size, className]
  );

  const getIconProps: PropGetter = useCallback(
    (props = {}) => ({
      'data-icon': iconName || label || undefined,
      'aria-label': label || undefined,
      'aria-hidden': dataAttr(isHidden),
      role: isHidden ? 'presentation' : 'img',
      className: styles,
      ...mergeProperties(props, rest),
    }),
    [iconName, label, isHidden, rest]
  );

  // Clone the element and add the custom properties
  const Icon = cloneElement(children, {
    ...getIconProps(),
  });

  return Icon;
};
