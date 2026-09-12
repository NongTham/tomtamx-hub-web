import React, { useState, useDeferredValue, useMemo } from "react";
import { SearchIcon } from "./Icons";
import { GameCard } from "./GameCard";
import { gamesList, totals, sortOptions } from "../data/games";
import { siteConfig } from "../config";

export function GamesCatalog({ onSelectGame }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [activeTag, setActiveTag] = useState("all");

  const deferredSearch = useDeferredValue(searchTerm).trim().toLowerCase();

  // Filter chips definitions
  const filterTags = [
    { id: "all", label: "🌐 All Games", count: gamesList.length },
    { id: "keyless", label: "⚡ Keyless Only", count: gamesList.filter((g) => g.keyless).length },
    { id: "mobile", label: "📱 Mobile Ready", count: gamesList.filter((g) => g.scripts.some((s) => s.mobile)).length },
    { id: "top", label: "🔥 Top Rated", count: gamesList.filter((g) => (g.likes || 0) > 10).length },
    { id: "recent", label: "🆕 Recently Added", count: gamesList.filter((g) => g.added > 0).length }
  ];

  const filteredAndSortedGames = useMemo(() => {
    let list = gamesList;

    // Apply tag filter
    if (activeTag === "keyless") {
      list = list.filter((g) => g.keyless);
    } else if (activeTag === "mobile") {
      list = list.filter((g) => g.scripts.some((s) => s.mobile));
    } else if (activeTag === "top") {
      list = list.filter((g) => (g.likes || 0) > 10);
    } else if (activeTag === "recent") {
      list = list.filter((g) => g.added > 0);
    }

    // Apply search filter
    if (deferredSearch) {
      list = list.filter((g) => g.search.includes(deferredSearch));
    }

    // Apply sort
    const currentSort = sortOptions.find((opt) => opt.id === sortKey)?.cmp;
    if (currentSort && sortKey !== "name") {
      return [...list].sort(currentSort);
    }
    return list;
  }, [deferredSearch, sortKey, activeTag]);

  return (
    <section className="section">
      <div className="shell stack">
        {/* Section Header */}
        <div className="stack-sm">
          <h1 className="h1">
            Browse <span style={{ color: "var(--cyan)" }}>{totals.games}+</span> Supported Games
          </h1>
          <p className="lede">
            Instant execution scripts tested and verified across all leading Roblox executors.
          </p>
        </div>

        {/* Multi-Tag Filter Chips */}
        <div className="filter-chips">
          {filterTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={`chip ${activeTag === tag.id ? "is-active" : ""}`}
              onClick={() => setActiveTag(tag.id)}
            >
              <span>{tag.label}</span>
              <span className="chip-count">{tag.count}</span>
            </button>
          ))}
        </div>

        {/* Search & Sort Toolbar */}
        <div className="filters-bar">
          <div className="search-field">
            <SearchIcon />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by game name, Place ID, or feature..."
              aria-label="Search games"
            />
            <span className="search-shortcut">/</span>
          </div>

          <div className="select-wrap">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              aria-label="Sort games"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Head Note Count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Showing <strong style={{ color: "var(--text-primary)" }}>{filteredAndSortedGames.length}</strong> games
            {deferredSearch ? ` matching "${searchTerm.trim()}"` : ""}
          </span>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {totals.scripts} live scripts indexed
          </span>
        </div>

        {/* Tactical Game Grid */}
        {filteredAndSortedGames.length > 0 ? (
          <div className="wall">
            {filteredAndSortedGames.map((game) => (
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
              padding: "60px 20px",
              textAlign: "center",
              background: "var(--bg-panel)",
              border: "1px dashed var(--border-subtle)",
              borderRadius: "var(--radius-lg)"
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
              No games found matching "{searchTerm}"
            </h3>
            <p className="muted" style={{ maxWidth: "400px", margin: "0 auto 20px" }}>
              Want this game added to the hub? Request it in our Discord community and our team will add it!
            </p>
            <a
              className="btn btn-primary"
              href={siteConfig.discord}
              target="_blank"
              rel="noreferrer noopener"
            >
              Request on Discord
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
