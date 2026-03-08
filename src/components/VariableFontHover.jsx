import { useState, useRef, useCallback } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';

function debounce(fn, ms) {
  let timer;
  const debounced = (...args) => {
    clearTimeout(timer);
    if (!timer) fn(...args); // leading call
    timer = setTimeout(() => { timer = null; fn(...args); }, ms);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

export function VariableFontHoverByLetter({
  label,
  fromFontVariationSettings = "'wght' 400, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  transition = { type: 'spring', duration: 0.7 },
  staggerDuration = 0.03,
  staggerFrom = 'first',
  className = '',
  onClick,
  ...props
}) {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const mergeTransition = (baseTransition) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, { from: staggerFrom }),
  });

  const hoverStart = useCallback(debounce(
    () => {
      if (isHovered) return;
      setIsHovered(true);
      animate(
        '.letter',
        { fontVariationSettings: toFontVariationSettings },
        mergeTransition(transition)
      );
    },
    100
  ), [isHovered, animate, toFontVariationSettings, transition]);

  const hoverEnd = useCallback(debounce(
    () => {
      setIsHovered(false);
      animate(
        '.letter',
        { fontVariationSettings: fromFontVariationSettings },
        mergeTransition(transition)
      );
    },
    100
  ), [animate, fromFontVariationSettings, transition]);

  return (
    <motion.span
      className={className}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {label.split('').map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre letter"
          aria-hidden="true"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
