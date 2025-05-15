import { useState, useCallback } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: SwipeHandlers) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchMove, setTouchMove] = useState<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchMove(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchMove(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchMove) return;

    const distance = touchStart - touchMove;
    const isSwipe = Math.abs(distance) > threshold;

    if (isSwipe) {
      if (distance > 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (distance < 0 && onSwipeRight) {
        onSwipeRight();
      }
    }

    setTouchStart(null);
    setTouchMove(null);
  }, [touchStart, touchMove, threshold, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}