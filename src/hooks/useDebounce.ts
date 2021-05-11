/* istanbul ignore file */
import { useState, useEffect } from 'react';

/*
  From https://usehooks.com/useDebounce
  Adjusted to support generically typed values.
*/
export const useDebounce = <T>(
  value: T | null,
  delay: number,
  enabled = true
): T | null | undefined => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T | null | undefined>();

  useEffect(
    () => {
      if (!enabled && typeof value !== 'undefined') {
        setDebouncedValue(value);
        return;
      }

      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay, enabled] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};
