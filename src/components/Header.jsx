import React, { useState, useEffect } from "react";
import { siteConfig } from "../config";

export function Header({ theme, onToggleTheme, onNavigate, activeTab }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header" style={{
      boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.45)" : "none"
    }}>
      <div className="container site-header-inner">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          className="brand-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          <div className="brand-logo-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="brand-name font-head">
              <span className="gradient-title">{siteConfig.shortName}</span>
              <span style={{ color: "var(--primary)", marginLeft: "4px" }}>Hub</span>
            </div>
          </div>
        </a>

        {/* Central Navigation Pills */}
        <nav className="nav-links-wrap">
          <button
            type="button"
            className={`nav-item-btn ${activeTab === "home" ? "active" : ""}`}
            onClick={() => onNavigate("home")}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-item-btn ${activeTab === "games" ? "active" : ""}`}
            onClick={() => onNavigate("games")}
          >
            Games Catalog
          </button>
          <button
            type="button"
            className={`nav-item-btn ${activeTab === "features" ? "active" : ""}`}
            onClick={() => onNavigate("features")}
          >
            Features
          </button>
          <a
            className="nav-item-btn"
            href={siteConfig.discord}
            target="_blank"
            rel="noreferrer noopener"
            style={{ color: "#5865F2", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.6 5.3A17.6 17.6 0 0 0 15.3 4l-.2.4a12 12 0 0 0-2.9-.3c-.9 0-1.9.1-2.9.3L9 4a17.6 17.6 0 0 0-4.4 1.3C1.9 9.4 1.2 13.3 1.5 17.2a17.7 17.7 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a12.6 12.6 0 0 0 10.7 0l.4.3-1.7.8 1.1 1.8a17.7 17.7 0 0 0 5.4-2.7c.4-4.5-.7-8.4-3-11.9zM8.6 14.7c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm6.8 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z" />
            </svg>
            Discord
          </a>
        </nav>

        {/* Right Tools: Status & Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="hero-badge" style={{ padding: "4px 10px", fontSize: "11px" }}>
            <span className="pulse-indicator" />
            <span>OPERATIONAL</span>
          </div>

          <button
            type="button"
            className="btn-core btn-sm"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{ padding: "0 10px", minWidth: "36px" }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
