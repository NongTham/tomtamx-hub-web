// Baseline fallback catalog for TomTamX Hub
// Contains full real Lua script code and structured description matching Rscripts

export const fallbackCatalog = [
  {
    id: "687ddded4b0bba4072ae3758",
    name: "Examination",
    placeId: "10165583746",
    image: "https://tr.rbxcdn.com/180DAY-637af792d61d8aaa790cdcf744ce8179/768/432/Image/Webp/noFilter",
    gameLogo: "https://tr.rbxcdn.com/180DAY-e7481ca726d58de6bd0eb83579e66335/128/128/Image/Webp/noFilter",
    robloxUrl: "https://www.roblox.com/games/10165583746",
    scripts: [
      {
        id: "6a9f07b66dd93561491c6b63",
        title: "TomTamX Hub | Auto Unlock Classes, Aimbot, ESP & Boss Hunter",
        description: `[ Visuals & ESP ]
• Enemy & Boss ESP (Distance & Health Display)
• Item & Loot ESP (Documents, Meds, Contraband)
• Generator & Door ESP
• Fullbright & No Fog (Removes all dark fog & shadows)

[ Combat & Weapons ]
• Smart Aimbot (Wall Check & Locked to ESP only)
• 100% No Recoil (Server-Safe, no arm glitching)
• 2.7x Fast Reload (Permanent across respawns)
• Full Auto Spray (Removes 3-round burst lock)
• Weapon & Viewmodel Quick Fix

[ Auto Unlock & Boss Hunter ]
• Enforcer Class Auto-Unlock (Carlos Auto Quest & Shielder Radar)
• Safe High-Ground Platform (Shoot from above with 100% Melee Immunity)
• Live Boss Radar & Safe TP (Chimera [Commander], Gilbert [Pointman], Vorax)
• Operator Speedrun Waypoints (Solo Sector 3)

[ Movement & Misc ]
• WalkSpeed Multiplier (Adjustable slider)
• Noclip (Keybind: V)
• Auto QTE Struggle (Instantly breaks monster pins)
• Instant Prompts (0s Hold Duration)
• Map Landmarks & Teammate Teleports

I hope you guys enjoy the script! Will keep it updated regularly :)`,
        code: `--[[rscripts:analytics:start]]
-- Script analytics (enabled by the creator on rscripts.net).
-- Runs in its own thread and cannot affect the script below.
task.spawn(function()
\tpcall(function()
\t\tloadstring(game:HttpGet("https://rscripts.net/api/telemetry/client.lua?s=6a9f07b66dd93561491c6b63"))()
\tend)
end)
--[[rscripts:analytics:end]]

loadstring(game:HttpGet("https://vss.pandauth.com/virtual/file/f1ad8cc7853648ed"))()`,
        rawScriptUrl: "https://rscripts.net/raw/tomtamx-hub-or-auto-unlock-classes-aimbot-esp-and-boss-hunter_1788807094250_xAEjfTWXMp.txt",
        sourceUrl: "https://rscripts.net/script/tomtamx-hub-or-auto-unlock-classes-aimbot-esp-and-boss-hunter-2XMK",
        updatedAt: "2026-09-07T18:51:34.244Z",
        views: 1608,
        likes: 0,
        dislikes: 4,
        keySystem: false,
        testedExecutors: [
          "Codex",
          "Delta",
          "OpiumWare",
          "Potassium",
          "Real",
          "Seliware",
          "Synapse Z",
          "Volt",
          "Wave"
        ]
      }
    ]
  }
];
