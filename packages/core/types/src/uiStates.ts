// Generic UI states
/**
 * Focus state representation
 */
export interface FocusState {
  /**
   * Whether the element is focused.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the element is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
}

/**
 * Hover state representation
 */
export interface HoverState {
  /**
   * Whether the element is hovered with a pointer device.
   * @selector [data-hovered]
   */
  isHovered: boolean;
}

/**
 * Press state representation
 */
export interface PressState {
  /**
   * Whether the element is being pressed.
   * @selector [data-pressed]
   */
  isPressed: boolean;
}

/**
 * Selection state representation
 */
export interface SelectionState {
  /**
   * Whether the element is selected.
   * @selector [data-selected]
   */
  isSelected: boolean;
}

/**
 * Disabled state representation
 */
export interface DisabledState {
  /**
   * Whether the element is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

/**
 * Readonly state representation
 */
export interface ReadOnlyState {
  /**
   * Whether the element is read-only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
}

/**
 * Validation state representation
 */
export interface ValidationState {
  validationState: 'valid' | 'invalid' | null;
}

/**
 * Loading state representation
 */
export interface LoadingState {
  /**
   * Whether the element is loading.
   * @selector [data-loading]
   */
  isLoading: boolean;
}

/**
 * Interaction states
 */
export interface InteractionStates
  extends FocusState,
    HoverState,
    PressState,
    DisabledState {}
