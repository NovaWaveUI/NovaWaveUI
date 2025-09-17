import React, { ElementType } from 'react';
import { forwardRefWith } from '@novawaveui/react-utils';
import { BaseButtonProps } from './types';
import ButtonRoot from './ButtonRoot';
import ButtonStartContent from './ButtonStartContent';
import ButtonEndContent from './ButtonEndContent';
import ButtonText from './ButtonText';

export interface ButtonProps<T extends ElementType = 'button'>
  extends BaseButtonProps<T> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Button = Object.assign(
  forwardRefWith.as<'button', ButtonProps<'button'>>((props, ref) => {
    const { startContent, endContent, children, ...restProps } = props;

    return (
      <ButtonRoot ref={ref} {...restProps}>
        {startContent && (
          <ButtonStartContent>{startContent}</ButtonStartContent>
        )}
        {children && <ButtonText>{children}</ButtonText>}
        {endContent && <ButtonEndContent>{endContent}</ButtonEndContent>}
      </ButtonRoot>
    );
  }),
  {
    Root: ButtonRoot,
    StartContent: ButtonStartContent,
    EndContent: ButtonEndContent,
    Text: ButtonText,
  }
);

Button.displayName = 'NovaWaveUI.Button';

export default Button;
