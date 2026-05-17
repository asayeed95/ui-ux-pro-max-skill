# v2.6 Launch Package — Verb Interface

> **Positioning lock:** "The UI quality layer for AI coding agents."
>
> Every artifact below uses this exact line as the through-thread. Don't drift.

## Artifacts

| File | Purpose | Where it ships |
|------|---------|----------------|
| [`x-thread.md`](./x-thread.md) | 7-tweet announcement thread | X / Twitter (also adaptable for LinkedIn) |
| [`release-notes.md`](./release-notes.md) | GitHub release notes body | GitHub Releases (paste as the v2.6.0 release description) |
| [`readme-blurb.md`](./readme-blurb.md) | `> [!TIP]` callout for the README | README top, between badges and the one-liner heading |
| [`demo-script.md`](./demo-script.md) | 60-second demo shot list | Screen recording → MP4 → Reels/Shorts/X video |

## Pre-fire checklist

Do **not** fire the X thread until:

- [ ] PR [#307](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/pull/307) has green CI on all required checks
- [ ] At least one human reviewer has commented (positive signal that the tool is "serious", not just an LLM dump)
- [ ] The lint screenshot for Tweet 4 is captured from a **real terminal** (not a mock-up)
- [ ] The verb-table screenshot for Tweet 3 is captured from the rendered README, not from this raw markdown
- [ ] Tweet 6 (positioning lock) is ready to be **pinned** as a reply when someone asks "how does this compare to taste-skill / impeccable?"
- [ ] `npx uipro-cli init` is verified to install successfully from the published npm version that includes v2.6
- [ ] The 60-second demo video is shot with **real terminal output** — fake stdout undercuts the deterministic-lint moat

## Cadence

| When | What |
|------|------|
| **T-0** (PR review lands or CI green) | Fire X thread (Tweet 1–7 in single session, 30–60 sec apart) |
| **T+15 min** | Cross-post Tweet 1 (with thread link) to LinkedIn, Reddit r/ClaudeAI, Reddit r/cursor |
| **T+1 hour** | Publish GitHub release v2.6.0 using `release-notes.md` |
| **T+2 hours** | Post the 60-second demo as a standalone tweet quoting Tweet 1 |
| **T+24 hours** | Post a "day one numbers" follow-up tweet quoting Tweet 1 |

## Why this minimum surface

- **X thread** → creator distribution + first-day stars/installs
- **GitHub release notes** → developer discoverability (release feed, npm changelog)
- **README blurb** → conversion of incoming repo visitors during the surge
- **60s demo** → the shareable proof artifact; tweet 4's lint output as a clip is the single most viral asset

Nothing else is critical for the launch. Resist scope-creep (e.g., blog post, Product Hunt, Hacker News) until day-one numbers tell you whether to push harder or iterate.
