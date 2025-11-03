'use client';

import { startTransition, useCallback, useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const handleChange = useCallback(
    (event: MediaQueryListEvent) => {
      setPrefersReducedMotion((prev) => {
        if (prev !== event.matches) {
          return event.matches;
        }
        return prev;
      });
    },
    [setPrefersReducedMotion]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    startTransition(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    });

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [handleChange]);

  return prefersReducedMotion;
}
