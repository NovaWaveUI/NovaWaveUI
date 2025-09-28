import {
  forwardRefWith,
  useContextProps,
  useDOMRef,
} from '@novawaveui/react-utils';
import { LabelProps } from './types';
import { LabelContext } from './context';

const Label = forwardRefWith.as<'label', LabelProps>((props, ref) => {
  // Extract the `as` prop and the rest of the props
  const { as: Component = 'label', children, ...rest } = props;

  // Next, get the context props (if there is any) and merge with
  // the local props
  const [ctxProps, ctxRef] = useContextProps(rest, ref, LabelContext);

  // Create a DOM ref using the merged refs
  const domRef = useDOMRef(ctxRef);

  return (
    <Component ref={domRef} {...ctxProps}>
      {children}
    </Component>
  );
});

Label.displayName = 'NovaWaveUI.Label';

export default Label;
