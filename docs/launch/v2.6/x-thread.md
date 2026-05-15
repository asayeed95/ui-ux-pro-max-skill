# X thread — v2.6 launch

**Positioning:** The UI quality layer for AI coding agents.

**When to fire:** PR #307 has green CI + ≥1 human reviewer comment. Do not pre-fire.

**Cadence:** Post tweets back-to-back in a single session, 30–60 seconds apart, so the thread reads as one drop rather than a drip.

---

## Tweet 1 (hook — pin to top)

> AI coding agents are great at generating UI.
>
> They're terrible at quality-controlling it.
>
> So I shipped the layer that does.
>
> ui-ux-pro-max v2.6 → 8 verbs · deterministic lint · Higgsfield hooks.
>
> The UI quality layer for AI coding agents.

**Attach:** screenshot of the README live-demo block (showing `uipro lint` real output).

---

## Tweet 2 (problem)

> Every AI-generated landing page has the same tells:
>
> purple-to-blue gradients
> gray text on gray bg
> cards nested in cards
> emoji as icons
> the rounded-square tile above every heading
>
> Agents reproduce these defaults because nothing in their loop catches them.
>
> Until now.

---

## Tweet 3 (solution)

> v2.6 introduces the verb interface:
>
> uipro audit <path>     — UX/quality audit
> uipro polish <path>    — final pass
> uipro critique <topic> — design review
> uipro redesign <topic> — full redesign
> uipro harden <path>    — error/empty/loading
> uipro lint <path>      — anti-pattern scan
> uipro generate <mode>  — Higgsfield assets
> uipro brandkit         — 3-image kit
>
> Intent in. Checklist out.

**Attach:** verb table screenshot from rendered README.

---

## Tweet 4 (the moat — most shareable tweet)

> The killer feature is `uipro lint`.
>
> Deterministic. Regex. No LLM. No API key.
> 12 rules out of the box. CSV-overridable.
> Exits non-zero on Critical/High — wires straight into CI.
>
> It caught 2 real anti-patterns in our own scaffold the day it shipped:

**Attach:** real `uipro lint` output screenshot showing the emoji-as-icon + raw hex findings, with the file paths and line numbers visible.

---

## Tweet 5 (depth + reach)

> Each verb composes queries against a 78.5K-star design knowledge base:
>
> 50+ styles
> 161 color palettes
> 57 type pairings
> 99 UX rules
> 12 framework stacks
> 18 AI coding environments
>
> You're not stacking another design library on Claude.
> You're giving the agent a QA pass.

---

## Tweet 6 (positioning lock — pin as reply to comparison questions)

> The category landscape today:
>
> → Taste Skill (17.3K ★) wins positioning
> → Impeccable (27.7K ★) wins verb interface
> → ui-ux-pro-max (78.5K ★) wins depth + breadth
>
> v2.6 closes the ergonomics gap and adds the deterministic checker.
>
> The UI quality layer for AI coding agents — now in one command.

---

## Tweet 7 (CTA)

> Install in any project:
>
>   npx uipro-cli init
>
> Star + review the PR while it's hot:
> github.com/nextlevelbuilder/ui-ux-pro-max-skill/pull/307
>
> Works in: Claude Code, Cursor, Copilot, Codex, Gemini CLI, Cline, Continue, Droid, KiloCode, Kiro, OpenCode, Qoder, RooCode, Trae, Warp, Windsurf, Augment.
>
> One tool. Every agent. No slop.

---

## Reply playbook

When someone asks "how does this compare to [X]?" → quote-reply with **Tweet 6**.

When someone asks "does this work with [editor]?" → reply with the relevant subset of the 18 platforms list.

When someone says "AI slop is fine actually" → don't engage. The thread is the answer.

When someone asks "what's the diff between audit / polish / critique?" → reply with a one-line each:
- `audit` = severity-sorted blockers (accessibility, perf, interactions)
- `polish` = surface refinement (spacing, hierarchy, focus, type)
- `critique` = subjective review (hierarchy, tone, structural clarity)

## Cross-post adaptations

**LinkedIn:** Collapse tweets 1–6 into one long-form post, lead with tweet 1's hook, end with the install command + PR link. Tag relevant figures in AI tooling.

**Reddit (r/ClaudeAI, r/cursor):** Lead with tweet 1, paste the verb table from tweet 3, link to PR #307. **Do not paste the full thread** — it reads as spam.

**Hacker News:** Don't post until day 2+ and only if X thread shows traction. Title: "Show HN: A deterministic linter and 8-verb CLI for AI-generated UI code".
