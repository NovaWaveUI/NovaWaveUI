import {
  NovaWaveUIProps,
  mergeProperties,
  useSlotProps,
} from '@novawaveui/core';
import { error } from '@novawaveui/dev-utils';
import React, { cloneElement, useMemo } from 'react';
import { iconStyles, IconVariantProps } from '@novawaveui/theme';
import { dataAttr } from '@novawaveui/aria-utils';

interface Props extends NovaWaveUIProps<'svg'> {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<SVGSVGElement | null>;

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

  const getSlotProps = useSlotProps('NovaWaveUI.Icon', {
    base: {
      dependencies: [iconName, label, isHidden, rest, size, className],
      props: {
        'aria-label': label || undefined,
        'aria-hidden': dataAttr(isHidden),
        role: isHidden ? 'presentation' : 'img',
        ...mergeProperties(props, rest),
      },
      dataAttrs: {
        icon: iconName || label || undefined,
      },
    },
  });

  // Clone the element and add the custom properties
  const Icon = cloneElement(children as React.ReactElement<any>, {
    className: styles,
    ...getSlotProps('base'),
  });

  return Icon;
};
