import { useContextProps, useDOMRef } from '@novawaveui/react-utils';
import { LabelProps } from './types';
import { LabelContext } from './context';

export default function Label(props: LabelProps) {
  // Extract the `as` prop and the rest of the props
  const { as: Component = 'label', children, ...rest } = props;

  // Next, get the context props (if there is any) and merge with
  // the local props
  const [ctxProps, ctxRef] = useContextProps(rest, LabelContext);

  // Create a DOM ref using the merged refs
  const domRef = useDOMRef(ctxRef);

  return (
    <Component ref={domRef} {...ctxProps}>
      {children}
    </Component>
  );
}

Label.displayName = 'NovaWaveUI.Label';
