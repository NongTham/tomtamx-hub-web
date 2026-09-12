import React, { useState, useEffect } from "react";
import { cleanGameName } from "../data/games";

export function ScriptModal({ game, onClose }) {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [onClose]);

  if (!game) return null;

  const activeScript = game.scripts[selectedScriptIndex] || game.scripts[0];
  const scriptCommand = activeScript?.rawScript
    ? `loadstring(game:HttpGet("${activeScript.rawScript}"))()`
    : activeScript?.url || "";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(scriptCommand);
      } else {
        const ta = document.createElement("textarea");
        ta.value = scriptCommand;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span className={`live-pill ${game.patched ? "patched" : ""}`}>
              {game.patched ? "PATCHED" : "LIVE & VERIFIED"}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontFamily: "var(--font-code)" }}>
              PLACE ID: {game.placeId}
            </span>
          </div>

          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800 }}>
            {game.name}
          </h2>
        </div>

        {/* Multi Script Tab Selector */}
        {game.scripts.length > 1 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {game.scripts.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`btn-core btn-sm ${idx === selectedScriptIndex ? "btn-accent" : ""}`}
                onClick={() => setSelectedScriptIndex(idx)}
              >
                {cleanGameName(s.title).slice(0, 24)}
              </button>
            ))}
          </div>
        )}

        {/* Script Code Block */}
        {scriptCommand && (
          <div
            style={{
              background: "#06080e",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "16px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-code)", color: "var(--primary)" }}>
                ⚡ Standalone Loadstring
              </span>

              <button
                type="button"
                className="btn-core btn-accent btn-sm"
                onClick={handleCopy}
              >
                {copied ? "✓ Copied!" : "Copy Script"}
              </button>
            </div>

            <code
              style={{
                display: "block",
                fontFamily: "var(--font-code)",
                fontSize: "12.5px",
                color: "#cbd5e1",
                wordBreak: "break-all"
              }}
            >
              {scriptCommand}
            </code>
          </div>
        )}

        {/* Features List */}
        <div>
          <h4
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--text-dim)",
              marginBottom: "10px",
              fontWeight: 700
            }}
          >
            Included Script Features
          </h4>

          {activeScript?.features?.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "8px",
                maxHeight: "180px",
                overflowY: "auto",
                paddingRight: "6px"
              }}
            >
              {activeScript.features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "var(--text-sub)"
                  }}
                >
                  <span style={{ color: "var(--primary)", fontWeight: 800 }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "13px", color: "var(--text-dim)" }}>
              {activeScript?.blurb || "Universal features enabled (Auto-Farm, Teleports, WalkSpeed, Infinite Jump, ESP)."}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
          <a
            className="btn-core btn-accent"
            href={game.url}
            target="_blank"
            rel="noreferrer noopener"
            style={{ flex: 1 }}
          >
            Launch on Roblox ↗
          </a>
        </div>
      </div>
    </div>
  );
}
