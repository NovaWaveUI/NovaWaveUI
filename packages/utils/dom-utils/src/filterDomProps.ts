import React, { ElementType, JSX } from 'react';

const dataAttributeRegex = /^data-.+/;
const ariaAttributeRegex = /^aria-.+/;
const eventHandlerRegex = /^on[A-Z].+/;

/**
 * Global events that work on any element (clicks, pointer events, scroll, etc.)
 * These are safe to apply to container elements.
 */
export const globalEventNames = new Set([
	'onClick',
	'onAuxClick',
	'onContextMenu',
	'onDoubleClick',
	'onMouseDown',
	'onMouseEnter',
	'onMouseLeave',
	'onMouseMove',
	'onMouseOut',
	'onMouseOver',
	'onMouseUp',
	'onTouchCancel',
	'onTouchEnd',
	'onTouchMove',
	'onTouchStart',
	'onPointerDown',
	'onPointerMove',
	'onPointerUp',
	'onPointerCancel',
	'onPointerEnter',
	'onPointerLeave',
	'onPointerOver',
	'onPointerOut',
	'onGotPointerCapture',
	'onLostPointerCapture',
	'onScroll',
	'onWheel',
	'onAnimationStart',
	'onAnimationEnd',
	'onAnimationIteration',
	'onTransitionCancel',
	'onTransitionEnd',
	'onTransitionRun',
	'onTransitionStart',
]);

/**
 * Form-specific events that should only be on form elements.
 * These should NOT be applied to container elements.
 */
export const formEventNames = new Set([
	'onChange',
	'onInput',
	'onSelect',
	'onSubmit',
	'onReset',
	'onInvalid',
]);

/**
 * Additional events for specific elements.
 */
export const otherEventNames = new Set([
	'onCopy',
	'onCut',
	'onPaste',
	'onLoad',
	'onError',
	'onCompositionEnd',
	'onCompositionStart',
	'onCompositionUpdate',
	'onKeyDown',
	'onKeyPress',
	'onKeyUp',
	'onFocus',
	'onBlur',
	'onDrag',
	'onDragEnd',
	'onDragEnter',
	'onDragExit',
	'onDragLeave',
	'onDragOver',
	'onDragStart',
	'onDrop',
]);

/**
 * All valid DOM event names (union of all event sets).
 */
export const DOMEventNames = new Set([
	...globalEventNames,
	...formEventNames,
	...otherEventNames,
]);

/**
 * A generic object that can be used to store any data attributes.
 */
export type DataAttributes = {
	[K in `data-${string}`]?: unknown;
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
	 * When true, only includes global events (clicks, pointer, scroll) and filters out
	 * form-specific events (onChange, onInput, onSelect).
	 * This is useful when filtering props for container elements.
	 */
	global?: boolean;
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
	props: Readonly<Record<string, unknown>>,
	options: DOMFilterOptions = {}
): FilteredProps<T> {
	const {
		enabled = true,
		filterAllDataAttrs = false,
		filterAriaAttrs = false,
		filterEventHandlers = false,
		global = false,
		omitProps = new Set<string>(),
		omitDataAttrs = new Set<string>(),
		omitAriaAttrs = new Set<string>(),
		omitEventHandlers = new Set<string>(),
	} = options;

	if (!enabled) {
		const out: Record<string, unknown> = {};
		for (const key of Object.keys(props)) {
			out[key] = (props as Record<string, unknown>)[key];
		}
		return out as FilteredProps<T>;
	}

	// Start constructing the list of valid props
	const validProps: Record<string, unknown> = {};

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

	for (const key of Object.keys(props)) {
		const value = (props as Record<string, unknown>)[key];
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

			// When global is true, only allow global events (not form-specific events)
			if (global) {
				if (!globalEventNames.has(key)) {
					continue;
				}
			} else {
				// When global is false, check if this is a valid event handler
				if (!DOMEventNames.has(key)) {
					continue;
				}
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
