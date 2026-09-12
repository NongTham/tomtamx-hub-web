import React, { useState } from "react";
import { formatCompactNumber, calcLikePercentage } from "../data/games";

export function GameCard({ game, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showFallback = !game.thumb || imgFailed;
  const initialChar = (game.name.trim()[0] || "?").toUpperCase();

  const isLive = !game.patched;
  const firstScript = game.scripts[0];
  const likePct = calcLikePercentage(game.likes, game.dislikes);

  return (
    <div
      className="game-bento-card"
      onClick={() => onSelect(game)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(game);
        }
      }}
    >
      {/* Media Thumbnail */}
      <div className="game-card-media">
        {!showFallback ? (
          <img
            src={game.thumb}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="game-media-fallback">{initialChar}</div>
        )}

        {/* Top Badges */}
        <div className="game-card-top-tags">
          <span className={`live-pill ${isLive ? "" : "patched"}`}>
            {isLive ? "LIVE" : "PATCHED"}
          </span>

          {game.count > 1 && (
            <span
              className="live-pill"
              style={{ background: "rgba(99, 102, 241, 0.85)" }}
            >
              {game.count} SCRIPTS
            </span>
          )}
        </div>
      </div>

      {/* Card Info */}
      <div className="game-card-content">
        <h3 className="game-title-text" title={game.name}>
          {game.name}
        </h3>

        {/* Feature Tags */}
        <div className="game-badges-list">
          {game.keyless && <span className="pill-tag tag-cyan">⚡ Keyless</span>}
          {firstScript?.mobile && <span className="pill-tag tag-green">📱 Mobile</span>}
          <span className="pill-tag">🛡️ Verified</span>
        </div>

        {/* Footer: ID & Ratings */}
        <div className="game-card-footer">
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-dim)",
              fontFamily: "var(--font-code)"
            }}
          >
            ID: {game.placeId ? game.placeId.slice(-6) : "N/A"}
          </span>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontFamily: "var(--font-code)",
              color: "var(--text-dim)"
            }}
          >
            {game.likes > 0 && (
              <span>👍 {formatCompactNumber(game.likes)}</span>
            )}
            {likePct != null && (
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {likePct}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
