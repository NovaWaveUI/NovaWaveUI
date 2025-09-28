import React from 'react';
import { useContextProps, useDOMRef } from '@novawaveui/react-utils';
import { TextProps } from './types';
import { TextContext } from './context';

function Text<T extends React.ElementType = 'span'>(props: TextProps<T>) {
  // Extract the `as` prop and the rest of the props
  const { as: Component = 'span', children, ref, ...rest } = props;

  // Next, get the context props (if there is any), a context may not exist,
  // if it doesn't, we just use the original props
  // We also get the ref from the context and merge it with the original ref
  // so we can have access to the DOM element
  const [ctxProps, ctxRef] = useContextProps(rest, ref, TextContext);

  // Create a DOM ref using the merged refs
  const domRef = useDOMRef(ctxRef);

  return (
    <Component ref={domRef} {...ctxProps}>
      {children}
    </Component>
  );
}

Text.displayName = 'NovaWaveUI.Text';

export default Text;
