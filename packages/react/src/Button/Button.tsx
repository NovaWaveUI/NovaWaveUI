import React, { ElementType } from 'react';
import ButtonRoot, { ButtonRootProps } from './ButtonRoot';
import ButtonStartContent from './ButtonStartContent';
import ButtonEndContent from './ButtonEndContent';
import ButtonText from './ButtonText';

export type ButtonProps<T extends ElementType = 'button'> =
  ButtonRootProps<T> & {
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };

function Button<T extends ElementType = 'button'>(props: ButtonProps<T>) {
  const { startContent, endContent, children, ...restProps } = props;

  return (
    <ButtonRoot {...(restProps as ButtonRootProps<T>)}>
      {startContent && <ButtonStartContent>{startContent}</ButtonStartContent>}
      {children && <ButtonText>{children}</ButtonText>}
      {endContent && <ButtonEndContent>{endContent}</ButtonEndContent>}
    </ButtonRoot>
  );
}

Button.displayName = 'NovaWaveUI.Button';

Button.Root = ButtonRoot;
Button.StartContent = ButtonStartContent;
Button.EndContent = ButtonEndContent;
Button.Text = ButtonText;

export default Button;
