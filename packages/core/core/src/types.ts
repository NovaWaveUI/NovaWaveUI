import React from 'react';

/**
 * A generic component type that can be used to redner any HTML element.
 */
export type As<Props = any> = React.ElementType<Props>;

/**
 * Extracts the props of a component that is rendered using the `as` prop.
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export interface DOMElement extends Element, HTMLOrSVGElement {}

/**
 * A generic object that can be used to store any data attributes.
 */
export type DataAttributes = {
  [dataAttr: string]: any;
};

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style: React.CSSProperties;
  };

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<
  Target,
  'as' | 'color' | 'isDisabled' | 'disableAnimations' | OmitAdditionalProps
>;

/**
 * The base properties that apply to all NovaWaveUI components.
 */
export type NovaWaveUIProps<
  T extends As = 'div',
  OmitKeys extends keyof any = never,
> = Omit<PropsOf<T>, 'ref' | OmitKeys> & {
  /**
   * Disables any interactions with the component.
   */
  isDisabled?: boolean;

  /**
   * Disables animations and transitions.
   */
  disableAnimations?: boolean;

  /**
   * The HTML DOM element
   */
  as?: As;
};

export type Merge<M, N> =
  N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>;
