import React, { ElementType } from 'react';
import {
  PolymorphicProps,
  SlotProps,
  useSlottedContext,
} from '../../utils/react';
import { filterDOMProps } from '../../utils';
import { Slot } from '../slot';
import { LabelContext } from './context';

type Props = SlotProps;

export type LabelProps<T extends ElementType> = PolymorphicProps<T, Props>;

export function Label<T extends React.ElementType = 'label'>(
  props: LabelProps<T>
) {
  // Next, get the context props (if there is any) and merge with
  // the local props
  const ctxProps = useSlottedContext(LabelContext, props);

  // Extract the `as` prop and the rest of the props
  const { as: Component = 'label', asChild, children } = ctxProps;

  const shouldFilterProps = typeof Component === 'string';

  const RenderedComponent = asChild ? Slot : Component;

  const filteredProps = shouldFilterProps
    ? filterDOMProps<T>(ctxProps, {
        enabled: shouldFilterProps,
      })
    : ctxProps;

  return <RenderedComponent {...filteredProps}>{children}</RenderedComponent>;
}

Label.displayName = 'NovaWaveUI.Label';
