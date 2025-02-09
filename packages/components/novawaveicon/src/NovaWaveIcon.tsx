import React from 'react';
import { Icon } from '@novawaveui/icon';
import { useNovaWaveIcon, UseNovaWaveIconProps } from './useNovaWaveIcon';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NovaWaveIconProps extends UseNovaWaveIconProps {}

const NovaWaveIcon = React.forwardRef(
  (props: NovaWaveIconProps, ref: React.ForwardedRef<SVGSVGElement>) => {
    const useNovaWaveIconReturn = useNovaWaveIcon({
      ...props,
      ref,
    });

    // If useNovaWaveIconReturn is undefined, return null
    if (!useNovaWaveIconReturn) {
      return;
    }

    // Otherwise deconstruct the return value
    const { IconComponent, styles, rest } = useNovaWaveIconReturn;

    return (
      <Icon className={styles} {...rest}>
        <IconComponent />
      </Icon>
    );
  }
);

NovaWaveIcon.displayName = 'NovawaveUI.NovaWaveIcon';

export default NovaWaveIcon;
