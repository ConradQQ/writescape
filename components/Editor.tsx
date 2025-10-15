"use client";

import { useRef, useCallback } from "react";

export default function Editor() {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleInput = useCallback(() => {
    // Later you'll handle autosave or state here
  }, []);

  return (
    <div
      ref={ref}
      contentEditable
      spellCheck={false}
      onInput={handleInput}
      className="
        absolute inset-0 
        p-8 
        text-white 
        outline-none 
        overflow-y-auto
        font-sans 
        leading-relaxed
      "
      style={{ background: "#0b0b0c" }}
    />
  );
}
