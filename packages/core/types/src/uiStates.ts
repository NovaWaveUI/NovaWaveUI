// Generic UI states
/**
 * Focus state representation
 */
export interface FocusState {
  isFocused: boolean;
  isFocusVisible: boolean;
}

/**
 * Hover state representation
 */
export interface HoverState {
  isHovered: boolean;
}

/**
 * Press state representation
 */
export interface PressState {
  isPressed: boolean;
}

/**
 * Selection state representation
 */
export interface SelectionState {
  isSelected: boolean;
}

/**
 * Disabled state representation
 */
export interface DisabledState {
  isDisabled: boolean;
}

/**
 * Readonly state representation
 */
export interface ReadOnlyState {
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
