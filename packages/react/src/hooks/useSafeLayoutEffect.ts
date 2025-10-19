import { useEffect, useLayoutEffect } from 'react';

export const useSafeLayoutEffect =
  typeof globalThis?.document?.createElement === 'function'
    ? useLayoutEffect
    : useEffect;
