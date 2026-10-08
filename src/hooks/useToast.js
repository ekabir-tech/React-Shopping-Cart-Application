import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tiny toast-notification hook.
 * `showToast(message)` displays a message that hides itself after `duration` ms.
 */
export default function useToast(duration = 2200) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback(
    (message, type = 'success') => {
      clearTimeout(timerRef.current);
      setToast({ message, type, id: Date.now() });
      timerRef.current = setTimeout(() => setToast(null), duration);
    },
    [duration],
  );

  // Clear any pending timer on unmount.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { toast, showToast };
}
