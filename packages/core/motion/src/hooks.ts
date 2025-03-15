import { useMergeRefs } from '@novawaveui/use-merge-refs';
import { AnimationScope, useAnimate } from 'motion/react';
import React from 'react';

/**
 * The useMotion hook is a wrapper around the useAnimate hook that merges the
 * user's ref with the animation scope ref. This allows the user to animate
 * their DOM element without having to worry about the animation scope.
 *
 * @param userRef The DOM element ref passed by the user
 * @returns A newly merged ref, the animation scope, and the animate function
 */
export function useMotion<T extends HTMLElement = any>(
  userRef?: React.Ref<T>
): UseMotionReturn<T> {
  const [scope, animate] = useAnimate<T>();
  const mergedRef = useMergeRefs(scope, userRef);

  type AnimateFunction = typeof animate;

  return {
    ref: mergedRef,
    scope,
    animate: animate as AnimateFunction,
  };
}

// Get the return type of the `useAnimate` hook
export type AnimateFunction = ReturnType<typeof useAnimate>[1];

// Define the return type of the `useMotion` hook
export interface UseMotionReturn<T extends HTMLElement = any> {
  ref: React.RefCallback<T> | React.RefObject<T>;
  scope: AnimationScope<T>;
  animate: AnimateFunction;
}
