# README announcement blurb

**Where to place:** between the badge row and the `## The UI quality layer for AI coding agents.` heading. Replace with the rolling-update version below when v2.7 ships.

## Paste this verbatim

```markdown
> [!TIP]
> **v2.6 is here — the verb interface.** Eight commands (`audit / polish / critique / redesign / harden / lint / generate / brandkit`) that turn the engine into ergonomics. Deterministic lint with CI exit codes. Higgsfield-backed image gen.
>
> → [Release notes](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases/tag/v2.6.0) · [PR #307](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/pull/307)
```

## Why a callout (not a banner image)

- GitHub renders `> [!TIP]` natively with a coloured stripe — no asset to maintain
- Survives README rewrites without breaking image links
- Easy to update for v2.7 (just rewrite the bullet)
- Doesn't burn above-the-fold attention budget; lives right next to the badges where users already scan

## Rolling-update guidance

When v2.7 ships, swap the callout for:

```markdown
> [!TIP]
> **v2.7 is here — [one-line new feature].** [Bullet of what changed.]
>
> → [Release notes](https://github.com/.../releases/tag/v2.7.0) · [PR #XXX](https://github.com/.../pull/XXX)
```

When the "this is just the latest" framing stops generating clicks (probably 3–4 minor versions in), retire the callout entirely and replace with a permanent "What's new" link below the verb table.
