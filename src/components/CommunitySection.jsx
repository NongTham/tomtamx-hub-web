import React from "react";
import { siteConfig } from "../config";

export function CommunitySection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 36px" }}>
          <div className="hero-badge" style={{ margin: "0 auto 12px" }}>
            <span>JOIN THE ECOSYSTEM</span>
          </div>
          <h2 className="font-head" style={{ fontSize: "32px", fontWeight: 800 }}>
            Powered by <span className="gradient-title">Community</span>
          </h2>
          <p style={{ color: "var(--text-sub)", fontSize: "15px", marginTop: "8px" }}>
            Connect with thousands of players, receive script patch announcements,
            and request support directly from developers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px"
          }}
        >
          {/* Discord Card */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(88, 101, 242, 0.15)",
                color: "#5865F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.6 5.3A17.6 17.6 0 0 0 15.3 4l-.2.4a12 12 0 0 0-2.9-.3c-.9 0-1.9.1-2.9.3L9 4a17.6 17.6 0 0 0-4.4 1.3C1.9 9.4 1.2 13.3 1.5 17.2a17.7 17.7 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a12.6 12.6 0 0 0 10.7 0l.4.3-1.7.8 1.1 1.8a17.7 17.7 0 0 0 5.4-2.7c.4-4.5-.7-8.4-3-11.9zM8.6 14.7c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm6.8 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z" />
              </svg>
            </div>

            <div>
              <h3 className="font-head" style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
                Official Discord Server
              </h3>
              <p style={{ color: "var(--text-sub)", fontSize: "14px", lineHeight: 1.6 }}>
                Get pinged for instant script updates, game patches, and join executor troubleshooting voice channels.
              </p>
            </div>

            <div style={{ marginTop: "auto", paddingTop: "8px" }}>
              <a
                className="btn-core btn-indigo"
                href={siteConfig.discord}
                target="_blank"
                rel="noreferrer noopener"
                style={{ width: "100%" }}
              >
                Join Discord Community
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "var(--primary-soft)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>

            <div>
              <h3 className="font-head" style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
                GitHub Repository
              </h3>
              <p style={{ color: "var(--text-sub)", fontSize: "14px", lineHeight: 1.6 }}>
                Inspect source code, report compatibility bugs, or contribute to Maclib and Examination UI.
              </p>
            </div>

            <div style={{ marginTop: "auto", paddingTop: "8px" }}>
              <a
                className="btn-core"
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer noopener"
                style={{ width: "100%" }}
              >
                Browse GitHub (NongTham) ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
