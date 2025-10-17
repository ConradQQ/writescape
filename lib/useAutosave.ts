"use client";

import { useCallback, useEffect, useRef } from "react";

export default function useAutosave(
  key: string,
  getText: () => string,
  delay = 500
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Save text to localStorage
  const save = useCallback(() => {
    try {
      const text = getText();
      localStorage.setItem(key, text);
    } catch (err) {
      console.warn("Autosave failed:", err);
    }
  }, [getText, key]);

  // Debounced save
  const queueSave = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(save, delay);
  }, [save, delay]);

  // Save when tab closes or goes hidden
  useEffect(() => {
    const handleUnload = () => save();
    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleUnload);
    };
  }, [save]);

  return queueSave; // call this whenever content changes
}
