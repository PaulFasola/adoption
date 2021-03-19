import { useRef, useEffect } from 'react';
import type { MutableRefObject } from 'react';

export function usePrevious<T>(state: T): MutableRefObject<T | undefined>['current'] {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref.current;
}
