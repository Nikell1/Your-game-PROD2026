"use client";

import { useCallback, useEffect } from "react";

interface UseEnterSubmitOptions {
  onSubmit: () => void;
  enabled?: boolean;
  preventDefault?: boolean;
  ignoreInputFields?: boolean;
}

export function useEnterSubmit({
  onSubmit,
  enabled = true,
  preventDefault = true,
  ignoreInputFields = true,
}: UseEnterSubmitOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (ignoreInputFields && event.target instanceof HTMLInputElement) {
        return;
      }

      if (event.key === "Enter" && !event.shiftKey) {
        if (preventDefault) {
          event.preventDefault();
        }
        onSubmit();
      }
    },
    [onSubmit, preventDefault, ignoreInputFields],
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}
