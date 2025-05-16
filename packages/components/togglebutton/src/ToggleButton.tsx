import React from 'react';
import { useToggleButton, UseToggleButtonProps } from './useToggleButton';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToggleButtonProps extends UseToggleButtonProps {}

const ToggleButton = React.forwardRef(
  (props: ToggleButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const { Root, domRef, children, startContent, endContent, getSlotProps } =
      useToggleButton({
        ...props,
        ref,
      });

    return (
      <Root ref={domRef} {...getSlotProps('base')}>
        {startContent}
        {children}
        {endContent}
      </Root>
    );
  }
);

ToggleButton.displayName = 'NovawaveUI.Togglebutton';

export default ToggleButton;
