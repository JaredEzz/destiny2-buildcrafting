# Contributing

Thanks for adding to the build library! The repo has one rule that keeps it useful for everyone:

> **Universal stuff goes in `general/`. Class-specific builds go in your own class folder.**

## Where things go

| Content | Location |
|---|---|
| Artifact perks, sandbox/stat changes, elemental keyword mechanics, activity notes | **`general/`** (shared — don't duplicate per class) |
| A Warlock build | `jared/` (existing personal Warlock collection) |
| A Hunter build | **`hunter/`** ← create it, mirror the `jared/` layout |
| A Titan build | **`titan/`** ← create it, mirror the `jared/` layout |

Each class folder should have a `README.md` (index) and a `builds/` directory with one markdown file per build.

## Build doc template

Copy this for a new build so everything stays skimmable and comparable:

```markdown
# <Emoji> Build Name — <Subclass + Exotic> (<tag: meta / for fun / DPS / etc.>)

**Verdict:** one line + a blunt power/fun read (e.g. "Legend-capable, Fun 9 / Power 7").

## Loadout
- Subclass / Exotic armor / 2 Aspects / Fragments
- Grenade / Melee / Super / Class / Movement

## Weapons
- Equipped trio (+ note any exotic/catalyst requirement) and backups.

## Stats
Priority order in the 6-stat system (W/H/C/G/S/M) + a one-line why.

## Artifact
Which artifact + the 7 tier-legal perks, marked T1/T2/T3.
(Rule: 7 perks across 5 columns → at least 2 Tier-1, at most 2 Tier-3.)

## Armor mods

## Gameplay loop
Numbered rotation — how to add-clear, and how to DPS.

## Tips / failure modes
Champion coverage, survivability, when the build stalls, fallbacks.
```

## Ground rules

- **Verify before you publish.** The live API manifest can lag behind the current sandbox — confirm aspects/perks/interactions on your own character screen. If you're unsure an interaction exists, say so in the doc rather than stating it as fact.
- **No secrets, no raw dumps.** Don't commit API keys, OAuth tokens, full inventory CSVs, or DIM backup JSONs. The `.gitignore` blocks the common ones; keep auth in local files outside the repo.
- **Cite the artifact set / season** a build assumes — artifact perks rotate, so a build can quietly go stale.
- Keep `general/` the single source of truth; if you find yourself copy-pasting the same mechanic into multiple class folders, move it to `general/` and link it.
