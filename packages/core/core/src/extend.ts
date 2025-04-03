import {
  NonSlottedComposerReturn,
  NonSlottedVariantInputValue,
  SlottedComposerReturn,
  SlottedVariantInputValue,
} from '@novawaveui/tailwind-composer';
import React from 'react';
import { mapPropsToVariants } from './utils';

type ComposerKind =
  | NonSlottedComposerReturn<any>
  | SlottedComposerReturn<any, any>;

type VariantPropsOf<T> =
  T extends NonSlottedComposerReturn<infer V>
    ? NonSlottedVariantInputValue<V>
    : T extends SlottedComposerReturn<infer S, infer V>
      ? SlottedVariantInputValue<S, V>
      : never;

export function extendComponent<
  TComponent extends React.ElementType,
  TCompser extends ComposerKind,
>(BaseComponent: TComponent, composer: TCompser) {
  type VariantProps = VariantPropsOf<TCompser>;
  type BaseComponentProps = React.ComponentProps<TComponent>;
  type ExtendedComponentProps = Omit<BaseComponentProps, keyof VariantProps> &
    VariantProps;

  const ExtendedComponent = React.forwardRef(
    (
      props: React.PropsWithoutRef<ExtendedComponentProps>,
      ref: React.Ref<any>
    ) => {
      const [omittedProps, variantProps] = mapPropsToVariants(
        props,
        composer.variantKeys as string[],
        true
      );

      const resultingClassName = composer(variantProps);

      return React.createElement(BaseComponent, {
        className: resultingClassName,
        ...omittedProps,
        ...variantProps,
        ref,
      });
    }
  );

  ExtendedComponent.displayName = `Extended${
    typeof BaseComponent === 'function' || typeof BaseComponent === 'object'
      ? (BaseComponent as any).displayName || BaseComponent.name || 'Component'
      : 'Component'
  }`;

  return ExtendedComponent;
}
