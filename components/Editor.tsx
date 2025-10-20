"use client";
import { useRef, useCallback, useEffect } from "react";

import useAutosave from "@/lib/useAutosave";


export default function Editor() {
  const ref = useRef<HTMLDivElement | null> (null);

  // on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

  // Verifys if there's saved text in localStorage
    const savedText = localStorage.getItem("ws:doc:current")?.trim();
    if (ref.current) {
      ref.current.dataset.empty = savedText ? "false" : "true";
      if (savedText) ref.current.innerText = savedText;
    }
  }, []);

  // returns current text content
  const getText = useCallback(() => ref.current?.innerText ?? "", []);

  // autosave every on type
  const queueSave = useAutosave("ws:doc:current", getText, 800);

  // run autosave on input
  const handleInput = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const hasText = (el.innerText || "").trim().length > 0;
    el.dataset.empty = hasText ? "false" : "true";
    queueSave();
  }, [queueSave]);

  return (
    <div
      ref={ref}
      contentEditable
      spellCheck={false}
      onInput={handleInput}
      className="
        absolute inset-0 w-full h-full
        px-8 sm:px-24 md:px-40 py-16
        overflow-y-auto outline-none
        text-base sm:text-lg md:text-xl font-serif leading-relaxed
        text-neutral-100 bg-gradient-to-br from-zinc-950 to-zinc-900
        caret-rose-400 selection:bg-rose-500/30
      "
      data-placeholder="Start writing…"
      data-empty="true"
    />
  );
}
