// Injects a `notes` field (weapons + gameplay loop) into every DIM loadout link.
// Rebuilds links from tools/enriched/*.json (clean sources) and escapes ()' for markdown safety.
const fs = require('fs');
const path = require('path');
const ROOT = '/root/d2-warlock-monument';

const NOTES = {
  'Eternal Embers — Dawn Chorus Ignition': 'Weapons: Incandescent Solar primaries + Solar Wave-Frame GL (Demolitionist) + Solar heavy. Loop: scorch everything (Fusion Grenade + Incinerator Snap) → ignitions chain through packs → Ember of Torches keeps you Radiant → Daybreak ignites on hit for room resets.',
  'Stormwrath — Geomag Chaos Reach': 'Weapons: Arc primary (Jolting Feedback) + Arc special + rocket/LMG heavy. Loop: abilities + Ionic Sentry jolt the room → collect Ionic Traces (Amplified + ability energy) → Geomag-extended Chaos Reach beam for boss DPS. Healing Rift anchor, no swapping.',
  'Soul Siphon Voidwalker — Double Nova': 'Weapons: Bad Juju + Void primary (Destabilizing) + Void heavy. Loop: Vortex Grenade (Weaken + Volatile) → clear with Bad Juju under Devour (refunds super) → Pocket Singularity readies Soul Siphon (overshield + rift energy) → Nova Cataclysm + free Lance = triple detonation. Repeat ~15s.',
  'Permafrost Bleak Watcher — Osmiomancy': 'Weapons: Headstone Stasis primary + Kinetic special + heavy matched to champions. Loop: Coldsnap (Osmiomancy refunds it) → hold grenade = Bleak Watcher turret → freeze packs → shatter → Stasis Shards = Frost Armor + grenade energy. Penumbral Blast seeds extra freezes.',
  'Threadling Nest Broodweaver — Necrotic': 'Weapons: Service of Luzaku MG / The Call (Hatchling + Slice) / Final Warning; Lost Signal (Stasis ADGL) for pure zone control. Loop: Rift = Weaver’s Call threadlings → hold grenade = Threadling Nest turret → Arcane Needle spreads Necrotic poison + Unravel → swarm wipes the room; orb pickups = Woven Mail.',
  'Busted Buddies — Getaway Prismatic': 'Weapons: flexible; an Arc primary feeds Facet of Dominance jolt. Loop: hold Storm Grenade → Getaway Arc Soul + Bleak Watcher turret together → Healing Rift summons Hellion (three buddies up) → buddies clear while you proc Facets → Needlestorm for bosses.',
  "Speaker's Sight — Twin Healing Turrets": 'Weapons: Solar primaries (Incandescent; Lumina optional) + flex heavy. Loop: Healing Grenade = healing turret → heals proc Ember of Benevolence (huge regen) → grenade back almost instantly → Torches melee keeps Radiant → Phoenix Dive overshield. Well of Radiance for damage phases.',
  'Noble Sanctuary — Boots of the Assembler': 'Weapons: Lumina + Solar legendaries + Solar Wave-Frame GL. Loop: stand in Healing Rift → Noble Seekers fly out to heal allies and extend your rift → Healing Grenades (Touch of Flame) + Torches keep Benevolence regen rolling → Well of Radiance for DPS phases.',
  'Getaway Twin Turrets — Prismatic': 'Weapons: any; Arc primary feeds Dominance jolt. Loop: hold Storm Grenade → Sentient Arc Soul + Bleak Watcher turret → Feed the Void Devour heals on every ability kill → turrets fight while you reposition → Song of Flame for team DPS windows.',
  'Stylostixis Suspend Engine — Mataiodoxia': 'Weapons: Monte Carlo (refunds Arcane Needle) or The Call; Strand heavy for bosses. Loop: two Arcane Needles = instant suspend → consume Shackle (Mindspun) for Weaver’s Trance (kills emit suspending bursts) → Wanderer Tangles chain the CC → suspended kills refund melee/rift → Needlestorm burst.',
  'Starfire Nuke — Fusion DPS': 'Weapons: Solar primary for empowered hits + Wave-Frame GL + big DPS heavy. Loop: get Radiant (precision hits / Torches) → Empowering Rift → Fusion Grenades double-detonate (Touch of Flame) → weapon hits while Radiant refund grenade energy → grenade kills refund the rift. Sustained boss DPS.',
  "Abyssal Extractors — Nezarec's Sin": 'Weapons: Void weapons (Volatile Rounds via Echo of Instability). Loop: Healing Rift spawns Child of the Old Gods (weakens + returns energy) → Vortex weaken pools (Echo of Remnants) → Pocket Singularity readies Soul Siphon → Nezarec’s ability-kill regen keeps every cooldown spinning.',
  'Permafrost Sentinel — Rime-Coat': 'Weapons: Kinetic/Stasis primaries (Whisper of Rending) + heavy matched to champions. Loop: keep Bleak Watcher up → Rime-Coat storm slows everything near you → freeze → shatter (Fissures/Shards bonuses) → shards = Frost Armor. Hold the zone; nothing gets to move.',
  'Apotheosis Eater — Solipsism Prismatic': 'Weapons: reload-perk rockets (Bait and Switch / Demolitionist) + flexible primaries. Loop: farm orbs (Facet of Purpose overshield + Star-Eater stacks) → keep collecting past full to overcharge → debuff the boss → overcharged Nova Cataclysm → Apotheosis window: ~10s of near-instant grenades/melee. Pick your own Solipsism roll (Apotheosis + Star-Eater).',
  'Triple-Detonation Ahamkara': 'Weapons: Bad Juju + Void legendary (Destabilizing/Repulsor Brace) + Void heavy. Loop: Empowering Rift → Vortex (Weaken + Volatile) → Bad Juju kills under Devour refund super → cast Cataclysm then fire the free Lance INTO it = triple detonation → Skull + Reprisal refund the super → again in ~15s.',
  'The Last Well — Lunafaction': 'Weapons: Loadout A = Tractor Cannon (you are the debuffer) · Loadout B = Apex Predator/Gjallarhorn + Bad Juju; Solar Wave GL utility. Loop: between phases farm adds (Benevolence + orbs build super) → DPS: Tractor weaken → drop Well on the stack point → team reloads fast inside Lunafaction rift → everyone dumps heavy.',
  "Threadweaver's Loom — Swarm": 'Weapons: Service of Luzaku (heal-MG, plants Threadling Nests) + The Call + Strand special. Loop: Luzaku kills plant nests → Healing Rift = Weaver’s Call volley + Boots’ Noble Seekers (team heals + rift extension) → charged Threadling Grenade = nest turret → three swarm sources run while you anchor.',
  "Consul's Artillery — Hellion Eunoia": 'Weapons: all Solar — Polaris Lance/Sunshot + Solar Wave-Frame GL + Solar heavy. Loop: Phoenix Dive summons Hellion → Eunoia shrapnel blankets scorch at 17m+ → ignitions spawn Firesprites → Ember of Singeing + sprite pickups bring the dive right back → dive again. No rift at all.',
  "Plaguebearer's Weave — Necrotic+Osteo": 'Weapons: Osteo Striga + The Call + Strand/Void heavy for bosses. Loop: Healing Rift on a chokepoint → Shackle Grenade = suspend + Weaver’s Trance → Osteo poison rides every bullet (Necrotic spreads it on death) → the chain wipes the room while Trance suspends survivors → throw Tangles to re-suspend the next pack.',
};

