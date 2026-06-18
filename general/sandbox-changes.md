# Sandbox & Meta — How It All Interacts (Warlock PvE, Monument of Triumph)

> The "why" behind every build. Update **9.7.0, June 9 2026** — Destiny 2's final major live-service update.
> **Crucial framing:** the six-stat **Armor 3.0** system shipped with *Edge of Fate* (July 2025). **Monument of Triumph (MoT) re-tuned the economy *around* it** — it did not rebuild the mod list. The MoT deltas are what invalidate old build math.

---

## 0. TL;DR — the five changes that reshape every build

1. **Active ability-cooldown bonus from stats cut 190% → 125%** (passive ~−20%). Raw stat-stacking for ability spam is **dead**. Uptime now comes from **kills, orbs, and mod loops.**
2. **Super energy from boss damage cut 60%.** "Super-spam off DPS" is gone. Super now leans on **orbs + the Super stat + self-refund weapons** (Bad Juju), not dumping damage into a boss.
3. **Anti-Champion 2.0:** all anti-champ mods removed from the Artifact — **champion stun is now intrinsic to weapon *frames*.** Volatile Rounds & Radiant **no longer stun Barrier** (they give +10% champ damage instead).
4. **All Exotic armor is retroactively Tier 5** with full tuning-mod access. Exotics are no longer a stat compromise — every Exotic-defined engine got strictly stronger.
5. **Over-100 stat secondaries are the new damage lever:** Grenade>100 = up to **+65% grenade dmg**, Super>100 = **+45% super dmg**, Melee>100 = **+30% melee dmg.** This is where surplus points go now that cooldown is capped.

> ⚠️ Numbers marked with values (e.g. +65%, 25%/40% resist, surge 11/17/22%) are best-available from June-2026 sources; MoT re-tuned several curves, so **verify exact magnitudes in-game.** Directions/mechanics are multi-source confirmed.

---

## 1. The stat system (Armor 3.0, MoT-tuned)

Six stats, each scales **0–200**. **1–100 = base effect; 101–200 = a secondary bonus.** Linear, **no breakpoints** (144→145 = 143→144). Soft cap 100, hard cap 200.

| Stat (old name) | 1–100 | 101–200 secondary |
|---|---|---|
| **Weapons** (Mobility) | reload/handling, +dmg vs minors | boss/heavy dmg, **double ammo @200** |
| **Health** (Resilience) | ~70 HP/orb pickup, flinch resist | +shield cap & recharge |
| **Class** (Recovery) | Rift cooldown + all-source class energy | **Overshield on Rift cast (~40 HP)** |
| **Grenade** (Discipline) | grenade cooldown/energy | **+65% grenade dmg** |
| **Super** (Intellect) | **multiplies Super income from all sources** | **+45% super dmg** |
| **Melee** (Strength) | melee cooldown + all-source melee energy | **+30% melee dmg** |

**Key reads:**
- **30% PvE damage resistance is now FREE/baseline at 0 Health.** Health is no longer your DR stat — it's orb-healing + shields.
- **Super stat is a *multiplier on income*, not a cooldown.** Below 100 Super you *lose* super energy vs baseline → **treat 100 Super as a floor** if super matters.
- **Class >100 → overshield-on-Rift is the Warlock survivability anchor** — it's what lets you stand in the open running damage engines.
- With the 125% cap, **breadth beats one-stat stacking.** Fund Class + your key ability stat to ~100, then push one *damage* stat over 100.

**Archetypes** (each piece rolls primary +30 / secondary +25 / ~20 spread). MoT added 6 new ones. Warlock-relevant:

| Archetype | Primary / Secondary | For |
|---|---|---|
| Demolitionist | Grenade / Class | grenade-spam / ability builds |
| Siegebreaker | Health / Grenade | tanky grenade builds |
| Colossus | Super / Health | super-DPS |
| Powerhouse | Weapons / Super | weapon+super DPS |
| Reaver | Class / Melee | Soul Siphon / melee |
| Bulwark | Health / Class | max-survivability |

**Tier 5 gear** = ~75+ stat pts, 11 mod energy, extra slot, a **0-energy tuning slot** (move 5 pts). All Exotics get this now. Set bonuses trigger at **2-piece and 4-piece** (mix two 2-pieces, or 4-piece + Exotic) — use them to "buy back" some removed cooldown.

