import React, { useState } from "react";
import { siteConfig } from "../config";
import { totals, formatCompactNumber } from "../data/games";

export function HeroSection({ onExplore }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLoader = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(siteConfig.loaderScript);
      } else {
        const input = document.createElement("textarea");
        input.value = siteConfig.loaderScript;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="hero-wrapper">
      <div className="container hero-grid-2col">
        {/* Left Column */}
        <div style={{ display: "grid", gap: "20px" }}>
          <div className="hero-badge">
            <span className="pulse-indicator" />
            <span>BY {siteConfig.creator.toUpperCase()} • 100% KEYLESS</span>
          </div>

          <h1 className="hero-main-title">
            The Premier Roblox
            <br />
            <span className="gradient-title">Script Engine</span>
          </h1>

          <p className="hero-description">
            Experience next-generation script execution with zero key checkpoints,
            instant injection, and kernel-level bypass. Fully verified across PC and Mobile executors.
          </p>

          {/* Executor Compatibility Strip */}
          <div className="executors-bar">
            <span style={{ fontSize: "12px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
              Tested On:
            </span>
            {siteConfig.supportedExecutors.map((ex) => (
              <span key={ex.name} className="exec-tag">
                {ex.name}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
            <button
              type="button"
              className="btn-core btn-accent"
              onClick={onExplore}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Explore 250+ Games
            </button>

            <a
              className="btn-core"
              href={siteConfig.discord}
              target="_blank"
              rel="noreferrer noopener"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.6 5.3A17.6 17.6 0 0 0 15.3 4l-.2.4a12 12 0 0 0-2.9-.3c-.9 0-1.9.1-2.9.3L9 4a17.6 17.6 0 0 0-4.4 1.3C1.9 9.4 1.2 13.3 1.5 17.2a17.7 17.7 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a12.6 12.6 0 0 0 10.7 0l.4.3-1.7.8 1.1 1.8a17.7 17.7 0 0 0 5.4-2.7c.4-4.5-.7-8.4-3-11.9zM8.6 14.7c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm6.8 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z" />
              </svg>
              Join Community
            </a>
          </div>
        </div>

        {/* Right Column: Command Console & KPIs */}
        <div style={{ display: "grid", gap: "20px" }}>
          {/* High-Tech Terminal */}
          <div className="command-console">
            <div className="console-topbar">
              <div className="console-dots">
                <span className="dot-1" />
                <span className="dot-2" />
                <span className="dot-3" />
              </div>
              <span className="console-title">examination://universal-loader.luau</span>
              <span style={{ fontSize: "11px", color: "var(--emerald)", fontFamily: "var(--font-code)" }}>
                ● CLOUD SYNCED
              </span>
            </div>

            <div className="console-content">
              <div className="code-terminal-box">
                <span className="fn-color">loadstring</span>
                (game:HttpGet(
                <span className="url-color">
                  "https://raw.githubusercontent.com/NongTham/Maclib/main/maclib.lua"
                </span>
                ))()
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "12px", color: "var(--text-dim)", fontFamily: "var(--font-code)" }}>
                  ⚡ Supports Delta, Wave, Codex, Arceus X
                </span>

                <button
                  type="button"
                  className="btn-core btn-accent btn-sm"
                  onClick={handleCopyLoader}
                >
                  {copied ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy Universal Loader
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* KPI Stat Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-val">{totals.games}+</div>
              <div className="kpi-lbl">Games Supported</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-val" style={{ color: "var(--indigo)" }}>{totals.scripts}+</div>
              <div className="kpi-lbl">Verified Scripts</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-val">{formatCompactNumber(totals.views)}</div>
              <div className="kpi-lbl">Total Executions</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-val" style={{ color: "var(--emerald)" }}>100%</div>
              <div className="kpi-lbl">Keyless & Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
