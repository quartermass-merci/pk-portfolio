import { useState } from 'react';
import { motion } from 'framer-motion';

// Underline animation variants
function CenterUnderline({ className = '' }) {
  return (
    <motion.div
      className={`absolute bottom-0 left-0 right-0 h-[1px] bg-current origin-center ${className}`}
      initial={{ scaleX: 0 }}
      variants={{
        visible: { scaleX: 1, transition: { duration: 0.3, ease: 'easeOut' } },
        hidden: { scaleX: 0, transition: { duration: 0.3, ease: 'easeIn' } },
      }}
    />
  );
}

function ComesInGoesOutUnderline({ className = '' }) {
  return (
    <motion.div
      className={`absolute bottom-0 left-0 right-0 h-[1px] bg-current ${className}`}
      variants={{
        visible: {
          scaleX: 1,
          x: '0%',
          transition: { duration: 0.3, ease: 'easeOut' },
        },
        hidden: {
          scaleX: 0,
          x: '-50%',
          transition: { duration: 0.3, ease: 'easeIn' },
        },
      }}
      style={{ originX: 0 }}
    />
  );
}

function GoesOutComesInUnderline({ className = '' }) {
  return (
    <motion.div
      className={`absolute bottom-0 left-0 right-0 h-[1px] bg-current ${className}`}
      variants={{
        visible: {
          scaleX: 1,
          x: '0%',
          transition: { duration: 0.3, ease: 'easeOut' },
        },
        hidden: {
          scaleX: 0,
          x: '50%',
          transition: { duration: 0.3, ease: 'easeIn' },
        },
      }}
      style={{ originX: 1 }}
    />
  );
}

const underlineTypes = {
  center: CenterUnderline,
  comesIn: ComesInGoesOutUnderline,
  goesOut: GoesOutComesInUnderline,
};

// Main AnimatedLink component — drop-in <a> replacement
export default function AnimatedLink({
  href,
  children,
  className = '',
  variant = 'center',
  target,
  rel,
  onClick,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const UnderlineComponent = underlineTypes[variant] || CenterUnderline;

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`relative inline-block no-underline ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? 'visible' : 'hidden'}
      initial="hidden"
      {...rest}
    >
      {children}
      <UnderlineComponent />
    </motion.a>
  );
}

// Convenience wrapper for nav items that use onClick instead of href
export function AnimatedButton({
  children,
  className = '',
  variant = 'center',
  onClick,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const UnderlineComponent = underlineTypes[variant] || CenterUnderline;

  return (
    <motion.span
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? 'visible' : 'hidden'}
      initial="hidden"
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(e); }}
      {...rest}
    >
      {children}
      <UnderlineComponent />
    </motion.span>
  );
}