---

## 2. The mod catalog (by slot) + what each is *for*

T4/T5 = **11 energy**. Tuning + Artifice mods = **0 energy**. Mods are **slot-locked.**

**HELMET (orb generation):** **[Element] Siphon** — matching-element kills make Orbs (Harmonic Siphon = 1 energy, the universal anchor). **Ammo Finder** (now stacks ×3, feeds the ammo meter). **[Weapon] Targeting.**

**ARMS (ability economy):** **Grenade/Melee Kickstart** (spend Armor Charge to refund a fully-empty ability). **Font mods** (while Armor Charged, +30/50/60 to a stat — Font of Wisdom→Super). **Loader/Dexterity.** **Impact Induction** (melee dmg→grenade energy), **Momentum Transfer** (grenade dmg→melee), **Bolstering Detonation** (grenade dmg→class).

**CHEST (survivability + ammo):** **Concussive Dampener** (15/25/30% AoE DR). **[Element] Resistance** (**25% / 40%** at 1/2 mods, multiplicative). **Unflinching Aim.** **Ammo Generation** (replaced Reserves; stacks).

**LEGS (the payoff slot):** **[Element] Weapon Surge** (PvE **+11/17/22%** weapon dmg while Armor Charged — your main damage mod). **Innervation** (orb→grenade), **Invigoration** (orb→melee), **Insulation** (orb→class, weakest), **Absolution** (orb→all three, **best all-around**). **Recuperation/Better Already** (orb→heal). **Scavenger/Holster.**

**CLASS ITEM (loop + charge mgmt):** **Utility Kickstart** (refund class). **Bomber** (class cast→grenade), **Outreach** (class→melee), **Distribution** (class near enemies→big chunk of *all* energy — high value). **Time Dilation / Charged Up / Stacks on Stacks** (Armor Charge uptime/ceiling). **Powerful Attraction** (auto-vacuum orbs — guarantees pickups fire). **Reaper** (first kill after class → orb).

---

## 3. The universal circuit (how the parts chain)

Every Warlock build sits on this substrate. Each arrow is a real in-game causal link:

```
STATS set the floor:
  Class 70–100  ──► Rift cooldown + (>100) OVERSHIELD-ON-RIFT  ← survivability anchor
  Health 60–100 ──► ~70 HP per ORB picked up + flinch resist
  one DAMAGE stat >100 ──► +65% gren / +45% super / +30% melee

KILL ───────────► makes ORB (Harmonic Siphon, 1 energy)
ORB pickup ─────► (a) Health stat HEALS ~70 HP
                  (b) grants ARMOR CHARGE
                  (c) Innervation/Invigoration/Insulation/Absolution = ability ENERGY
ARMOR CHARGE ───► (a) FONT mods spike a stat   (b) KICKSTART refunds an empty ability
                  (c) SURGE mods buff weapon damage
ABILITY energy back ─► cast ─► KILL ─► loop closes
```

**Energy-source priority for MoT Warlock (best → situational):**
1. **Subclass elemental pickups** (Void Breach / Ionic Trace / Firesprite / Stasis Shard / Tangle) — bypass the cooldown nerf, refund directly, scaled by Class/Melee.
2. **Damage-triggered converters** (Impact Induction, Momentum Transfer, Bolstering Detonation) — no kill required.
3. **Orb converters** (Innervation/Absolution + Siphon/Firepower/Heavy Handed engines).
4. **Passive stat regen** — now just a baseline, capped at +125%.
5. **Kickstart** — burst safety net.
6. **Ashes to Assets / Hands-On + 100 Super** — the new Super backbone (boss-damage super is gutted).

> Elemental Wells / Charged-with-Light no longer exist — folded into **Armor Charge + Orbs of Power.** The "well" role is now the per-subclass pickups above.

---

## 4. The 3–4 dominant engines of the meta

### Engine 1 — Soul Siphon Void Warlock (the signature new MoT build)
New Void aspect: powered melee readies it → melee again drains up to 4 enemies.
```
powered melee ─► Soul Siphon drain ─► VOID OVERSHIELD + CLASS ENERGY ─► Rift ─► (Class>100) more overshield
              └► Void kills ─► Feed the Void DEVOUR ─► full HP + grenade energy ─► melee back ─► loop
```
Powered by **Melee stat** (scales both drain damage AND the class-energy return) + Class>100 + Devour. Exotics: **Nezarec's Sin** or **Winter's Guile**. Closes on melee alone — kills are pure bonus.

