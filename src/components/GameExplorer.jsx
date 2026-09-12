import React, { useState, useDeferredValue, useMemo } from "react";
import { GameCard } from "./GameCard";
import { gamesList, totals, sortOptions } from "../data/games";
import { siteConfig } from "../config";

export function GameExplorer({ onSelectGame }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [sortKey, setSortKey] = useState("name");

  const deferredSearch = useDeferredValue(searchTerm).trim().toLowerCase();

  const filterTabs = [
    { id: "all", label: "🌐 All Games", count: gamesList.length },
    { id: "keyless", label: "⚡ Keyless Only", count: gamesList.filter((g) => g.keyless).length },
    { id: "mobile", label: "📱 Mobile Ready", count: gamesList.filter((g) => g.scripts.some((s) => s.mobile)).length },
    { id: "top", label: "🔥 Top Rated", count: gamesList.filter((g) => (g.likes || 0) >= 5).length },
    { id: "recent", label: "🆕 Recently Added", count: gamesList.filter((g) => g.added > 0).length }
  ];

  const filteredGames = useMemo(() => {
    let list = gamesList;

    if (activeTag === "keyless") {
      list = list.filter((g) => g.keyless);
    } else if (activeTag === "mobile") {
      list = list.filter((g) => g.scripts.some((s) => s.mobile));
    } else if (activeTag === "top") {
      list = list.filter((g) => (g.likes || 0) >= 5);
    } else if (activeTag === "recent") {
      list = list.filter((g) => g.added > 0);
    }

    if (deferredSearch) {
      list = list.filter((g) => g.search.includes(deferredSearch));
    }

    const currentSort = sortOptions.find((opt) => opt.id === sortKey)?.cmp;
    if (currentSort && sortKey !== "name") {
      return [...list].sort(currentSort);
    }
    return list;
  }, [activeTag, deferredSearch, sortKey]);

  return (
    <section id="catalog" className="explorer-section">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h2 className="font-head" style={{ fontSize: "28px", fontWeight: 800 }}>
            Supported Games <span style={{ color: "var(--primary)" }}>({totals.games})</span>
          </h2>
          <p style={{ color: "var(--text-sub)", fontSize: "15px", marginTop: "4px" }}>
            Select any title to inspect its dedicated script features and standalone loadstring.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-row">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`filter-pill ${activeTag === tab.id ? "active" : ""}`}
              onClick={() => setActiveTag(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="filter-pill-badge">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="search-controls">
          <div className="search-input-box">
            <svg
              className="search-input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by game name, Place ID, or feature..."
              aria-label="Search games catalog"
            />

            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <select
            className="sort-select-box"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            aria-label="Sort catalog"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-dim)" }}>
            Displaying <strong style={{ color: "var(--text-main)" }}>{filteredGames.length}</strong> games
            {deferredSearch ? ` matching "${searchTerm.trim()}"` : ""}
          </span>
          <span style={{ fontSize: "13px", color: "var(--text-dim)", fontFamily: "var(--font-code)" }}>
            ⚡ 100% Zero Key System
          </span>
        </div>

        {/* Bento Grid or Empty State */}
        {filteredGames.length > 0 ? (
          <div className="games-bento-grid">
            {filteredGames.map((game) => (
              <GameCard
                key={game.placeId}
                game={game}
                onSelect={onSelectGame}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "64px 24px",
              textAlign: "center",
              background: "var(--bg-surface)",
              border: "1px dashed var(--border)",
              borderRadius: "var(--radius-lg)"
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
              No matches found for "{searchTerm}"
            </h3>
            <p style={{ color: "var(--text-sub)", maxWidth: "420px", margin: "0 auto 20px", fontSize: "14px" }}>
              Can't find your favorite game? Join our Discord server to request it directly to TomTamX!
            </p>
            <a
              className="btn-core btn-accent"
              href={siteConfig.discord}
              target="_blank"
              rel="noreferrer noopener"
            >
              Request Game on Discord
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
