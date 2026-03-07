import { useState } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { debounce } from 'lodash';

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

  const hoverStart = debounce(
    () => {
      if (isHovered) return;
      setIsHovered(true);
      animate(
        '.letter',
        { fontVariationSettings: toFontVariationSettings },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const hoverEnd = debounce(
    () => {
      setIsHovered(false);
      animate(
        '.letter',
        { fontVariationSettings: fromFontVariationSettings },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

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
