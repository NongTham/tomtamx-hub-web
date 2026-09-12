import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, ExternalIcon } from "./Icons";
import { VoteStats, GameVoteRating } from "./VoteStats";
import { CopyButton } from "./CopyButton";
import { cleanGameName } from "../data/games";

const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function GameDrawer({ game, onClose }) {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const activeScript = game.scripts[selectedScriptIndex] ?? null;

  const handleClose = useCallback(() => {
    if (closeTimeoutRef.current) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(onClose, 220);
  }, [onClose]);

  useEffect(() => {
    const prevActiveElement = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusables = Array.from(
        drawerRef.current.querySelectorAll(FOCUSABLE_ELEMENTS)
      ).filter((el) => el.offsetParent !== null);

      if (!focusables.length) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const origOverflow = document.body.style.overflow;
    const origPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    drawerRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
      document.body.style.paddingRight = origPaddingRight;
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      prevActiveElement?.focus?.({ preventScroll: true });
    };
  }, [handleClose]);

  // Generate direct script command
  const scriptCopyValue = activeScript?.rawScript
    ? `loadstring(game:HttpGet("${activeScript.rawScript}"))()`
    : activeScript?.url || "";

  const isLive = !game.patched;

  return createPortal(
    <div
      className={`drawer-back${isClosing ? " is-closing" : ""}`}
      onMouseDown={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-drawer-title"
        tabIndex={-1}
        ref={drawerRef}
        style={{ position: "relative" }}
      >
        <button
          type="button"
          className="icon-btn drawer-x"
          onClick={handleClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Drawer Header */}
        <div className="drawer-head">
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
            <span className={`status-badge ${isLive ? "is-live" : "is-patched"}`}>
              {isLive ? "OPERATIONAL" : "PATCHED"}
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              PLACE ID: {game.placeId}
            </span>
          </div>

          <h2 className="drawer-title" id="game-drawer-title">
            {game.name}
          </h2>

          {activeScript ? (
            <VoteStats
              likes={activeScript.likes}
              dislikes={activeScript.dislikes}
              className="votes"
            />
          ) : (
            <GameVoteRating game={game} className="votes" />
          )}
        </div>

        {/* Multi-script Tab Selector */}
        {game.scripts.length > 1 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {game.scripts.map((script, idx) => (
              <button
                key={script.id}
                type="button"
                className={`btn btn-sm ${idx === selectedScriptIndex ? "btn-primary" : "btn-raised"}`}
                onClick={() => setSelectedScriptIndex(idx)}
              >
                {cleanGameName(script.title).slice(0, 24)}
              </button>
            ))}
          </div>
        )}

        {/* Script Code Snippet Box */}
        {activeScript?.rawScript && (
          <div style={{ background: "var(--bg-dark)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>
                ⚡ Standalone Loadstring
              </span>
              <CopyButton
                value={scriptCopyValue}
                label="Copy Script"
                done="Copied!"
                className="btn btn-primary btn-sm"
              />
            </div>
            <code style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#94a3b8", wordBreak: "break-all" }}>
              {scriptCopyValue}
            </code>
          </div>
        )}

        {/* Features Checklist */}
        <div className="stack-sm">
          <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
            Included Features
          </h4>

          {activeScript ? (
            activeScript.features?.length > 0 ? (
              <ul className="feature-list">
                {activeScript.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            ) : (
              <p className="small muted">
                {activeScript.blurb || "Universal features applied (WalkSpeed, Fly, Infinite Jump, Auto Farm)."}
              </p>
            )
          ) : (
            <p className="small muted">
              Universal engine supports this game. Execute the main loader in game to launch the UI.
            </p>
          )}

          {activeScript?.patched && (
            <div style={{ padding: "12px", background: "rgba(244, 63, 94, 0.1)", border: "1px solid rgba(244, 63, 94, 0.3)", borderRadius: "8px", color: "var(--rose)", fontSize: "13px" }}>
              ⚠️ This script is flagged as patched by the game developer and is awaiting update.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="drawer-actions">
          <a
            className="btn btn-primary"
            href={game.url}
            target="_blank"
            rel="noreferrer noopener"
            style={{ width: "100%" }}
          >
            Launch on Roblox
            <ExternalIcon />
          </a>

          {activeScript?.url && (
            <a
              className="btn btn-raised"
              href={activeScript.url}
              target="_blank"
              rel="noreferrer noopener"
              style={{ width: "100%" }}
            >
              View on Rscripts Community
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
