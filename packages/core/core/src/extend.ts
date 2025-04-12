import {
  NonSlottedComposerReturn,
  NonSlottedVariantInputValue,
  SlottedComposerReturn,
  SlottedVariantInputValue,
} from '@novawaveui/tailwind-composer';
import React, { useMemo } from 'react';
import clsx from 'clsx';
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

export type ExtendedComponentType<
  TComponent extends React.ElementType,
  TComposer extends ComposerKind,
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    Omit<React.ComponentProps<TComponent>, keyof VariantPropsOf<TComposer>> &
      VariantPropsOf<TComposer>
  > &
    React.RefAttributes<any>
>;

export type PropsOfExtendedComponent<
  TComponent extends React.ElementType,
  TComposer extends ComposerKind,
> = Omit<React.ComponentProps<TComponent>, keyof VariantPropsOf<TComposer>> &
  VariantPropsOf<TComposer>;

export function getProps<TComposer extends ComposerKind>(
  props: Record<string, any>,
  composer: TComposer,
  hasSlots: boolean
) {
  // First, we need to get the variant properties from the props
  const [_, variantProps] = mapPropsToVariants(
    props,
    composer.variantKeys as string[],
    true
  );

  const newProps = {
    ...variantProps,
  };

  // Get the resulting styles
  const resultingStyle = composer(variantProps);

  // If this is a slotted composer, extendedStyle ends up being a map of slots to styles
  // If this is a non-slotted composer, extendedStyle ends up being a string
  const classNames = {};

  if (hasSlots) {
    for (const [key, value] of Object.entries(resultingStyle)) {
      const slotResult = value();

      if (typeof slotResult === 'string') {
        classNames[key] = slotResult;
      }
    }
  } else {
    newProps.className = clsx(props.className, resultingStyle);
  }

  if (Object.keys(classNames).length > 0) {
    newProps.classNames = classNames;
  }

  return newProps;
}

/**
 * Given a NovaWaveUI component and an extended style composer that matches the component, this function creates a new component that applies the extended styles to the base component.
 *
 * @param BaseComponent The NovaWaveUI component to extend
 * @param composer The extended styles to apply to the component. You need to use the appropiate styles for the component.
 * @example
 * ```ts
 * const Button = extendComponent('button', buttonStyles.extend({}));
 * ```
 * @returns The new extended component element.
 */
export function extendComponent<
  TComponent extends React.ElementType,
  TCompser extends ComposerKind,
>(
  BaseComponent: TComponent,
  composer: TCompser
): ExtendedComponentType<TComponent, TCompser> {
  // Create the types for the extended component
  type VariantProps = VariantPropsOf<TCompser>;
  type BaseComponentProps = React.ComponentProps<TComponent>;
  type ExtendedComponentProps = Omit<BaseComponentProps, keyof VariantProps> &
    VariantProps;

  // To check if it has slots, check if composer is a slotted composer (by checking if it has a slot key)
  const hasSlots = 'slotKeys' in composer && Array.isArray(composer.slotKeys);

  // Create the component
  const ExtendedComponent = React.forwardRef(
    (
      props: React.PropsWithoutRef<ExtendedComponentProps>,
      ref: React.Ref<any>
    ) => {
      const newProps = useMemo(
        () => getProps(props, composer, hasSlots),
        [props, composer, hasSlots]
      );
      return React.createElement(BaseComponent, { ...props, ...newProps, ref });
    }
  );

  ExtendedComponent.displayName = `Extended${
    typeof BaseComponent === 'function' || typeof BaseComponent === 'object'
      ? (BaseComponent as any).displayName || BaseComponent.name || 'Component'
      : 'Component'
  }`;

  return ExtendedComponent;
}
