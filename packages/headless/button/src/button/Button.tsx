import React from 'react';
import { useContextProps } from '@novawaveui/react-utils';
import { Slot } from '@novawaveui/headless-slot';
import { ButtonProps } from './types';
import { useButtonContext } from './context';
import { useButton } from './useButton';

export function Button<T extends React.ElementType = 'button'>(
  props: ButtonProps<T>,
) {
  // Next, get the context props (if there is any), a context may not exist,
  // if it doesn't, we just use the original props
  // We also get the ref from the context and merge it with the original ref
  // so we can have access to the DOM element
  // Safe to cast since ButtonContextType<T> is ButtonProps<T>
  const ctxProps = useContextProps(props, useButtonContext) as ButtonProps<T>;

  const { as: Component = 'button', asChild } = ctxProps;

  // Calculate the button props
  const { buttonProps, isInteractive, renderProps } = useButton<T>({
    ...ctxProps,
    as: Component,
  });

  // If asChild is true, we render the Slot component (which will render
  // the child passed to it), otherwise we render the Component directly
  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
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
