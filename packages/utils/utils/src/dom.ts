import React, { ElementType, JSX } from 'react';

/**
 * Given a value, returns a value that can be used as a data attribute in JSX.
 *
 * @param attr - The value of the data attribute to be converted.
 * @returns A value that can be used as a data attribute in JSX.
 */
export const dataAttr = (attr: any) => {
  // If the attribute is a boolean, if it is true leave it, if false return undefined
  if (typeof attr === 'boolean') {
    return attr ? true : undefined;
  }
  // If the attribute is a string or number, return it as is
  if (typeof attr === 'string' || typeof attr === 'number') {
    return attr;
  }
  // For any other type, return undefined
  return;
};

/**
 * Creates a data-* attributes object from a record of states.
 *
 * @example
 * dataProps({ hovered: true, disabled: false, size: "sm" })
 * // => { "data-hovered": true, "data-size": "sm" }
 */
export const dataProps = (props: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      `data-${key}`,
      dataAttr(value),
    ])
  );
};

/**
 * Factory to create a data-props getter function scoped to a component.
 *
 * @example
 * const getCheckboxDataProps = createDataPropsGetter<CheckboxContextValue>(
 *   (ctx) => ({
 *     disabled: ctx.isDisabled,
 *     focused: ctx.isFocused,
 *     "focus-visible": ctx.isFocusVisible,
 *     hovered: ctx.isHovered,
 *     pressed: ctx.isPressed,
 *     checked: ctx.isSelected,
 *     indeterminate: ctx.isIndeterminate,
 *     "read-only": ctx.isReadOnly ?? ctx.aria.isReadOnly,
 *     invalid: ctx.isInvalid,
 *   })
 * );
 */
export function createDataPropsGetter<Context>(
  mapper: (ctx: Context) => Record<string, any>
) {
  return (ctx: Context) => {
    return {
      ...dataProps(mapper(ctx)),
    };
  };
}

const dataAttributeRegex = /^data-.+/;
const ariaAttributeRegex = /^aria-.+/;
const eventHandlerRegex = /^on[A-Z].+/;

/**
 * The set of valid DOM event names.
 */
export const DOMEventNames = new Set([
  'onCopy',
  'onCut',
  'onPaste',
  'onLoad',
  'onError',
  'onWheel',
  'onScroll',
  'onCompositionEnd',
  'onCompositionStart',
  'onCompositionUpdate',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onFocus',
  'onBlur',
  'onChange',
  'onInput',
  'onSubmit',
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onPointerDown',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerUp',
  'onSelect',
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
  'onAnimationStart',
  'onAnimationEnd',
  'onAnimationIteration',
  'onTransitionEnd',
]);

/**
 * A generic object that can be used to store any data attributes.
 */
export type DataAttributes = {
  [dataAttr: string]: any;
};

/**
 * A type that represents a valid DOM element.
 */
export type DOMAttributes<T = ElementType> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
  };

export type FilteredProps<T extends React.ElementType> =
  T extends keyof JSX.IntrinsicElements
    ? DOMAttributes<T>
    : React.ComponentProps<T>;

export interface DOMFilterOptions {
  /**
   * Whether the filtering is enabled or not.
   */
  enabled?: boolean;
  /**
   * Whether or not to filter all data attributes (data-*)
   */
  filterAllDataAttrs?: boolean;
  /**
   * Whether or not to filter all aria attributes (aria-*)
   */
  filterAriaAttrs?: boolean;
  /**
   * Whether or not to filter event handlers (on*)
   */
  filterEventHandlers?: boolean;
  /**
   * The list of additional props to filter.
   */
  omitProps?: Set<string>;
  /**
   * The list of `data-*` attributes to filter.
   */
  omitDataAttrs?: Set<string>;
  /**
   * The list of `aria-*` attributes to filter.
   */
  omitAriaAttrs?: Set<string>;
  /**
   * The list of event handlers to filter.
   */
  omitEventHandlers?: Set<string>;
}

