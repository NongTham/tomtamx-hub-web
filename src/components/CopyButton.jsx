import React, { useState, useRef, useEffect } from "react";
import { CopyIcon, CheckIcon } from "./Icons";

async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw new Error("Clipboard API not available");
  } catch {
    let textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {}
    document.body.removeChild(textarea);
    return ok;
  }
}

export function CopyButton({
  value,
  label = "Copy",
  done = "Copied",
  className = "btn btn-primary",
  icon = true,
  "aria-label": ariaLabel
}) {
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);
  const fallbackInputRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (status === "failed" && fallbackInputRef.current) {
      fallbackInputRef.current.focus();
      fallbackInputRef.current.select();
    }
  }, [status]);

  const isCopied = status === "done";

  const handleCopy = async () => {
    const success = await copyToClipboard(value);
    setStatus(success ? "done" : "failed");
    clearTimeout(timerRef.current);
    if (success) {
      timerRef.current = setTimeout(() => setStatus("idle"), 1800);
    }
  };

  return (
    <>
      <button
        type="button"
        className={className}
        aria-label={ariaLabel || label}
        onClick={handleCopy}
      >
        {icon && (isCopied ? <CheckIcon /> : <CopyIcon />)}
        <span>{isCopied ? done : label}</span>
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {status === "done"
          ? done
          : status === "failed"
          ? "Copy failed. Select the text and copy it manually."
          : ""}
      </span>

      {status === "failed" && (
        <span className="copy-fallback">
          <input
            ref={fallbackInputRef}
            readOnly
            value={value}
            onFocus={(e) => e.target.select()}
          />
          <em>Could not copy automatically. Press Ctrl+C or Cmd+C.</em>
        </span>
      )}
    </>
  );
}
