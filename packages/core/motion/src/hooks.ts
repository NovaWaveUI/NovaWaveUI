import {
  AnimationOptions,
  AnimationPlaybackControlsWithThen,
  AnimationScope,
  AnimationSequence,
  DOMKeyframesDefinition,
  ElementOrSelector,
  MotionValue,
  ObjectTarget,
  SequenceOptions,
  ValueAnimationTransition,
} from 'motion';
import { motion, MotionProps, useAnimate } from 'motion/react';
import React, { JSX } from 'react';

export type GenericKeyframesTarget<V> = V[] | Array<null | V>;

/**
 * The options for the `useMotionComponent` hook.
 */
export type UseMotionComponentOptions = {
  /**
   * The component or intrinsic element to be used as the base for the motion
   * component.
   */
  as?: React.ElementType;
  /**
   * Whether to disable animations for the motion component.
   */
  disableAnimations?: boolean;
  /**
   * The default motion props to be passed to the motion component.
   */
  defaultMotionProps?: MotionProps;
  /**
   * The user motion props to be passed to the motion component.
   */
  userMotionProps?: MotionProps;
};

/**
 * A hook that when given any React component or intrinsic element, returns a
 * motion component and the props to be passed to it.
 *
 * @param options - The options for the `useMotionComponent` hook.
 * @returns - The `Component` and `motionProps` to be used in the component.
 */
export function useMotionComponent<
  T extends keyof JSX.IntrinsicElements = 'div',
>(
  options: UseMotionComponentOptions
): {
  Component: React.ElementType;
  motionProps: MotionProps;
  controls:
    | (() => (() => void)[])
    | [
        AnimationScope<any>,
        {
          (
            sequence: AnimationSequence,
            options?: SequenceOptions | undefined
          ): AnimationPlaybackControlsWithThen;
          (
            value: string | MotionValue<string>,
            keyframes: string | GenericKeyframesTarget<string>,
            options?: ValueAnimationTransition<string> | undefined
          ): AnimationPlaybackControlsWithThen;
          (
            value: number | MotionValue<number>,
            keyframes: number | GenericKeyframesTarget<number>,
            options?: ValueAnimationTransition<number> | undefined
          ): AnimationPlaybackControlsWithThen;
          <V>(
            value: V | MotionValue<V>,
            keyframes: V | GenericKeyframesTarget<V>,
            options?: ValueAnimationTransition<V> | undefined
          ): AnimationPlaybackControlsWithThen;
          (
            element: ElementOrSelector,
            keyframes: DOMKeyframesDefinition,
            options?: AnimationOptions | undefined
          ): AnimationPlaybackControlsWithThen;
          // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          <O extends {}>(
            object: O | O[],
            keyframes: ObjectTarget<O>,
            options?: AnimationOptions | undefined
          ): AnimationPlaybackControlsWithThen;
        },
      ];
} {
  const {
    as = 'div',
    disableAnimations = false,
    defaultMotionProps = {},
    userMotionProps = {},
  } = options;
  const isIntrinsicTag = (value: any): value is T => typeof value === 'string';

  // Resolve the component to be used. Map the component to the motion
  // equivalent if it is an intrinsic element. Otherwise, use the component
  // as is.
  const Component = (() => {
    if (disableAnimations) return as;
    if (isIntrinsicTag(as)) {
      return motion[as as keyof typeof motion];
    }
    return motion(as as React.ElementType);
  })();

  const resolvedMotionProps = disableAnimations
    ? {}
    : { ...defaultMotionProps, ...userMotionProps };

  const controls = disableAnimations ? () => [() => {}] : useAnimate();

  return {
    Component,
    motionProps: resolvedMotionProps,
    controls,
  };
}