### Engine 2 — Double Nova Bomb (reworked Skull of Dire Ahamkara — top super DPS)
```
Nova Bomb: Cataclysm ─► free instant Lance into it ─► triple detonation ─► many Nova KILLS
   └► Bad Juju (String of Curses) ─► SUPER ENERGY + keeps Devour alive ─► cast again
```
Powered by **Super stat → 200 (+45% super dmg, best DPS-per-point)** + **Bad Juju (mandatory)** + Devour. The damage-ceiling pick.

### Engine 3 — Sunbracers Solar grenade (classic spam engine, intact)
```
melee kill ─► Sunbracers ─► ~5s FREE Solar grenades ─► grenade kills ─► Incandescent ignitions + more grenade energy ─► chain
```
Powered by **Grenade>100 (+65%, biggest over-100 multiplier)** + Grenade Kickstart + Heat Rises/Touch of Flame. Archetype: Siegebreaker/Demolitionist.

### Engine 4 — Getaway Artist Arc (passive turrets)
```
Arc grenade ─► Getaway Artist ─► ARC SOUL turret (+ Amplified)   ║   Bleak Watcher ─► Stasis turret #2
weapon kills ─► orbs ─► Armor Charge ─► Kickstart/Font ─► more grenades for turrets
```
"Set and forget" uptime/survivability. ⚠️ **MoT added a 4s internal cooldown on jolt applied via Arc Soul / turret constructs** (also hits Facet of Dominance) — plan around throttled passive jolt.

**Why these win post-MoT:** the cooldown cap killed raw stat-stacking, so every winning engine makes ability energy from a *gameplay loop*; the 60% boss-super cut means the surviving super engine self-refunds off *kills* not boss damage; over-100 secondaries are the damage lever; and all-Tier-5 Exotics make these Exotic-defined engines free of stat compromise.

---

## 5. Survivability stacking — the golden rule

**Two separate systems — never sum them:**
1. **Damage Resistance (DR)** stacks **multiplicatively:** `Total = 1 − [(1−A)(1−B)(1−C)…]`. So 30% + 45% ≠ 75%; it's `1−(0.70×0.55)=61.5%`. Diminishing returns are steep.
2. **Sustain (healing)** out-heals damage; same-type heals take the **higher** value (Restoration ×2 > ×1, not additive); different mechanisms (Restoration + Cure + Healing Rift) layer freely.

| DR source | PvE DR | Notes |
|---|---|---|
| Baseline | **30%** | Free, always on. Everything multiplies on top. |
| Woven Mail (Strand) | ~45% | **Ignores precision & melee dmg** (GM gap). |
| Frost Armor (Stasis) | ~35% @5 stacks | **BUFFED + now decays one stack at a time.** |
| Void Overshield | 50% while HP lasts | Burst buffer, not sustained. |
| The Stag (in rift) | 25% to you + allies | Not in Well. |
| Chest resist mods | 25% (1) / 40% (2) | Per damage category, multiplicative. |

**Sustain:** Restoration **35 HP/s** (×2 = 50), heals *through* fire — its defining GM strength. **Devour** heals on kill (capped 100 HP, **full bar with Feed the Void**) + grenade energy. **Healing Rift** HoT. **Phoenix Dive** (Solar on-demand heal + loop).

**Near-unkillable formula:** multiplicative DR floor (≥70%) × a heal that runs through fire (Restoration/Devour/rift) × an overshield/Frost-Armor buffer for spikes. Anchor example: `30% × Woven Mail 45% × resist 40% × Stag 25% = 82.7%` in-rift, healing the whole time.

> ⚠️ The Restoration/Devour nerf values are from **Update 7.3.0 (Nov 2023)** — current baseline, NOT a MoT change. Frost Armor's exact per-stack % is the **highest-priority verify** this patch.

---

## 6. Damage stacking — one buff × one debuff × surge × perks

Outgoing damage is a **product of independent buckets.** Within a bucket only the **highest** applies; across buckets they **multiply.**

```
Total ≈ [best empowering buff] × [best true debuff] × [highest surge tier]
        × [weapon perks] × [super-dmg buff if super] (+ additive procs: ignite/jolt/shatter/tangle)
```

