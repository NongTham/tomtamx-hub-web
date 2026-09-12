import React from "react";
import { siteConfig } from "../config";

export function FeaturesSection() {
  const icons = ["⚡", "🛡️", "📱", "🔄"];

  return (
    <section className="section" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container stack">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div className="hero-badge" style={{ margin: "0 auto 12px" }}>
            <span>ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="font-head" style={{ fontSize: "32px", fontWeight: 800 }}>
            Engineered for <span className="gradient-title">Zero Friction</span>
          </h2>
          <p style={{ color: "var(--text-sub)", fontSize: "15px", marginTop: "8px" }}>
            Examination Hub was built from the ground up to eliminate tedious keys,
            ad-links, and slow execution.
          </p>
        </div>

        <div className="bento-grid">
          {siteConfig.features.map((feat, idx) => (
            <div key={feat.id} className="bento-card">
              <div className="bento-icon">{icons[idx] || "✨"}</div>
              <h3 className="bento-title">{feat.title}</h3>
              <p className="bento-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
