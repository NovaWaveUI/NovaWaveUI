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