- **Empowering buffs (one bucket — highest wins):** Well **+25%**, Empowering Rift **+20%**, Radiant **+20%**, Banner Shield **+40%**. → Standing in your own Well, Empowering Rift/Radiant add **nothing** on top. If a Titan drops Banner Shield (40%), use **Healing** Rift instead.
- **Surge mods (separate bucket):** +11/17/22% at 1/2/3. **"Surges after Super" is now baseline** — post-super you gain matching-element surges for free.
- **Debuffs (one bucket on the target — highest wins):** **Tractor Cannon / Shadowshot +30%** (strongest) > Weaken **+15%** = Divinity **+15%**.
- **NOT debuffs — additive damage procs that *don't compete*:** Jolt, Ignition, Shatter, Tangle deal their own bonus damage on top. So you can run Radiant (buff) + teammate Weaken (debuff) + stacked Ignitions (additive) simultaneously.
- **Super-damage buffs (own bucket):** **Star-Eater Scales +18.2%→+70%** multiplies on top of Well/debuff. ⚠️ Star-Eater (legs) and Skull (Nova) **compete for the legs slot** — pick burst-combo vs +super damage.

⚠️ MoT: **Rocket Pulse Rifles nerfed** (damage, blast, super gen) — drop them. **Gjallarhorn / Bipod rockets** recommended. Primaries buffed globally (+30–40% vs minors).

---

## 7. Anti-Champion 2.0 (champion stun is now weapon-frame-based)

All anti-champ mods removed from the Artifact. **Your weapon frame decides what you stun** — automatic on hit, no mod, no buff to pre-activate. Check the new **Anti-Champion tooltip** on the Character screen.

| Champion | Weapon frames | Subclass verbs that still stun |
|---|---|---|
| **Barrier** | Precision, Adaptive, Caster sword, Disruption snipers | Radiant, Volatile, **Unravel** |
| **Overload** | Lightweight, Rapid-Fire, Support autos, Area-Denial GLs | **Jolt, Suppress, Slow** |
| **Unstoppable** | Aggressive, High-Impact, Wave-frame, rockets | **Ignition, Suspend, Blind, Freeze/Shatter** |

Mnemonic: **slow/heavy = Unstoppable, precise/mid = Barrier, fast/light = Overload.**
⚠️ **Volatile Rounds & Radiant no longer stun Barrier** (now +10% champ dmg) — bring a Barrier *frame* weapon. **Scorch/Sever don't stun** (scorch must build to an Ignition). **Shatter now stuns Unstoppable** (reverted from Overload) — verify in-game.

Warlock hits all three types naturally (Suppress/Ignite/Jolt/Freeze/Suspend) so the subclass verb is "free redundancy" on top of frames — which rewards ability-uptime exotics more than ever.

---

## 8. Elemental verb cheat sheet (what actually changed)

1. **Frost Armor:** decays one stack at a time; 5-stack DR ~31→35%. (Bleak Watcher uplift.)
2. **Jolt via Arc Soul/turret:** new **4s internal cooldown** (Getaway Artist, Facet of Dominance, Stormcaller souls).
3. **Collective Action artifact perk** rework: pickup-scaled duration (Firesprite/Void Breach 8s; Ionic/Stasis/Tangle 4s), PvE bonus 20→30%. *(NOT a universal verb change — common misread.)*
4. **Artifact elemental orbs** now count as elemental pickups + feed Transcendence; **Facet of Honor Arc-orb bug fixed** (now grants Light).
5. **Astrocyte Verse:** blink now also grants **Volatile Rounds.**
6. **Dawn Chorus:** more ignition damage + melee energy on ignition; Daybreak ignites.
7. **Crown of Tempests:** Conduction Tines 7→10s; **Mantle of Battle Harmony:** triggers on sustained damage now.
8. Blind duration up on some PvE sources (~5→10s).

Base verb definitions (devour, weaken, radiant, suspend, etc.) are **unchanged** — durations/values not touched.

---

## 9. Mod packages by archetype (with the *why*)

**Harmonic Siphon (1 energy) anchors every build** — orbs are the universal currency feeding Surges, Fonts, and all pickup mods. Drop it last.

