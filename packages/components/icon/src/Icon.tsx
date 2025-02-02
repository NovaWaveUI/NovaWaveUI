import React from 'react';
import { useIcon, UseIconProps } from './useIcon';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IconProps extends UseIconProps {}

const Icon = React.forwardRef(
  (props: IconProps, ref: React.ForwardedRef<HTMLSpanElement>) => {
    const Icon = useIcon({
      ...props,
      ref,
    });

    return Icon;
  }
);

Icon.displayName = 'NovawaveUI.Icon';

export default Icon;
