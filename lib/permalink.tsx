"use client";

import { useEffect, useRef, useState } from "react";

const SITE_URL = "https://humont.dev";

export function Permalink({ path }: { path: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const reset = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(reset.current), []);

  async function copy() {
    clearTimeout(reset.current);
    try {
      await navigator.clipboard.writeText(`${SITE_URL}${path}`);
      setState("copied");
      reset.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="permalink" data-state={state}>
      <a className="u-url permalink-url" href={path}>
        humont.dev{path}
      </a>
      <button type="button" className="permalink-copy" onClick={copy}>
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          {state === "copied" ? (
            <path d="M3 8.5 6.5 12 13 4.5" />
          ) : (
            <>
              <rect x="5.25" y="5.25" width="8" height="8" />
              <path d="M10.75 2.75h-8v8" />
            </>
          )}
        </svg>
        <span>{state === "copied" ? "copied" : "copy"}</span>
      </button>
      <span className="visually-hidden" aria-live="polite">
        {state === "copied" && "Link copied to clipboard"}
      </span>
      {state === "failed" && (
        <p className="permalink-error">
          Couldn't reach the clipboard. Select the link above to copy it.
        </p>
      )}
    </div>
  );
}
