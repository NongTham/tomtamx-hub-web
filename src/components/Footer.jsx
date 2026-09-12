import React from "react";
import { siteConfig } from "../config";

export function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="brand-name font-head" style={{ marginBottom: "6px" }}>
              <span className="gradient-title">{siteConfig.name}</span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-dim)" }}>
              Created by <strong style={{ color: "var(--text-main)" }}>{siteConfig.creator}</strong> • Universal Roblox Execution Engine.
            </p>
          </div>

          <nav className="footer-nav">
            <button type="button" onClick={() => onNavigate("home")}>
              Home
            </button>
            <button type="button" onClick={() => onNavigate("games")}>
              Games Catalog
            </button>
            <button type="button" onClick={() => onNavigate("features")}>
              Features
            </button>
            <a
              href={siteConfig.discord}
              target="_blank"
              rel="noreferrer noopener"
            >
              Discord
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>
            An independent community project. Not affiliated with or endorsed by Roblox Corporation.
          </p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name} • All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
