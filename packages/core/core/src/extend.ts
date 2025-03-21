import React, { ComponentProps } from 'react';
import {
  ExtractVariantProps,
  NonSlotVariantReturn,
} from '@novawaveui/tailwind-composer';
import {
  useNovaWaveUI,
  NovaWaveUIGlobalStylesConfig,
} from '@novawaveui/provider';

export type ExtendedFromBase<
  TBase extends NonSlotVariantReturn<any>,
  TCustom extends NonSlotVariantReturn<any>,
> = TCustom extends ReturnType<TBase['extend']> ? TCustom : never;

export function createExtendedNonSlotComponent<
  TBaseStyles extends NonSlotVariantReturn<any>,
  TCustomStyle extends ExtendedFromBase<TBaseStyles, NonSlotVariantReturn<any>>,
  TComponentProps extends Record<string, any> & {
    customStyle?: NonSlotVariantReturn<any>;
  },
>(
  Component: React.ComponentType<TComponentProps>,
  _baseStyle: TBaseStyles,
  globalStyleComponent: keyof NovaWaveUIGlobalStylesConfig
) {
  // Factory function that takes in a custom style and returns a new component
  // with the custom styles and extra props that are added to the base component
  return (customStyle: TCustomStyle) => {
    type ExtendedComponentProps = Omit<
      ComponentProps<typeof Component>,
      'customStyle'
    > &
      ExtractVariantProps<TCustomStyle>;

    const ExtendedComponent = (props: ExtendedComponentProps) => {
      const globalContext = useNovaWaveUI();

      const resolvedStyle =
        globalContext.globalStyles?.[globalStyleComponent] ?? customStyle;

      const newProps = {
        ...props,
        customStyle: resolvedStyle,
      };

      return React.createElement<ExtendedComponentProps>(
        Component as unknown as React.ComponentType<ExtendedComponentProps>,
        newProps
      );
    };

    ExtendedComponent.displayName = `Extended${Component.displayName}`;

    return ExtendedComponent;
  };
}
