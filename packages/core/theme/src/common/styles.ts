/**
 * The styles file is used to define common styles that can be reused across all components.
 */

/**
 * The focus ring styles used for a focus ring when the element is focused (e.g. via keyboard).
 */
export const dataFocusRing: string[] = [
  'data-[focus-visible=true]:z-10',
  'data-[focus-visible=true]:outline',
  'data-[focus-visible=true]:outline-2',
  'data-[focus-visible=true]:outline-offset-2',
  'data-[focus-visible=true]:outline-primary-600',
];

/**
 * The group focus ring styles used for a focus ring when the element is focused (e.g. via keyboard).
 */
export const groupDataFocusRing: string[] = [
  'group-data-[focus-visible=true]:z-10',
  'group-data-[focus-visible=true]:outline',
  'group-data-[focus-visible=true]:outline-2',
  'group-data-[focus-visible=true]:outline-offset-2',
  'group-data-[focus-visible=true]:outline-primary-600',
];

/**
 * Styles that are used when a variant is "solid"
 *
 * Solid means that the element has a solid background color and a text color that contrasts with the background color.
 * It does not change the style on hover or active.
 */
export const solid = {
  neutral:
    'bg-neutral hover:bg-neutral-hover active:bg-neutral-active text-on-neutral hover:text-on-neutral-hover active:text-on-neutral-active',
  primary:
    'bg-primary hover:bg-primary-hover active:bg-primary-active text-on-primary hover:text-on-primary-hover active:text-on-primary-active',
  secondary:
    'bg-secondary hover:bg-secondary-hover active:bg-secondary-active text-on-secondary hover:text-on-secondary-hover active:text-on-secondary-active',
  success:
    'bg-success hover:bg-success-hover active:bg-success-active text-on-success hover:text-on-success-hover active:text-on-success-active',
  warning:
    'bg-warning hover:bg-warning-hover active:bg-warning-active text-on-warning hover:text-on-warning-hover active:text-on-warning-active',
  danger:
    'bg-danger hover:bg-danger-hover active:bg-danger-active text-on-danger hover:text-on-danger-hover active:text-on-danger-active',
};

/**
 * Styles that are used when a variant is "bordered"
 *
 * Bordered means a transparent background color with a border color that matches the background color of the solid variant and text
 * that matches the color of the border
 */
export const bordered = {
  neutral:
    'border-neutral hover:border-neutral-hover active:border-neutral-active text-neutral hover:text-neutral-hover active:text-neutral-active',
  primary:
    'border-primary hover:border-primary-hover active:border-primary-active text-primary hover:text-primary-hover active:text-primary-active',
  secondary:
    'border-secondary hover:border-secondary-hover active:border-secondary-active text-secondary hover:text-secondary-hover active:text-secondary-active',
  success:
    'border-success hover:border-success-hover active:border-success-active text-success hover:text-success-hover active:text-success-active',
  warning:
    'border-warning hover:border-warning-hover active:border-warning-active text-warning hover:text-warning-hover active:text-warning-active',
  danger:
    'border-danger hover:border-danger-hover active:border-danger-active text-danger hover:text-danger-hover active:text-danger-active',
};

/**
 * Styles that are used when a variant is "light"
 *
 * Light means that the element has no background color, but the text color of the selected color. On hover a subtle background color is added
 * and on active the background color is darker.
 */
export const light = {
  neutral:
    'hover:bg-neutral-subtle active:bg-neutral-subtle-hover text-neutral hover:text-neutral-hover active:text-neutral-active',
  primary:
    'hover:bg-primary-subtle active:bg-primary-subtle-hover text-primary hover:text-primary-hover active:text-primary-active',
  secondary:
    'hover:bg-secondary-subtle active:bg-secondary-subtle-hover text-secondary hover:text-secondary-hover active:text-secondary-active',
  success:
    'hover:bg-success-subtle active:bg-success-subtle-hover text-success hover:text-success-hover active:text-success-active',
  warning:
    'hover:bg-warning-subtle active:bg-warning-subtle-hover text-warning hover:text-warning-hover active:text-warning-active',
  danger:
    'hover:bg-danger-subtle active:bg-danger-subtle-hover text-danger hover:text-danger-hover active:text-danger-active',
};

export const faded = {
  neutral:
    'bg-neutral-subtle hover:bg-neutral-subtle-hover active:bg-neutral-subtle-active text-neutral hover:text-neutral-hover active:text-neutral-active',
  primary:
    'bg-primary-subtle hover:bg-primary-subtle-hover active:bg-primary-subtle-active text-primary hover:text-primary-hover active:text-primary-active',
  secondary:
    'bg-secondary-subtle hover:bg-secondary-subtle-hover active:bg-secondary-subtle-active text-secondary hover:text-secondary-hover active:text-secondary-active',
  success:
    'bg-success-subtle hover:bg-success-subtle-hover active:bg-success-subtle-active text-success hover:text-success-hover active:text-success-active',
  warning:
    'bg-warning-subtle hover:bg-warning-subtle-hover active:bg-warning-subtle-active text-warning hover:text-warning-hover active:text-warning-active',
  danger:
    'bg-danger-subtle hover:bg-danger-subtle-hover active:bg-danger-subtle-active text-danger hover:text-danger-hover active:text-danger-active',
};

export const ghost = {
  neutral:
    'text-neutral hover:bg-neutral-hover active:bg-neutral-active hover:text-on-neutral-hover active:text-on-neutral-active hover:border-neutral-hover active:border-neutral-active',
  primary:
    'text-primary hover:bg-primary-hover active:bg-primary-active hover:text-on-primary-hover active:text-on-primary-active hover:border-primary-hover active:border-primary-active',
  secondary:
    'text-secondary hover:bg-secondary-hover active:bg-secondary-active hover:text-on-secondary-hover active:text-on-secondary-active hover:border-secondary-hover active:border-secondary-active',
  success:
    'text-success hover:bg-success-hover active:bg-success-active hover:text-on-success-hover active:text-on-success-active hover:border-success-hover active:border-success-active',
  warning:
    'text-warning hover:bg-warning-hover active:bg-warning-active hover:text-on-warning-hover active:text-on-warning-active hover:border-warning-hover active:border-warning-active',
  danger:
    'text-danger hover:bg-danger-hover active:bg-danger-active hover:text-on-danger-hover active:text-on-danger-active hover:border-danger-hover active:border-danger-active',
};
