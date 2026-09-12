import React from "react";

const baseStroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8 };

export function CopyIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 9h11v12H9zM15 5.5V4H4v12h2.5" {...baseStroke} />
    </svg>
  );
}

export function CheckIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" {...baseStroke} strokeWidth={2.3} strokeLinecap="square" />
    </svg>
  );
}

export function ExternalIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 16L16 8M9.5 8H16v6.5" {...baseStroke} strokeLinecap="square" />
    </svg>
  );
}

export function GamepadIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.6 7.5h8.8a4.4 4.4 0 0 1 4.3 3.5l.8 4.1a2.5 2.5 0 0 1-2.4 3 2.4 2.4 0 0 1-2.2-1.4l-.7-1.5H7.8l-.7 1.5A2.4 2.4 0 0 1 4.9 18a2.5 2.5 0 0 1-2.4-3l.8-4.1a4.4 4.4 0 0 1 4.3-3.4z"
        {...baseStroke}
        strokeLinejoin="round"
      />
      <path d="M7.4 10.6v2.6M6.1 11.9h2.6" {...baseStroke} strokeLinecap="round" />
      <circle cx="15.6" cy="11.4" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="13.1" r="0.95" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DiscordIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.6 5.3A17.6 17.6 0 0 0 15.3 4l-.2.4a12 12 0 0 0-2.9-.3c-.9 0-1.9.1-2.9.3L9 4a17.6 17.6 0 0 0-4.4 1.3C1.9 9.4 1.2 13.3 1.5 17.2a17.7 17.7 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a12.6 12.6 0 0 0 10.7 0l.4.3-1.7.8 1.1 1.8a17.7 17.7 0 0 0 5.4-2.7c.4-4.5-.7-8.4-3-11.9zM8.6 14.7c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm6.8 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z"
      />
    </svg>
  );
}

export function SearchIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.2" {...baseStroke} />
      <path d="M15.6 15.6L20 20" {...baseStroke} strokeLinecap="square" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" {...baseStroke} strokeLinejoin="round" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" {...baseStroke} />
      <path
        d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8"
        {...baseStroke}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth={1.8} />
    </svg>
  );
}

export function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" {...baseStroke} />
      ) : (
        <path d="M4 8h16M4 16h16" {...baseStroke} />
      )}
    </svg>
  );
}

export function ThumbsUpIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10.5v9H4v-9zM7 10.5l4.4-6.8a1.6 1.6 0 0 1 2.9 1.1L13.6 9h4.9a1.8 1.8 0 0 1 1.8 2.2l-1.3 6a1.8 1.8 0 0 1-1.8 1.3H7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThumbsDownIcon({ className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 13.5v-9H4v9zM7 13.5l4.4 6.8a1.6 1.6 0 0 0 2.9-1.1L13.6 15h4.9a1.8 1.8 0 0 0 1.8-2.2l-1.3-6a1.8 1.8 0 0 0-1.8-1.3H7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
