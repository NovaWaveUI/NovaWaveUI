import React from 'react';
import ButtonRoot from './ButtonRoot';
import ButtonStartContent from './ButtonStartContent';
import ButtonEndContent from './ButtonEndContent';
import ButtonText from './ButtonText';
import { ButtonRootProps } from './types';

export type ButtonProps<T extends React.ElementType = 'button'> =
  ButtonRootProps<T>;

export const Button = Object.assign(ButtonRoot, {
  StartContent: ButtonStartContent,
  EndContent: ButtonEndContent,
  Text: ButtonText,
});

export default Button;
