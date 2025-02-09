import { NovaWaveUIProps } from '@novawaveui/core';
import React, { useMemo } from 'react';
import { error } from '@novawaveui/dev-utils';
import {
  novaWaveIconStyles,
  NovaWaveIconVariantProps,
} from '@novawaveui/theme';
import { heroIcons } from './icon';

interface Props extends NovaWaveUIProps<'svg'> {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<SVGSVGElement | null>;

  /**
   * The variant of the icon.
   */
  variant: 'outline' | 'solid';

  /**
   * The icon.
   */
  icon: keyof typeof heroIcons.solid;
}

export type UseNovaWaveIconProps = Props & NovaWaveIconVariantProps;

export const useNovaWaveIcon = (props: UseNovaWaveIconProps) => {
  const {
    as: _as,
    color = 'auto',
    icon,
    variant = 'solid',
    className,
    ...rest
  } = props;

  const IconComponent = heroIcons[variant][icon];

  if (!IconComponent) {
    error(`Icon ${icon} does not exist in ${variant} variant`, 'NovaWaveIcon');
    return;
  }

  const styles = useMemo(
    () => novaWaveIconStyles({ color, className }),
    [color, className]
  );

  return {
    IconComponent,
    styles,
    rest,
  };
};