const safeEncode = s => encodeURIComponent(s).replace(/[()'!*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());

// Build name->final URL from the enriched sidecars (clean, notes-free sources)
const enrichedDir = path.join(ROOT, 'tools/enriched');
const finalLinks = []; // {file, name, url}
for (const f of fs.readdirSync(enrichedDir)) {
  if (!f.endsWith('.json')) continue;
  const rec = JSON.parse(fs.readFileSync(path.join(enrichedDir, f), 'utf8'));
  const enc = rec.url.slice(rec.url.indexOf('loadout=') + 8);
  const lo = JSON.parse(decodeURIComponent(enc));
  const note = NOTES[lo.name];
  if (!note) { console.error('NO NOTE for', lo.name); continue; }
  lo.notes = note;
  const url = 'https://app.destinyitemmanager.com/loadouts?loadout=' + safeEncode(JSON.stringify(lo));
  finalLinks.push({ file: rec.file, name: lo.name, url });
}

// Replace the DIM line in each build file
let updated = 0;
for (const rec of finalLinks) {
  const fp = path.join(ROOT, rec.file);
  let txt = fs.readFileSync(fp, 'utf8');
  const line = `**[📲 Import to DIM](${rec.url})** — subclass config + exotics + armor mods; loadout notes include weapons + gameplay loop.`;
  const re = /^\*\*\[📲 Import to DIM\]\(.*$/m;
  if (!re.test(txt)) { console.error('NO DIM LINE in', rec.file); continue; }
  txt = txt.replace(re, line);
  fs.writeFileSync(fp, txt);
  updated++;
}

// Rebuild dim-import.md
const out = ['# DIM Import Links — One-Click Loadouts', '',
  '> Open a link → DIM shows an import preview → save it to your Warlock. Each loadout carries the subclass config (super/abilities/aspects/fragments), exotic armor + signature exotic weapon, armor mods, **and a notes field with the weapon types + gameplay loop** (shown in DIM under the loadout). DIM resolves hashes to your own copies. Solipsism Spirit rolls can\'t be encoded — pick your own. Legendary weapon rolls are in each build file.', ''];
for (const rec of finalLinks.sort((a, b) => a.file.localeCompare(b.file))) {
  out.push(`## ${rec.name}`, `*File:* \`${rec.file}\``, `[**→ Import to DIM**](${rec.url})`, '');
}
fs.writeFileSync(path.join(ROOT, 'dim-import.md'), out.join('\n') + '\n');
console.log(`rebuilt ${updated} build files + dim-import.md (${finalLinks.length} links)`);
