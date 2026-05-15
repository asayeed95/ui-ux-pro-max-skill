# 60-second demo script — v2.6 launch

**Positioning:** The UI quality layer for AI coding agents.

**Format:** One 60-second take, cuttable to 30/45/60s and reformat-able to 9:16 vertical for Reels / Shorts / TikTok.

**Critical rule:** Every terminal shot must be **real stdout from a real run**, not a mock-up. The proof of "deterministic" is undermined the moment the lint output looks staged.

---

## Shot list

| Time | On-screen | Voiceover (or no-VO caption) | What's shown |
|---|---|---|---|
| **0:00–0:04** | Title card: **"The UI quality layer for AI coding agents."** Liquid Glass dark bg, Inter Bold, red accent slash. | _"Most AI-generated landing pages look the same."_ | Logo morph in, hold |
| **0:04–0:10** | Caption: _"You know the tells."_ | (no VO — text only) | Fast-cut: 4 generic AI pages (purple gradients, gray-on-gray, emoji icons, nested cards) — 1.5s each |
| **0:10–0:16** | Caption: **"Here's the loop nobody built."** Then verb table fades in. | _"Until now there was no QA pass between 'generate' and 'ship'."_ | Verb table animates in column-by-column |
| **0:16–0:28** | Terminal recording. Top caption: **`uipro lint src/`** | _"`uipro lint` runs deterministic regex against twelve rules. No LLM. No API key. No network."_ | Real terminal: command typed, output streams, **highlight the two findings** (emoji-as-icon, raw hex) with red boxes on lines `page.tsx:121` and `HeroCanvas.tsx:13` |
| **0:28–0:36** | Caption: **`uipro audit landing`** | _"`uipro audit` pulls real UX rules from a seventy-eight-thousand-star knowledge base. Severity sorted."_ | Terminal: audit output scrolls, highlight `[High] Focus States`, `[High] Touch Target Size` |
| **0:36–0:44** | Caption: **`uipro generate hero --prompt "..."`** | _"`uipro generate` pipes through Higgsfield. Brand-grade hero assets in one command."_ | Terminal command typed → cut to the rendered hero image landing in `public/assets/generated/hero.png` |
| **0:44–0:52** | Before/after split: AI-slop page (left) → clean page (right). | _"Same agent. Same prompt. One command of QA in between."_ | Animated swipe reveal |
| **0:52–0:60** | End card: **"The UI quality layer for AI coding agents."** Below: `npx uipro-cli init` · v2.6.0 · GitHub URL | _"Install in any project: `npx uipro-cli init`. ui-ux-pro-max v2.6 — out now."_ | Logo + install command + URL |

---

## Asset checklist before recording

- [ ] **AI-slop reference page** (5 min build — use Lovable, v0, or Claude Code with a generic prompt, no skill installed)
- [ ] **Clean killer-landing** running locally for the after shot
- [ ] **Real terminal** with `uipro` installed via `npx uipro-cli init` (don't fake stdout)
- [ ] **Higgsfield auth done** so `generate hero` returns a real PNG, not a fake placeholder
- [ ] **Title and end cards** rendered in Remotion (`~/my-video` studio) using Inter + the design-system palette (slate-900 background, `#dc2626` accent, white type)
- [ ] **BGM:** ambient dark electronic, low (royalty-free — Pixabay "Tech / Minimal" or Epidemic Sound "Dark Minimal")
- [ ] **Screen recording at 1920×1080**, then resize/crop for 9:16 vertical

## Cut variants

| Length | What to drop | Use case |
|---|---|---|
| **30s** | Audit shot + before/after split | Vertical Reels / Shorts; lint + generate carry the proof |
| **45s** | Audit shot only | TikTok mid-length |
| **60s** | All shots | YouTube Shorts / X video / LinkedIn |

## 9:16 vertical recompose

Same beats, but:
- Terminal recordings: tight on the command + first 4 output lines (don't try to show the full audit output — show the finding header + 1 bullet)
- Title cards: stack text vertically, increase weight
- Before/after split: stack vertically (slop above, clean below) instead of left/right

## Distribution targets

| Platform | Length | Aspect | Caption |
|---|---|---|---|
| X | 60s | 16:9 | Tweet thread Tweet 1 hook + video |
| Instagram Reels | 30s | 9:16 | Lift Tweet 1 + 4 + 7 as captions |
| YouTube Shorts | 60s | 9:16 | Full caption from x-thread.md tweet 1 |
| TikTok | 45s | 9:16 | Lead with "AI slop is a setup problem, not a Claude problem" |
| LinkedIn | 60s | 16:9 | Cross-post the full LinkedIn write-up from x-thread.md |

## What NOT to include in the demo

- Don't show the `--design-system` engine generating an entire system. Too long, breaks the verb interface story.
- Don't show competitor comparisons in the video. The positioning lock lives in the X thread + README, not the demo.
- Don't show the create-template command (`uipro create`) — that's a separate launch.
- Don't add narration about star count. Let the receipts speak in the X thread.
- Don't use stock footage of "AI" hands typing on glowing keyboards. Real terminal only.
