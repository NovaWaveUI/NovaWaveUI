import { useMemo, useState } from 'react';
import { Key, useId } from 'react-aria';

/**
 * A custom hook to manage the `aria-labelledby` attribute for accessible components.
 * @param externalLabelId - An optional external label ID to use instead of generating one internally.
 * @returns An object containing the `labelId` to be used for `aria-labelledby` and a `registerLabelId` function to set an internal label ID.
 */
export function useLabelledBy(ariaLabelledBy?: string) {
  // State to hold the internal label ID
  const [internalLabelId, setInternalLabelId] = useState<string | undefined>();

  // Generate a unique ID for the label if no external ID is provided
  const generatedLabelId = useId();

  // Determine which label ID to use: external, internal, or generated
  const resolvedLabel = ariaLabelledBy || internalLabelId || generatedLabelId;

  // Memoize the register function to avoid unnecessary re-renders
  // We will not allow the function to register a new ID if ariaLabelledBy is provided
  const registerLabelId = useMemo(() => {
    return (id: Key | undefined) => {
      if (!ariaLabelledBy) {
        setInternalLabelId(id as string);
      }
    };
  }, [ariaLabelledBy]);

  return {
    resolvedLabel,
    registerLabelId,
  };
}
