import React from 'react';
import { DOMAttributes, DOMEventNames } from './types';

const dataAttributeRegex = /^data-.+/;
const ariaAttributeRegex = /^aria-.+/;
const eventHandlerRegex = /^on[A-Z].+/;

interface FilterOptions {
  /**
   * Whether or not to filter.
   */
  enabled?: boolean;
  /**
   * Whether or not to filter out `data-*` attributes.
   */
  filterAllDataAttrs?: boolean;
  /**
   * Whether or not to filter out `aria-*` attributes.
   */
  filterAriaAttrs?: boolean;
  /**
   * Whether or not to filter out event handlers.
   */
  filterEventHandlers?: boolean;
  /**
   * The list of additional props to filter out.
   */
  omitProps?: Set<string>;
  /**
   * The list of `data-*` attributes to filter out.
   */
  omitDataAttrs?: Set<string>;
  /**
   * The list of `aria-*` attributes to filter out.
   */
  omitAriaAttrs?: Set<string>;
  /**
   * The list of event handlers to filter out.
   */
  omitEventHandlers?: Set<string>;
}

/**
 * Filters out invalid DOM attributes from the provided props.
 *
 * @param props - The props to filter.
 * @param element - The element type.
 * @param options - The filtering options.
 * @returns The filtered props.
 */
export function filterDOMProps<T extends React.ElementType = 'div'>(
  props: Record<string, any>,
  _element: T,
  options: FilterOptions = {}
): DOMAttributes {
  // Get the filtering options
  const {
    enabled = true,
    filterAllDataAttrs = false,
    filterAriaAttrs = false,
    filterEventHandlers = false,
    omitProps = new Set(),
    omitDataAttrs = new Set(),
    omitAriaAttrs = new Set(),
    omitEventHandlers = new Set(),
  } = options;

  if (!enabled) {
    return props as DOMAttributes;
  }

  const validProps: Partial<DOMAttributes> = {};

  // Get the list of standard DOM attributes and event handlers for the element
  type IntrinsicElementProps =
    React.JSX.IntrinsicElements[T extends keyof React.JSX.IntrinsicElements
      ? T
      : 'div'];
  const standardProps = new Set<string>([
    ...Object.keys({} as IntrinsicElementProps),
    ...Object.keys({} as React.DOMAttributes<T>),
    ...Object.keys({} as React.AriaAttributes),
    'id',
    'role',
    'tabIndex',
    'style',
  ]);

  for (const [key, value] of Object.entries(props)) {
    // Check if this prop should be filtered
    if (omitProps.has(key)) {
      continue;
    }

    // Test if this is a `data-*` attribute
    if (dataAttributeRegex.test(key)) {
      // If we are filtering out all `data-*` attributes, skip this prop
      if (filterAllDataAttrs) {
        continue;
      }

      // If this is an `omitDataAttrs` prop, skip this prop
      if (omitDataAttrs.has(key)) {
        continue;
      }
    }

    // Test if this is an `aria-*` attribute
    if (ariaAttributeRegex.test(key)) {
      // If we are filtering out all `aria-*` attributes, skip this prop
      if (filterAriaAttrs) {
        continue;
      }

      // If this is an `omitAriaAttrs` prop, skip this prop
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
      ariaAttributeRegex.test(key)
    ) {
      validProps[key] = value;
    }
  }

  return validProps as DOMAttributes;
}
