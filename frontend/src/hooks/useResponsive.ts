import { useState, useEffect } from 'react';

interface UseResponsiveReturn {
  isMobile: boolean;    // <768px
  isTablet: boolean;    // 768-1024px
  isDesktop: boolean;   // >1024px
  width: number;
}

/**
 * Hook that tracks the current viewport width and provides
 * semantic breakpoint flags for responsive rendering.
 */
export function useResponsive(): UseResponsiveReturn {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width <= 1024,
    isDesktop: width > 1024,
    width,
  };
}