### A. Ability-spam / ad-clear
Helmet: Harmonic Siphon ×2 · Arms: Grenade Kickstart ×2 · Chest: Concussive Dampener + Ammo Gen · Legs: Surge ×2 + Innervation · Class: Bomber + Distribution.
**Stats:** Class 100 → Grenade 100 → Health 70 → spare into Grenade>100. **Demolitionist/Siegebreaker.**
*Why:* Siphons turn constant kills into orbs → Innervation refunds grenade + arms Surges; Kickstart/Bomber/Distribution top off on every cast and orb — a closed loop replacing the removed cooldown. Grenade>100 buys +65% per grenade.

### B. Boss DPS
Helmet: Harmonic Siphon + Heavy Finder · Arms: Font of Wisdom (Super) + Heavy Loader · Chest: Ammo Gen + Unflinching · Legs: Surge ×2 (heavy's element) · Class: Reaper + Distribution.
**Stats:** Weapons>100 → Super>100 → Class 70 → Health 60. **Powerhouse/Colossus.**
*Why:* Surge is the highest sustained weapon multiplier; Weapons>100 stacks boss dmg + double heavy ammo. Since boss-damage super was cut 60%, Font of Wisdom + Super>100 (+45%) makes the *one* super you get hit harder rather than chasing extra casts.

### C. Support / healing (Speaker's Sight, Boots of the Assembler)
Helmet: Harmonic Siphon · Arms: Font of Vigor + Momentum Transfer · Chest: Concussive + Unflinching · Legs: Recuperation + Better Already + Absolution · Class: Bomber + Outreach.
**Stats:** Class>100 (Rift uptime + overshield) → Health 100 (max orb heal) → Grenade 70. **Bulwark/Reaver.**
*Why:* Both exotics turn class-ability casts into team healing orbs, so the kit recasts the class ability constantly (Bomber + Outreach + high Class), each cast adding an overshield. Health 100 maxes the ~70 HP every orb heals; Recuperation/Absolution convert the orb flood into team sustain + energy. Self-reinforcing, no aiming required.

### D. Max-survivability GM
Helmet: Harmonic Siphon · Arms: Font of Vigor + Grenade Kickstart · Chest: Concussive Dampener ×3 + Unflinching ×2 · Legs: Recuperation + Better Already + Stacks on Stacks · Class: Bomber + Reaper.
**Stats:** Health 100 → Class>100 (overshield) → Weapons 70. **Bulwark.**
*Why:* Front-loads Health (orb heal + shields) and Class>100 (recastable overshield); Recuperation/Better Already heal on every orb; Concussive + double Unflinching keep you alive and accurate through chip damage; Stacks on Stacks holds Armor Charge so Fonts/heals stay up.

### E. Champion-focused
Helmet: Harmonic Siphon + stun-weapon Targeting · Arms: Loader (stun weapon) + Grenade Kickstart · Chest: Unflinching ×2 + Ammo Gen · Legs: Surge ×2 (stun weapon) + Ammo Finder · Class: Distribution + Bomber.
**Stats:** Weapons 100 → Grenade/Super 100 → Health 70. **Gunner/Specialist.**
*Why:* With stun now frame-based, the kit keeps your stun weapon reliably online — Loader + Ammo Gen + Surge keep it loaded/fed/hard-hitting; double Unflinching stops champion flinch breaking the stun window; Weapons high adds damage-to-majors (champions are majors).

---

## 10. Verify-in-game checklist (re-tuned this patch)
1. **Frost Armor** per-stack % and Whisper of Rime max stacks/DR (highest priority).
2. **Chest resist mod** magnitudes (25%/40% vs old 15%).
3. **Over-100 secondary %s** (+65 grenade / +45 super / +30 melee — stated maxes).
4. **Surge mod %s** (11/17/22 may have shifted) + the new post-super passive surge value.
5. **Stasis Shatter** champion target (Unstoppable per patch line vs Overload per one KB).
6. Health-stat orb/shield breakpoints (~70 HP/orb, +20 shield).

## Key sources
Bungie 9.7.0 patch notes & Support Guide · Titanquisitor 9.7.0 breakdown + Dev Insights · Kyber's Corner MoT Guide + Sandbox Preview · GameRiv patch notes · Epiccarry Build-Crafting Guide · TheGamer Armor 3.0 + Buffs/Debuffs · Boosting-Ground Armor 3.0 · Blueberries.gg Buffs/Debuffs · zLeague DR comparison · light.gg (mods/exotics) · Boostmatch (Soul Siphon, Double Nova).
