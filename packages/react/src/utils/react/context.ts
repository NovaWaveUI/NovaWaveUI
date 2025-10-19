// Taken (and maybe slightly modified) from the smart people at NextUI
// Check it out at https://github.com/nextui-org/nextui/blob/canary/packages/utilities/react-utils/src/context.ts

import React from 'react';

export interface CreateContextOptions<ContextType> {
  /**
   * If `true`, the context will be created in strict mode.
   * Strict mode will throw an error if the context is accessed outside of a provider.
   * Sometimes a context should be optional, and in those cases, strict mode should be disabled.
   */
  strict?: boolean;
  /**
   * The error message to throw if the context is accessed outside of a provider.
   */
  errorMessage?: string;
  /**
   * The name of the context. This is used for debugging purposes.
   */
  name?: string;
  /**
   * The default value of the context. This is used if the context is accessed outside of a provider and strict mode is disabled.
   */
  defaultValue?: ContextType | (() => ContextType) | null | undefined;
}

/**
 * A return type for creating a context.
 * It returns a provider, a hook to get the context, and the context itself.
 */
export type CreateContextReturn<T> = [React.Context<T>, () => T];

export const createContext = <ContextType>(
  options: CreateContextOptions<ContextType> = {}
): CreateContextReturn<ContextType> => {
  const {
    strict,
    errorMessage = 'useContext must be used within a Provider with a value',
    name,
    defaultValue,
  } = options;

  // Create the React context
  const resolvedDefValue =
    defaultValue !== undefined && defaultValue !== null
      ? typeof defaultValue === 'function'
        ? (defaultValue as () => ContextType)()
        : defaultValue
      : undefined;
  const Context = React.createContext<ContextType | null | undefined>(
    resolvedDefValue
  );

  // Set the display name of the context
  Context.displayName = name;

  // Create a custom hook to get the context
  const useContext = () => {
    // Get the context
    const context = React.useContext(Context);

    // If strict mode is enabled and the context is undefined, throw an error
    if (strict && context === undefined) {
      const error = new Error(errorMessage);

      // Capture the stack trace
      error.name = 'ContextError';
      throw error;
    }

    return context as ContextType;
  };

  return [Context, useContext] as CreateContextReturn<ContextType>;
};
