/**
 * The solid style
 */
export const solid = {
  neutral: 'bg-neutral-background text-neutral-foreground',
  primary: 'bg-primary-background text-primary-foreground',
  secondary: 'bg-secondary-background text-secondary-foreground',
  success: 'bg-success-background text-success-foreground',
  warning: 'bg-warning-background text-warning-foreground',
  danger: 'bg-danger-background text-danger-foreground',
};

/**
 * The bordered style
 */
export const bordered = {
  neutral: 'border-neutral text-neutral',
  primary: 'border-primary text-primary',
  secondary: 'border-secondary text-secondary',
  success: 'border-success text-success',
  warning: 'border-warning text-warning',
  danger: 'border-danger text-danger',
};

/**
 * The ghost style
 */
export const ghost = {
  neutral: 'border-neutral text-neutral',
  primary: 'border-primary text-primary',
  secondary: 'border-secondary text-secondary',
  success: 'border-success text-success',
  warning: 'border-warning text-warning',
  danger: 'border-danger text-danger',
};

/**
 * The light style
 */
export const light = {
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

/**
 * The faded style
 */
export const faded = {
  neutral: 'bg-neutral/20 text-neutral-800',
  primary: 'bg-primary/20 text-primary-800',
  secondary: 'bg-secondary/20 text-secondary-800',
  success: 'bg-success/20 text-success-800',
  warning: 'bg-warning/20 text-warning-800',
  danger: 'bg-danger/20 text-danger-800',
};

/**
 * A focus ring that is visible only when the user navigates with the keyboard
 * The focus ring is based off of the `focus-visible` attribute
 */
export const dataFocusRing: string[] = [
  'data-[focus-visible=true]:z-10',
  'data-[focus-visible=true]:outline',
  'data-[focus-visible=true]:outline-2',
  'data-[focus-visible=true]:outline-primary-600',
  'data-[focus-visible=true]:outline-offset-2',
];

export const collapsableBorderStyles = {
  vertical: {
    neutral: ['[&+.border-medium.border-neutral]:ms-[calc(spacing(1)*-1)]'],
    primary: ['[&+.border-medium.border-primary]:ms-[calc(spacing(1)*-1)]'],
    secondary: ['[&+.border-medium.border-secondary]:ms-[calc(spacing(1)*-1)]'],
    success: ['[&+.border-medium.border-success]:ms-[calc(spacing(1)*-1)]'],
    warning: ['[&+.border-medium.border-warning]:ms-[calc(spacing(1)*-1)]'],
    danger: ['[&+.border-medium.border-danger]:ms-[calc(spacing(1)*-1)]'],
  },
};
