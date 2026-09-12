import React from "react";
import { GamepadIcon, DiscordIcon } from "./Icons";
import { CopyButton } from "./CopyButton";
import { siteConfig } from "../config";
import { totals, formatCompactNumber } from "../data/games";

export function Hero({ onNavigate }) {
  const supportedExecutors = ["Delta", "Wave", "Codex", "Arceus X", "Fluxus", "Hydrogen"];

  return (
    <section className="hero">
      <div className="shell hero-grid">
        {/* Left Column: Headline & Intro */}
        <div className="stack">
          <div className="hero-tagline-badge">
            <span className="pulse-dot" />
            <span>UNIVERSAL ENGINE v4.2 • ZERO KEY SYSTEM</span>
          </div>

          <h1 className="display hero-title">
            Universal Roblox
            <br />
            <span className="gradient-text">Script Hub</span>
          </h1>

          <p className="lede">
            One powerful loader automatically detects and injects optimal scripts
            for all 252+ supported Roblox games. Completely keyless, bypass-ready,
            and regularly updated.
          </p>

          {/* Executor Compatibility Strip */}
          <div>
            <div className="executor-strip">
              <span className="executor-label">Verified On:</span>
              {supportedExecutors.map((exec) => (
                <span key={exec} className="executor-chip">
                  {exec}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-actions" style={{ marginTop: "12px" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate("games")}
            >
              <GamepadIcon />
              Browse 252+ Games
            </button>

            <a
              className="btn btn-raised"
              href={siteConfig.discord}
              target="_blank"
              rel="noreferrer noopener"
            >
              <DiscordIcon />
              Join Discord
            </a>
          </div>
        </div>

        {/* Right Column: Cyber Terminal & Stats HUD */}
        <div className="stack">
          {/* Cyber Terminal Window */}
          <div className="terminal-win">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <span className="terminal-title">ouroboros://loader.luau</span>
              <span className="terminal-badge">LIVE ENGINE</span>
            </div>

            <div className="terminal-body">
              <div className="code-field">
                <span className="fn">loadstring</span>
                (game:HttpGet(
                <span className="str">
                  "https://raw.githubusercontent.com/.../loader.lua"
                </span>
                ))()
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  ⚡ Paste directly into your mobile/PC executor
                </span>

                <CopyButton
                  value={siteConfig.loaderScript}
                  label="Copy Loader Script"
                  done="Copied to Clipboard!"
                  aria-label="Copy universal script"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>

          {/* Stats HUD Cards */}
          <div className="stats-hud">
            <div className="stat-box">
              <div className="stat-val">{totals.games}+</div>
              <div className="stat-lbl">Games Supported</div>
            </div>

            <div className="stat-box">
              <div className="stat-val" style={{ color: "var(--violet)" }}>
                {totals.scripts}+
              </div>
              <div className="stat-lbl">Live Scripts</div>
            </div>

            <div className="stat-box">
              <div className="stat-val">
                {formatCompactNumber(totals.views)}
              </div>
              <div className="stat-lbl">Total Executions</div>
            </div>

            <div className="stat-box">
              <div className="stat-val" style={{ color: "var(--emerald)" }}>
                100%
              </div>
              <div className="stat-lbl">Keyless & Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
