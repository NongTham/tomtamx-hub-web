import React, { useState } from "react";
import { GameVoteRating } from "./VoteStats";
import { formatRelativeTime } from "../data/games";

export function GameRow({ game, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showFallback = !game.thumb || imgFailed;
  const initialChar = (game.name.trim()[0] || "?").toUpperCase();
  const timeAgo = formatRelativeTime(game.added);

  return (
    <div
      className="tactical-row"
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
      <div className="row-thumb">
        {!showFallback ? (
          <img
            src={game.thumb}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 242, 254, 0.1)",
              color: "var(--cyan)",
              fontWeight: 700
            }}
          >
            {initialChar}
          </div>
        )}
      </div>

      <div className="row-info">
        <div className="row-name" title={game.name}>
          {game.name}
        </div>
        <div className="row-meta">
          {timeAgo && <span>Added {timeAgo}</span>}
          {game.keyless && <span style={{ color: "var(--cyan)" }}>• Keyless</span>}
          {game.patched && <span style={{ color: "var(--rose)" }}>• Patched</span>}
        </div>
      </div>

      <div style={{ flexShrink: 0 }}>
        <GameVoteRating game={game} />
      </div>
    </div>
  );
}
