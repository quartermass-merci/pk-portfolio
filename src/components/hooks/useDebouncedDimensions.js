import { useState, useEffect } from 'react';

export function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let timeoutId;
    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 250);
    };
    updateDimensions();
    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, [ref]);

  return dimensions;
}