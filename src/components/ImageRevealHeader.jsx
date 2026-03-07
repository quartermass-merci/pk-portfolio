import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

/**
 * ImageRevealHeader — wraps a section header button.
 * On hover, a random image from that section's projects
 * follows the cursor as a floating preview.
 *
 * Props:
 *   images: string[]  — array of image URLs from the section's projects
 *   children: ReactNode — the header content (button text, arrows, etc.)
 *   className: string
 *   ...rest — passed to the outer div
 */
export default function ImageRevealHeader({ images = [], children, className = '', ...rest }) {
  const [activeImg, setActiveImg] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef(null);
  const prevCursor = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Pick a random image when hovering starts
  const pickRandom = useCallback(() => {
    if (!images.length) return null;
    return images[Math.floor(Math.random() * images.length)];
  }, [images]);

  // Smooth cursor follow
  const handleMouseMove = useCallback((e) => {
    const dx = e.clientX - prevCursor.current.x;
    const dy = e.clientY - prevCursor.current.y;
    const ease = 0.25;
    const newX = prevCursor.current.x + dx * ease;
    const newY = prevCursor.current.y + dy * ease;
    setCursor({ x: newX, y: newY });
    prevCursor.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const update = (e) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        rafRef.current = null;
      });
    };
    window.addEventListener('mousemove', update);
    return () => {
      window.removeEventListener('mousemove', update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const handleEnter = useCallback(() => {
    const img = pickRandom();
    if (!img) return;
    setActiveImg(img);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 50);
  }, [pickRandom]);

  const handleLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveImg(null), 300);
  }, []);

  // Only show on desktop (no touch)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}

      {isDesktop && activeImg && (
        <img
          src={activeImg}
          alt=""
          className="fixed pointer-events-none z-50 w-[240px] h-[320px] object-cover rounded-lg shadow-2xl"
          style={{
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        />
      )}
    </div>
  );
}
