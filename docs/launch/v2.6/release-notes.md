# v2.6.0 — The Verb Interface

> **The UI quality layer for AI coding agents.**

Eight commands that turn the CSV/BM25 engine into ergonomics. A deterministic linter that runs without an LLM. Higgsfield-backed image generation as a first-class verb. No breaking changes.

## What's new

### `uipro <verb>` — eight intent-shaped commands

| Verb | Use it for |
|---|---|
| `audit <path>` | Accessibility, performance, interaction failures sorted by severity |
| `polish <path>` | Spacing, hierarchy, focus states, typography refinements |
| `critique <topic>` | Visual hierarchy, emotional tone, structural clarity review |
| `redesign <topic>` | Full re-design pass with style + palette + type proposal |
| `harden <path>` | Error/empty/loading states, i18n, edge cases |
| `lint <path>` | **Deterministic regex scanner.** No LLM, no API key, CI-friendly |
| `generate <mode>` | Higgsfield-backed image gen: `hero`, `mobile`, `lifestyle`, `hand` |
| `brandkit` | 3-image brand kit (logo concept + palette swatch + type specimen) |

Each verb composes the right domain queries against the knowledge base and returns a severity-sorted markdown checklist agents can execute against.

### `uipro lint` — the deterministic moat

- **12 default rules** ship with the CLI (`data/lint-rules.csv` is contributor-friendly)
- **Catches**: emoji-as-icon, missing `alt`, icon-only buttons without `aria-label`, raw hex in `className`, `outline:none` without replacement focus ring, `<div onClick>` without `role`, animating `width/height/top/left`, disabled zoom in viewport, placeholder-as-label, `<a onClick>` without `href`, fixed `100vh` on mobile, inline-style raw hex
- **Exits non-zero** on Critical/High findings — drop into pre-commit or CI today
- **Severity gate**: `--severity High` to focus on real blockers
- **JSON output**: `--json` for tooling integration

### Higgsfield image gen, first-class

```bash
uipro generate hero    --prompt "matte black headphones, studio rim-lit, onyx pedestal"
uipro generate mobile  --prompt "wellness app onboarding, soft blush, warm hand"
uipro brandkit         --prompt "premium dark fintech, slate + electric red"
```

Modes map to Higgsfield's `product_shot`, `conceptual_product`, `lifestyle_scene`, and `closeup_product_with_person`. Outputs land in `public/assets/generated/`. Requires `higgsfield auth login` once.

### Sharper positioning

The README now leads with **"The UI quality layer for AI coding agents."** New live-output demo section directly under the verb table — real `uipro lint / audit / polish` stdout, not screenshots.

## Install / upgrade

```bash
# new install
npx uipro-cli init

# upgrade existing
uipro update

# CI lint pass
uipro lint src/ --severity High
```

## Compatibility

- **Platforms** (18): Claude Code, Cursor, Copilot, Codex, Gemini CLI, Cline, Continue, Droid, KiloCode, Kiro, OpenCode, Qoder, RooCode, Trae, Warp, Windsurf, Augment, Agent
- **Stacks** (16): React, Next.js, Vue, Svelte, Astro, Nuxt, Nuxt UI, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, Jetpack Compose, Three.js, Angular, Laravel
- **Python** ≥ 3.8 required for the engine

## No breaking changes

All existing `python3 search.py` invocations and `--domain` queries continue to work unchanged. Verbs are additive — a thin layer on top of the same engine.

## Files changed

9 files, +1,531 / −2. Two new Python scripts (`verbs.py`, `lint.py`), one new TypeScript dispatcher (`cli/src/commands/verbs.ts`), README repositioning, SKILL template verb section.

## Credits

Lint rules derived from `ux-guidelines.csv` contributions. Higgsfield CLI integration. Positioning thesis crystallized in conversation with project maintainers.

**Full PR:** [#307](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/pull/307)
