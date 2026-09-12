import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { MoonIcon, SunIcon, MenuIcon, DiscordIcon } from "./Icons";
import { siteConfig } from "../config";
import { totals } from "../data/games";

export function Navbar({ activePage, onNavigate, theme, onToggleTheme }) {
  const [isStuck, setIsStuck] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [gliderStyle, setGliderStyle] = useState(null);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "games", label: "Games Catalog" },
    { id: "donate", label: "Vault / Support" }
  ];

  const updateGlider = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const activeEl = navEl.querySelector(`button.is-active`);
    if (!activeEl) {
      setGliderStyle(null);
      return;
    }
    setGliderStyle({
      x: activeEl.offsetLeft,
      w: activeEl.offsetWidth
    });
  }, [activePage]);

  useLayoutEffect(() => {
    updateGlider();
  }, [updateGlider, activePage]);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const observer = new ResizeObserver(updateGlider);
    observer.observe(navEl);
    return () => observer.disconnect();
  }, [updateGlider]);

  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 4);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePage]);

  return (
    <header className={`topbar${isStuck ? " is-stuck" : ""}`}>
      <div className="shell topbar-in">
        {/* Brand Logo & Wordmark */}
        <a
          href="#home"
          className="brand"
          aria-label={`${siteConfig.name} Home`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          <div className="brand-badge">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--cyan)" strokeWidth="2">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
              <polyline points="2 8.5 12 15.5 22 8.5" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
            </svg>
          </div>
          <span className="wordmark">{siteConfig.name}</span>
          
          <span className="system-status" title="Real-time Script Engine Operational">
            <span className="pulse-dot" />
            LIVE
          </span>
        </a>

        {/* Central Pill Navigation */}
        <nav
          className={isMobileMenuOpen ? "nav is-open" : "nav"}
          id="site-nav"
          aria-label="Primary Navigation"
          ref={navRef}
        >
          {gliderStyle && (
            <span
              className="nav-glider"
              aria-hidden="true"
              style={{
                transform: `translateX(${gliderStyle.x}px)`,
                width: `${gliderStyle.w}px`
              }}
            />
          )}

          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activePage === item.id ? "is-active" : ""}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}

          <a
            className="is-discord"
            href={siteConfig.discord}
            target="_blank"
            rel="noreferrer noopener"
          >
            <DiscordIcon />
            Discord
          </a>
        </nav>

        {/* Right Action Tools */}
        <div className="topbar-tools">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-nav"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <MenuIcon open={isMobileMenuOpen} />
          </button>
        </div>
      </div>
    </header>
  );
}
