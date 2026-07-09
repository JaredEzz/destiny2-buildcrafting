# Weavewalk Fusion Trinity — Mataiodoxia (Deliverance + Vex + Cataclysmic)

> **Reviewed by two independent Opus passes** (hash audit: clean; mechanics audit: caught and fixed one real design bug — see note below). The Strand answer to **Rain of Fire — Fusion Trinity**: same all-fusion weapon loop (Vex Mythoclast primary ammo + Deliverance special + Cataclysmic heavy), but the exotic swaps from Solar boots to **Mataiodoxia** and the reload/damage-buff engine that Rain of Fire gave for free (Icarus Dash reload, Radiant on fusion kill) has to be rebuilt out of **Weavewalk** (airborne DR) + **Particle Reconstruction** (still weapon-archetype-gated, not element-gated, so it doesn't care that you left Solar) + the new **Yearning Echo** armor-set bonus. Strand (Broodweaver), Monument of Triumph (9.7.0), PvE endgame.
>
> **Review correction:** the first draft claimed fusion-weapon kills "innately" drop Strand Tangles. False — per this repo's own Strand docs (`strand-broodweaver.md`, `necrotic-osteo-striga.md`), Tangles come from **Strand-element kills**, and none of Vex/Deliverance/Cataclysmic are Strand. The build below has been corrected to route through the actual live chain instead: **Arcane Needle applies Unravel → any of the three guns damaging that unraveled target can proc Horde Shuttle → the spawned Threadling severs on its own damage (no Tangle needed) → To Shreds consumes that sever.** Tangles still happen (occasionally, off Threadling kills), they're just a bonus, not the engine.

| | |
|---|---|
| **Element** | Strand (Broodweaver) |
| **Exotic Chest** | Mataiodoxia |
| **Super** | Needlestorm |
| **Class Ability** | Healing Rift (committed) |
| **Difficulty** | Moderate — same aerial-fusion skill floor as Rain of Fire, plus timing Arcane Needle as a CC safety valve |

**[📲 Import to DIM](https://app.destinyitemmanager.com/loadouts?loadout=%7B%22name%22%3A%22Weavewalk%20Fusion%20Trinity%20%E2%80%94%20Mataiodoxia%22%2C%22classType%22%3A2%2C%22clearSpace%22%3Afalse%2C%22parameters%22%3A%7B%22mods%22%3A%5B644105%2C1036557198%2C2031584061%2C377010989%2C2577472338%2C2577472338%2C930759851%2C2996369932%2C4087056174%2C1750845415%2C4188291233%2C4160037471%2C1755737153%5D%7D%2C%22equipped%22%3A%5B%7B%22hash%22%3A4204413574%2C%22socketOverrides%22%3A%7B%220%22%3A383852320%2C%222%22%3A1885339915%2C%223%22%3A2307689415%2C%224%22%3A2809342386%2C%225%22%3A262821318%2C%226%22%3A262821312%2C%227%22%3A4208512222%2C%228%22%3A3192552690%2C%229%22%3A3192552691%2C%2210%22%3A4208512219%7D%7D%2C%7B%22hash%22%3A1003391927%7D%2C%7B%22hash%22%3A4289226715%7D%2C%7B%22hash%22%3A768621510%7D%2C%7B%22hash%22%3A999767358%7D%5D%2C%22unequipped%22%3A%5B%5D%2C%22notes%22%3A%22Weapons%3A%20ALL%20FUSIONS%20%E2%80%94%20Vex%20Mythoclast%20%28PRIMARY%20ammo%29%20%2B%20Deliverance%20%28special%2C%20Chill%20Clip%29%20%2B%20Cataclysmic%20%28heavy%29.%20Swap%20Deliverance%E2%86%92Resounding%20%28owned%2C%20Strand%2C%20Hatchling%29%20for%20a%20real%20Tangle%20economy%20at%20the%20cost%20of%20Chill%20Clip.%20Loop%3A%20Weavewalk%20%3D%20airborne%20DR%20while%20you%20gun%20down%20adds%20%E2%86%92%20Arcane%20Needle%20marks%20a%20target%20%28Unravel%29%20%E2%86%92%20any%20gun%20finishing%20it%20can%20proc%20Horde%20Shuttle%20%E2%86%92%20its%20Threadling%20severs%20%E2%86%92%20To%20Shreds/Woven%20Mail%20%E2%86%92%20Particle%20Reconstruction%20stacks%20the%20debuff%20on%20bosses%20%E2%86%92%20Shackle/Mindspun%20is%20your%20suspend%20safety%20valve.%22%7D)** — subclass config verified hash-by-hash against `/tmp/d2items.json`; single-hash diff from the proven `mataiodoxia.md` link (socket 6: The Wanderer → Weavewalk).

## Why this is even legal (the two things that carry over from Rain of Fire)
1. **Particle Reconstruction is weapon-archetype-gated, not element-gated.** Tablet of Ruin's keystone perk ("Dealing sustained damage with Fusion Rifles or Linear Fusion Rifles partially refills the magazine from reserves and grants them bonus damage...") doesn't care that Vex/Cataclysmic are Solar and Deliverance is Stasis under a Strand subclass — it fires off the weapon category alone. The entire DPS engine of the original build survives the subclass swap intact.
2. **Elemental Siphon's real text is Kinetic-OR-Super-matching, not Solar-only.** Cross-checked against the authoritative `artifacts/artifact-index.md` (not the stale local manifest — see `d2-manifest-stale`): *"Rapid final blows with a Kinetic weapon **or** a weapon matching your equipped Super create an Elemental pickup."* Deliverance sits in the **Kinetic slot**, so it keeps feeding Elemental Siphon regardless of subclass. The original doc's text implied Solar-only, which was already imprecise — worth a fix there too.

## What does NOT carry over (and what replaces it)
- **No Icarus Dash reload.** Warlock Strand has no equivalent "reload all weapons" verb. Replaced by three overlapping passive sources: Deliverance's own **Demolitionist** roll (grenade final blows reload from reserves), Tablet of Ruin's **Particle Reconstruction** (partial reload baked into the keystone perk itself, unchanged from the original build), and — the new find — **Yearning Echo's 2-piece bonus**, which reloads equipped weapons off ammo/orb/Tangle pickups (see Armor Set Bonus section). Net: probably *more* reload uptime than Rain of Fire's dash-gated version, just less flashy.
- **No Radiant.** Strand has no analogous always-on "matching elemental buff" for a fusion trio. Replaced by leaning harder on Particle Reconstruction's own stacking debuff, which was already doing the real damage math in the original build's boss rotation and needs nothing else to function. Yearning Echo's 4-piece Tangle-damage clause would have been a second buff layer, but Tangles are scarce in this loadout (see below) — treat it as a rare bonus, not a pillar. **This is the build's honest DPS gap vs. Rain of Fire**: no on-demand offensive buff, only the debuff side. Flagged in Weaknesses.
- **No Icarus Dash aerial-effectiveness fragment slot (Heat Rises).** Weavewalk's airborne DR is a defensive analog, not an offensive one — you don't get "fusions land while floating," you get "floating doesn't kill you." Different value, not a strict downgrade or upgrade.

## Exotic — Mataiodoxia (Exotic Chest)
Intrinsic Stylostixis: targets damaged by Arcane Needle emit a suspending detonation when defeated; a second Arcane Needle on an already-marked target instantly suspends it. In this build Mataiodoxia is **not the damage engine** (the fusion trio is) — it's the free crowd-control layer that Rain of Fire's build never had, paid for with a melee button press instead of ammo.

## Abilities
- **Super: Needlestorm** — panic button / room reset, not a DPS rotation piece (this build's boss damage lives in the gun loop, same as the original).
- **Class: Healing Rift** — committed, no swapping. Sustain anchor since there's no Phoenix-Dive-style on-demand heal in this kit.
- **Grenade: Shackle Grenade** — thrown for instant suspend, consumed via Mindspun Invocation for Weaver's Trance (final blows → suspending detonations for ~25s).
- **Melee: Arcane Needle** — CC utility, not damage. Mark → suspend loop backstops the build when you're not airborne gunning.

### Aspects
1. **Mindspun Invocation** *(mandatory)* — consume Shackle for Weaver's Trance; the CC layer.
2. **Weavewalk** *(the build's namesake swap, replacing The Wanderer)* — per the repo's existing characterization (`necrotic-osteo-striga.md`, `spiderman-grapple-vampire.md`): airborne damage resistance. This is the Strand analog to Rain of Fire's aerial playstyle — you're still up in the air spraying fusions, just surviving it via DR instead of via Cure-on-dive. **Trade-off, flagged honestly:** none of this build's guns are Strand, so it isn't generating a steady Tangle stream for The Wanderer to detonate anyway — the opportunity cost of leaving Wanderer behind is smaller than it'd be in a Tangle-heavy Strand build, which is part of why Weavewalk is a reasonable pick here rather than a pure downgrade.

### Fragments (4 slots — reused unchanged from `mataiodoxia.md`, they already fit this build's needs better than the original doc's melee-focused framing suggests)
- **Thread of Warding** — Orb pickup → Woven Mail. Doubles as the trigger condition for Yearning Echo's set bonus stacks.
- **Thread of Continuity** — extends Suspend/Sever/Unravel. Keeps Vile Weave's sever window (see artifact) and Weaver's Trance alive longer.
- **Thread of Generation** — weapon damage → grenade energy. With three guns constantly firing, Shackle comes back fast.
- **Thread of Fury** — Tangle damage → melee energy. Feeds Arcane Needle back up whenever a Tangle happens to be around (occasional with the default Solar/Stasis trinity, frequent if you run the Resounding swap below).

## Weapons — the unchanged Trinity (ammo economy still matters)
- **Vex Mythoclast** (exotic, energy slot) — **PRIMARY ammo** workhorse, unlimited spray, ramps to linear mode on kills. Still Solar — irrelevant to Weavewalk, relevant to Elemental Siphon (Super-matching column is moot, but doesn't need to be — see Kinetic clause above) and to nothing else now that Radiant is gone.
- **Deliverance** (Vow fusion, **Kinetic** slot, Stasis) — the only special-ammo gun: Chill Clip freeze, **feeds Elemental Siphon via its Kinetic slot regardless of Super element**, and its rolled **Demolitionist** perk is doing the reload job Icarus Dash used to do.
- **Cataclysmic** (Vow linear fusion, heavy, Solar) — Bait-and-Switch-style boss burst into the Particle Reconstruction debuff. *(Owned roll per `destiny-weapon.csv` does not actually show Bait and Switch on the crafted copy — carrying over the same caveat the original doc glossed over. **Fire and Forget** (owned, Stasis, Adaptive Burst, Chill Clip) is the honest alternate heavy if Bait and Switch isn't actually on your Cataclysmic; it stacks a second Chill Clip source with Deliverance instead.)*

### Strand-native upgrade — swap Deliverance for Resounding (owned, not in the DIM link below)
This is the actual fix for the Tangle-generation gap flagged by review, found while answering "is there a Strand version of Deliverance": there's no Strand *reprisal* of Deliverance itself (it's a fixed-element Vow of the Disciple weapon), but you already own **Resounding** (`destiny-weapon.csv`: Fusion Rifle, **Kinetic slot**, **Strand**, special ammo — the same slot/ammo-type Deliverance occupies) rolled with **Hatchling** (final blows spawn a Threadling, verified hash `3273807888` = "Resounding / Fusion Rifle" in `/tmp/d2items.json`). Swap it in and:
- Threadlings spawn on every Resounding kill — no more waiting on Horde Shuttle RNG or Arcane Needle marks for Strand-kill uptime.
- Those Threadlings' own final blows create Tangles (per this repo's established Strand mechanics, `strand-broodweaver.md`), so **Vile Weave and Yearning Echo's 4pc Tangle-damage clause go from "occasional bonus" to actually live**, and **Unraveling Orbs (currently the artifact's dead T1 tax pick) becomes live too**, since Resounding is a genuine Strand weapon that can carry Unraveling Rounds.
- **Trade-off:** you lose Deliverance's Chill Clip freeze — the build's only hard-CC source besides Stylostixis suspend. Resounding is also Aggressive Frame (slower charge, harder hit) vs. Deliverance's Precision Frame, changing the special-slot feel.
- **Recommendation:** keep Deliverance as the default (matches the original ask and keeps Chill Clip), but treat Resounding as the build's real "hard mode" / Tangle-economy variant for content where the freeze isn't load-bearing. Not encoded in the DIM link below to avoid overriding the explicitly-requested trinity — swap the special-slot weapon manually if you want this variant.

## Armor Set Bonus — Yearning Echo (Grasp of Avarice Dungeon) — NOT YET OWNED, farm target
Pulled from the new community armor-set-bonus reference (`reference/armor-set-bonuses.json`, 8BitMars gist) — this is new-to-the-repo data, not previously factored into any build here.
- **2pc — Untold Greed [A]:** Picking up ammo, Orbs of Power, Elemental pickups, **or destroying a Strand Tangle** grants stacks (up to 100) that slightly reduce damage taken and add reload speed to equipped weapons.
- **4pc — Overflowing Coffers [S]:** While stacked, Orbs/Elemental pickups grant more energy and **Strand Tangles deal increased damage**; breaking your shield dumps all stacks into an Orb fountain.
- **Why it's the correct set for this specific build, with one correction:** the 2-piece trigger that actually matters here is **ammo/Orb pickups**, not Tangle destruction — three hungry fusion guns plus Thread of Warding's Orb generation already do this constantly, so Untold Greed stacks (and its reload speed + DR) are effectively guaranteed regardless of the Tangle problem above. The 4-piece's **Tangle damage bonus** is the part that's honestly starved by the default trinity (see Weaknesses) and only becomes reliable with the Resounding swap. So: 2pc is a solid guaranteed fix for the reload gap; 4pc's Tangle clause is a bonus, not a pillar, unless you take the Strand-native weapon swap.
- **How:** run Mataiodoxia (exotic chest) + Yearning Echo on helmet/arms/legs/class item — 4 legendary slots, 4-piece bonus achievable. Not owned yet per `destiny-armor.csv`; farm Grasp of Avarice (short, matchmade dungeon) for a full set. Until farmed, run any legendary armor with a Weapons-leaning stat distribution instead — the build functions without the set, just without the reload/DR floor.

## Stat Priority (Armor 3.0)
**Weapons 150→200 > Class ~100 > Super > Health.** Same logic as the original: Weapons stat is handling for constant gun-swapping and the ammo-drop-rate breakpoint at 200 that feeds Cataclysmic. Class stat now also matters for Healing Rift cadence (no Phoenix Dive safety net here), not just aesthetic parity with the old doc.

## Armor Mods (reused verbatim from `mataiodoxia.md` — none of them are element-locked, so none needed to change)
| Slot | Mods |
|---|---|
| Helmet | Heavy Ammo Finder + Hands-On |
| Arms | Momentum Transfer + Impact Induction |
| Chest | Charged Up ×2 + Concussive Dampener |
| Legs | Elemental Charge + Recuperation + Innervation |
| Class | Bomber + Outreach + Time Dilation |

**Why not Harmonic Siphon / Harmonic Dexterity (what the original Rain of Fire doc ran):** Harmonic mods key off your *subclass* element. Rain of Fire's subclass was Solar and 2 of 3 guns were Solar, so Harmonic mods landed. This build's subclass is Strand and **zero** of the three guns are Strand — Harmonic Siphon/Dexterity would be dead weight here, so they're dropped in favor of the ammo/ability-economy mods that already carried `mataiodoxia.md` and don't care about element.

## Artifact — Tablet of Ruin (re-picked for THIS loadout, not copy-pasted from either source build)
Tier-legal (≥2 T1, ≤2 T3), re-evaluated against `artifacts/artifact-index.md` perk text directly rather than either source doc's picks, because this loadout's live/dead perk map is genuinely different from both:

| Perk | Tier | Live here? | Why |
|---|:--:|:--:|---|
| **Particle Reconstruction** | T3 | ✅ | Unchanged keystone — weapon-archetype-gated Fusion/LFR debuff + partial reload. Mandatory. |
| **To Shreds** | T3 | ✅ | "Sustained damage to severed targets unravels them; defeating a severed target creates a Strand hotspot granting Woven Mail." **Corrected feed path (review caught the original chain was wrong):** Horde Shuttle's spawned Threadlings sever targets *directly* on their own damage — no Tangle required — so To Shreds is fed by that, not by Vile Weave. Genuinely live regardless of which special-slot weapon you run. |
| **Elemental Siphon** | T1 | ✅ | Deliverance's Kinetic slot feeds it regardless of Super element (see note above) — corrects the original doc's Solar-only framing. |
| **Unraveling Orbs** | T1 | ⚠️ tax pick (default) / ✅ live with Resounding | "Orb/Tangle pickup grants Strand weapons Unraveling Rounds" — S-rated but inert with the default trinity (zero Strand weapons). Picked only to satisfy the ≥2 T1 floor, same honesty as the original doc's Hold the Line tax pick. **Becomes genuinely live if you run the Resounding swap** (see Weapons section) since Resounding is an actual Strand weapon that can carry Unraveling Rounds. |
| **Gold from Lead** | T2 | ✅ | Special-ammo pickup → Heavy ammo chance. Deliverance is still the only special gun; still the main passive feed for scarce Cataclysmic ammo. |
| **Horde Shuttle** | T2 | ✅ | "Damaging unraveled targets with a weapon occasionally spawns a Threadling. Threadlings sever targets that they damage." Note the perk text says "with a weapon," not "with a Strand weapon" — Arcane Needle applies Unravel on hit as a baseline melee effect (independent of aspect/exotic), and then **any** of the three guns damaging that marked target can proc this. This is the build's real Strand-economy engine, not Tangle generation. |
| **Vile Weave** | T2 | ⚠️ occasional | "Targets hit by your Tangles are severed; picking up a Tangle reduces its cooldown." **Correction from the first draft:** Tangles come from *Strand-element* kills (confirmed via `strand-broodweaver.md`/`necrotic-osteo-striga.md`), and none of Vex/Deliverance/Cataclysmic are Strand — so this loadout does NOT generate Tangles innately from fusion kills. The only Tangle source here is an occasional kill by a Horde-Shuttle-spawned Threadling. Kept as a T2 pick because it's still net-positive when that happens and there's no better T2 option, but graded honestly as a bonus, not a pillar. **Becomes a real pillar with the Resounding swap**, whose Hatchling Threadlings reliably create Tangles. |

**Net result with the default trinity: Particle Reconstruction, To Shreds, Elemental Siphon, Gold from Lead, and Horde Shuttle are solidly live (5 of 7); Vile Weave is occasional bonus and Unraveling Orbs is dead tax. With the Resounding swap, all 7 are live.** Either way this beats the original Solar build's 4-of-7, because Tablet of Ruin's Strand column just has more surface area than its Solar-adjacent one — but the "5 of 7" headline in the original draft was reached via the wrong mechanism (Vile Weave was miscounted as live).

## Gameplay Loop
1. **Jump, spray Vex** — primary ammo, endless, ramps to linear on kills.
2. Airborne and getting shot at? **Weavewalk is passive** — the DR is just there while you're up.
3. **Deliverance** the dangerous thing — Chill Clip freeze; Demolitionist reloads it off Shackle Grenade kills.
4. **Arcane Needle a target first** (applies Unravel), then finish it with any of the three guns → **Horde Shuttle** occasionally spawns a Threadling that severs on its own damage → **To Shreds** turns sustained fire on that severed target into a Woven Mail hotspot for the team. This needle-then-shoot order is the build's real Strand-economy trigger, not just CC — do it on priority/tough targets, not everything.
5. Getting swarmed or need a stun? **Arcane Needle ×2** = instant suspend (Stylostixis), or consume **Shackle** via Mindspun for a 25s Weaver's Trance window.
6. Boss phase: pre-stack **Particle Reconstruction** with Vex (free, primary ammo), dump **Cataclysmic** into the debuff, same rotation math as the original build.

## Strengths
Same DPS ceiling as Rain of Fire (identical Particle Reconstruction rotation math), plus a genuine CC layer (Stylostixis suspend) that the original build had zero of. Tablet of Ruin runs noticeably less "dead weight" here than in the Solar version.

## Weaknesses (honest)
1. **The reload/damage-buff replacement is probabilistic, not guaranteed**, unlike Rain of Fire's on-demand Icarus Dash. Until Yearning Echo is farmed, you're relying on Demolitionist + Particle Reconstruction's own partial-reload alone, which is a real (if likely survivable) downgrade in reload uptime.
2. **The default trinity generates almost no Tangles.** This was the build's central design bug in draft 1 (caught on review) — Vex/Deliverance/Cataclysmic are Solar/Stasis, not Strand, so "Strand kills make Tangles" doesn't apply to them. Vile Weave and Yearning Echo's Tangle-damage 4pc are real but occasional, not guaranteed, unless you take the **Resounding swap** (see Weapons section), which fixes this at the cost of Chill Clip.
3. **Weavewalk vs. The Wanderer is a genuine trade**, not a strict upgrade — you lose on-demand Tangle detonation/suspend-on-throw to gain passive airborne DR, though with the default trinity's thin Tangle supply there's less to detonate anyway. If a Master/GM room doesn't need the aerial survivability, The Wanderer may out-perform Weavewalk; treat the swap as build-defining flavor, not a free upgrade.
4. **Cataclysmic's actual owned roll may not have Bait and Switch** (see Weapons section) — verify before assuming the original build's boss-DPS framing carries over 1:1.
5. **No offensive damage buff, only the debuff.** Radiant doesn't have a Strand equivalent here — this build's entire damage bonus is Particle Reconstruction's target debuff (and, situationally, Yearning Echo's Tangle-damage clause). Rain of Fire had both a buff and a debuff stacking; this build only has the debuff.

## Score (pending — see rubric in `builds-ranking.md`; not self-scored to avoid anchoring the review)

> _Assembled from: `rain-of-fire-fusion.md`, `mataiodoxia.md`, `strand-broodweaver.md`, `necrotic-osteo-striga.md`, `spiderman-grapple-vampire.md`, `artifacts/artifact-index.md`, `destiny-weapon.csv`/`destiny-armor.csv` (owned-gear ground truth), `reference/armor-set-bonuses.json` (new). Hashes verified against `/tmp/d2items.json`. Reviewed by two independent Opus passes (hash audit: 100% clean; mechanics audit: caught a real design bug in draft 1 — the Tangle-generation claim — corrected throughout, and surfaced the Resounding weapon-swap fix). See `../../sandbox-meta.md` for buff/debuff bucket math._
