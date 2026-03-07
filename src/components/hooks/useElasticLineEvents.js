import { useState, useEffect } from 'react';
import { useMousePosition } from './useMousePosition';
import { useDimensions } from './useDebouncedDimensions';

export function useElasticLineEvents(containerRef, isVertical, grabThreshold, releaseThreshold) {
  const { x, y } = useMousePosition(containerRef);
  const dimensions = useDimensions(containerRef);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [controlPoint, setControlPoint] = useState({
    x: dimensions.width / 2,
    y: dimensions.height / 2,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = dimensions;
    const isOutsideBounds = x < 0 || x > width || y < 0 || y > height;

    if (isOutsideBounds) {
      setIsGrabbed(false);
      return;
    }

    let distance;
    let newControlPoint;

    if (isVertical) {
      const midX = width / 2;
      distance = Math.abs(x - midX);
      newControlPoint = { x: midX + 2.2 * (x - midX), y };
    } else {
      const midY = height / 2;
      distance = Math.abs(y - midY);
      newControlPoint = { x, y: midY + 2.2 * (y - midY) };
    }

    setControlPoint(newControlPoint);

    if (!isGrabbed && distance < grabThreshold) {
      setIsGrabbed(true);
    } else if (isGrabbed && distance > releaseThreshold) {
      setIsGrabbed(false);
    }
  }, [x, y, isVertical, isGrabbed, grabThreshold, releaseThreshold, dimensions]);

  return { isGrabbed, controlPoint };
}
