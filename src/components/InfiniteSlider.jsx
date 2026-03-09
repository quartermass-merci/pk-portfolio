import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import useMeasure from 'react-use-measure';

export function InfiniteSlider({
  children,
  gap = 24,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className = '',
}) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (size) {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
          setKey((prev) => prev + 1);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
          setKey((prev) => prev + 1);
        },
      }
    : {};

  const transitionStyle = isTransitioning
    ? { transition: 'opacity 0.3s ease' }
    : {};

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={transitionStyle}
      {...hoverProps}
    >
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
      >
        {children}
        {children}
      </motion.div>
    </motion.div>
  );
}
