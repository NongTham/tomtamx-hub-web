import React from "react";
import { ThumbsUpIcon, ThumbsDownIcon } from "./Icons";
import { formatCompactNumber, calcLikePercentage } from "../data/games";

export function VoteStats({ likes = 0, dislikes = 0, className = "votes" }) {
  if (likes + dislikes === 0) return null;
  const pct = calcLikePercentage(likes, dislikes);

  return (
    <p className={className}>
      <span title={`${likes.toLocaleString()} likes on rscripts`}>
        <ThumbsUpIcon />
        {formatCompactNumber(likes)}
      </span>
      <span title={`${dislikes.toLocaleString()} dislikes on rscripts`}>
        <ThumbsDownIcon />
        {formatCompactNumber(dislikes)}
      </span>
      {pct != null && <span className="votes-pct">{pct}%</span>}
    </p>
  );
}

export function GameVoteRating({ game, className = "votes" }) {
  if (game.likes + game.dislikes > 0) {
    return <VoteStats likes={game.likes} dislikes={game.dislikes} className={className} />;
  }
  return <span className="unrated">Not rated</span>;
}
