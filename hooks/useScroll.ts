'use client';

import { startTransition, useCallback, useEffect, useState } from 'react';

export function useScroll(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    startTransition(() => {
      handleScroll();
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrolled;
}