export function filterDOMProps<T extends ElementType = 'div'>(
  props: Record<string, any>,
  options: DOMFilterOptions = {}
): FilteredProps<T> {
  const {
    enabled = true,
    filterAllDataAttrs = false,
    filterAriaAttrs = false,
    filterEventHandlers = false,
    omitProps = new Set<string>(),
    omitDataAttrs = new Set<string>(),
    omitAriaAttrs = new Set<string>(),
    omitEventHandlers = new Set<string>(),
  } = options;

  if (!enabled) {
    return props as FilteredProps<T>;
  }

  // Start constructing the list of valid props
  const validProps: Partial<DOMAttributes<T>> = {};

  // Get the list of standard DOM attributes and event handlers for the element
  const standardProps = new Set<string>([
    'id',
    'type',
    'style',
    'title',
    'role',
    'tabIndex',
    'htmlFor',
    'width',
    'height',
    'abbr',
    'accept',
    'acceptCharset',
    'accessKey',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'cellPadding',
    'cellSpacing',
    'challenge',
    'charset',
    'checked',
    'cite',
    'class',
    'className',
    'cols',
    'colSpan',
    'command',
    'content',
    'contentEditable',
    'contextMenu',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'dir',
    'disabled',
    'download',
    'draggable',
    'dropzone',
    'encType',
    'enterKeyHint',
    'for',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'hidden',
    'high',
    'href',
    'hrefLang',
    'httpEquiv',
    'icon',
    'inputMode',
    'isMap',
    'itemId',
    'itemProp',
    'itemRef',
    'itemScope',
    'itemType',
    'kind',
    'label',
    'lang',
    'list',
    'loop',
    'manifest',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'ping',
    'placeholder',
    'poster',
    'preload',
    'radioGroup',
    'referrerPolicy',
    'readOnly',
    'rel',
    'required',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'slot',
    'sortable',
    'span',
    'spellCheck',
    'src',
    'srcDoc',
    'srcSet',
    'start',
    'step',
    'target',
    'translate',
    'typeMustMatch',
    'useMap',
    'value',
    'wmode',
    'wrap',
  ]);

  const reactValidProps = new Set<string>([
    'ref',
    'key',
    'children',
    'id',
    'style',
    'className',
  ]);

  for (const [key, value] of Object.entries(props)) {
    // Check if this prop should be filtered
    if (omitProps.has(key)) {
      continue;
    }

    // Test if this is a `data-*` attribute
    if (dataAttributeRegex.test(key)) {
      // If we are filtering all data attributes, skip it
      if (filterAllDataAttrs) {
        continue;
      }

      // If this specific data attribute is to be omitted, skip it
      if (omitDataAttrs.has(key)) {
        continue;
      }
    }

    // Test if this is an `aria-*` attribute
    if (ariaAttributeRegex.test(key)) {
      // If we are filtering all aria attributes, skip it
      if (filterAriaAttrs) {
        continue;
      }

      // If this specific aria attribute is to be omitted, skip it
      if (omitAriaAttrs.has(key)) {
        continue;
      }
    }

    // Test if this is an event handler
    if (eventHandlerRegex.test(key)) {
      // If we are filtering out event handlers, skip this prop
      if (filterEventHandlers) {
        continue;
      }

      // If this is an `omitEventHandlers` prop, skip this prop
      if (omitEventHandlers.has(key)) {
        continue;
      }

      // Next, check if this is a valid event handler
      if (!DOMEventNames.has(key)) {
        continue;
      }
    }

    // Check if this is a standard DOM attribute
    if (
      standardProps.has(key) ||
      eventHandlerRegex.test(key) ||
      dataAttributeRegex.test(key) ||
      ariaAttributeRegex.test(key) ||
      reactValidProps.has(key)
    ) {
      validProps[key] = value;
    }
  }

  return validProps as FilteredProps<T>;
}
