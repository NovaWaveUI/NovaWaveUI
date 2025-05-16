/**
 * The solid style
 */
export const solid = {
  neutral: [
    'bg-neutral-background',
    'data-hover:bg-neutral-background-hover',
    'data-pressed:bg-neutral-background-active',
    'text-neutral-foreground',
  ],
  primary: [
    'bg-primary-background',
    'data-hover:bg-primary-background-hover',
    'data-pressed:bg-primary-background-active',
    'text-primary-foreground',
  ],
  secondary: [
    'bg-secondary-background',
    'data-hover:bg-secondary-background-hover',
    'data-pressed:bg-secondary-background-active',
    'text-secondary-foreground',
  ],
  success: [
    'bg-success-background',
    'data-hover:bg-success-background-hover',
    'data-pressed:bg-success-background-active',
    'text-success-foreground',
  ],
  warning: [
    'bg-warning-background',
    'data-hover:bg-warning-background-hover',
    'data-pressed:bg-warning-background-active',
    'text-warning-foreground',
  ],
  danger: [
    'bg-danger-background',
    'data-hover:bg-danger-background-hover',
    'data-pressed:bg-danger-background-active',
    'text-danger-foreground',
  ],
};

/**
 * The bordered style
 */
export const bordered = {
  neutral: [
    'border-neutral',
    'text-neutral',
    'data-hover:border-neutral-hover',
    'data-pressed:border-neutral-active',
  ],
  primary: [
    'border-primary',
    'text-primary',
    'data-hover:border-primary-hover',
    'data-pressed:border-primary-active',
  ],
  secondary: [
    'border-secondary',
    'text-secondary',
    'data-hover:border-secondary-hover',
    'data-pressed:border-secondary-active',
  ],
  success: [
    'border-success',
    'text-success',
    'data-hover:border-success-hover',
    'data-pressed:border-success-active',
  ],
  warning: [
    'border-warning',
    'text-warning',
    'data-hover:border-warning-hover',
    'data-pressed:border-warning-active',
  ],
  danger: [
    'border-danger',
    'text-danger',
    'data-hover:border-danger-hover',
    'data-pressed:border-danger-active',
  ],
};

/**
 * The ghost style
 */
export const ghost = {
  neutral: [
    'text-neutral',
    'border-neutral',
    'data-hover:bg-neutral-background',
    'data-pressed:bg-neutral-background-hover',
    'data-hover:text-neutral-foreground',
    'data-hover:border-neutral',
    'data-pressed:border-neutral-hover',
  ],
  primary: [
    'text-primary',
    'border-primary',
    'data-hover:bg-primary-background',
    'data-pressed:bg-primary-background-hover',
    'data-hover:text-primary-foreground',
    'data-hover:border-primary',
    'data-pressed:border-primary-hover',
  ],
  secondary: [
    'text-secondary',
    'border-secondary',
    'data-hover:bg-secondary-background',
    'data-pressed:bg-secondary-background-hover',
    'data-hover:text-secondary-foreground',
    'data-hover:border-secondary',
    'data-pressed:border-secondary-hover',
  ],
  success: [
    'text-success',
    'border-success',
    'data-hover:bg-success-background',
    'data-pressed:bg-success-background-hover',
    'data-hover:text-success-foreground',
    'data-hover:border-success',
    'data-pressed:border-success-hover',
  ],
  warning: [
    'text-warning',
    'border-warning',
    'data-hover:bg-warning-background',
    'data-pressed:bg-warning-background-hover',
    'data-hover:text-warning-foreground',
    'data-hover:border-warning',
    'data-pressed:border-warning-hover',
  ],
  danger: [
    'text-danger',
    'border-danger',
    'data-hover:bg-danger-background',
    'data-pressed:bg-danger-background-hover',
    'data-hover:text-danger-foreground',
    'data-hover:border-danger',
    'data-pressed:border-danger-hover',
  ],
};

/**
 * The light style
 */
export const light = {
  neutral: [
    'text-neutral',
    'data-hover:bg-neutral-subtle',
    'data-pressed:bg-neutral-subtle',
  ],
  primary: [
    'text-primary',
    'data-hover:bg-primary-subtle',
    'data-pressed:bg-primary-subtle',
  ],
  secondary: [
    'text-secondary',
    'data-hover:bg-secondary-subtle',
    'data-pressed:bg-secondary-subtle',
  ],
  success: [
    'text-success',
    'data-hover:bg-success-subtle',
    'data-pressed:bg-success-subtle',
  ],
  warning: [
    'text-warning',
    'data-hover:bg-warning-subtle',
    'data-pressed:bg-warning-subtle',
  ],
  danger: [
    'text-danger',
    'data-hover:bg-danger-subtle',
    'data-pressed:bg-danger-subtle',
  ],
};

/**
 * The faded style
 */
export const faded = {
  neutral: [
    'text-neutral',
    'bg-neutral-subtle',
    'data-hover:bg-neutral-subtle-hover',
    'data-pressed:bg-neutral-subtle-active',
  ],
  primary: [
    'text-primary',
    'bg-primary-subtle',
    'data-hover:bg-primary-subtle-hover',
    'data-pressed:bg-primary-subtle-active',
  ],
  secondary: [
    'text-secondary',
    'bg-secondary-subtle',
    'data-hover:bg-secondary-subtle-hover',
    'data-pressed:bg-secondary-subtle-active',
  ],
  success: [
    'text-success',
    'bg-success-subtle',
    'data-hover:bg-success-subtle-hover',
    'data-pressed:bg-success-subtle-active',
  ],
  warning: [
    'text-warning',
    'bg-warning-subtle',
    'data-hover:bg-warning-subtle-hover',
    'data-pressed:bg-warning-subtle-active',
  ],
  danger: [
    'text-danger',
    'bg-danger-subtle',
    'data-hover:bg-danger-subtle-hover',
    'data-pressed:bg-danger-subtle-active',
  ],
};

/**
 * A focus ring that is visible only when the user navigates with the keyboard
 * The focus ring is based off of the `focus-visible` attribute
 */
export const dataFocusRing: string[] = [
  'data-[focus-visible=true]:z-10',
  'data-[focus-visible=true]:outline-2',
  'data-[focus-visible=true]:outline-primary-600',
  'data-[focus-visible=true]:outline-offset-2',
];
