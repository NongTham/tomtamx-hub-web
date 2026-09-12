import React from "react";
import { GameRow } from "./GameRow";
import { recentlyAdded, totals } from "../data/games";

export function HomeCatalog({ onNavigate, onSelectGame }) {
  return (
    <section className="section" style={{ paddingTop: "20px" }}>
      <div className="shell stack">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "14px" }}>
          <div>
            <h2 className="h2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚡ Recently Deployed Scripts</span>
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
              Latest game compatibility updates added to the universal loader
            </p>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-raised"
            onClick={() => onNavigate("games")}
          >
            View All ({totals.games})
          </button>
        </div>

        <div className="rows-grid">
          {recentlyAdded.map((game) => (
            <GameRow key={game.placeId} game={game} onSelect={onSelectGame} />
          ))}
        </div>
      </div>
    </section>
  );
}
