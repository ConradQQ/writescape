"use client";
import { useRef, useCallback, useEffect } from "react";

import useAutosave from "@/lib/useAutosave";



export default function Editor() {
  const ref = useRef<HTMLDivElement | null> (null);

  // load saved draft 
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("ws:doc:current");
    if (ref.current && saved) ref.current.innerText = saved;
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
