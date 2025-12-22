'use client';

import React from 'react';
import { useContextProps } from '../../utils/react';
import { Slot } from '../slot';
import { ButtonProps } from './types';
import { useButtonContextProps } from './context';
import { useButton } from './useButton';

export function Button<T extends React.ElementType = 'button'>(
  props: ButtonProps<T>
) {
  // Next, get the context props (if there is any), a context may not exist,
  // if it doesn't, we just use the original props
  // We also get the ref from the context and merge it with the original ref
  // so we can have access to the DOM element
  const ctxProps = useContextProps(props, useButtonContextProps);

  const { as: Component = 'button', asChild } = ctxProps;

  // Calculate the button props
  const { buttonProps, isInteractive, renderProps } = useButton<T>({
    ...props,
    as: Component,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      ref={ctxProps.ref}
      {...buttonProps}
      {...renderProps}
      type={
        Component === 'button' &&
        buttonProps.type === 'submit' &&
        !isInteractive
          ? 'button'
          : buttonProps.type
      } // Prevent form submission if button is disabled or loading
    />
  );
}

Button.displayName = 'NovaWaveUI.Button';
