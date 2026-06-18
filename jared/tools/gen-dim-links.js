// Generates DIM loadout-share links for all 19 builds from the live Bungie manifest.
// Usage: node --max-old-space-size=3500 gen-dim-links.js /tmp/d2items.json
const fs = require('fs');

const WARLOCK = 2;
const BUILDS = [
  { file: 'builds/subclasses/solar-dawnblade.md', name: 'Eternal Embers — Dawn Chorus Ignition', sub: 'Dawnblade', sup: 'Daybreak', cls: 'Healing Rift', gren: 'Fusion Grenade', melee: 'Incinerator Snap', aspects: ['Touch of Flame', 'Heat Rises'], frags: ['Ember of Ashes', 'Ember of Searing', 'Ember of Torches', 'Ember of Empyrean'], armor: 'Dawn Chorus', weapons: [] },
  { file: 'builds/subclasses/arc-stormcaller.md', name: 'Stormwrath — Geomag Chaos Reach', sub: 'Stormcaller', sup: 'Chaos Reach', cls: 'Healing Rift', gren: 'Storm Grenade', melee: 'Ball Lightning', aspects: ['Electrostatic Mind', 'Ionic Sentry'], frags: ['Spark of Ions', 'Spark of Discharge', 'Spark of Amplitude', 'Spark of Magnitude', 'Spark of Beacons'], armor: 'Geomag Stabilizers', weapons: [] },
  { file: 'builds/subclasses/void-voidwalker.md', name: 'Soul Siphon Voidwalker — Double Nova', sub: 'Voidwalker', sup: 'Nova Bomb: Cataclysm', cls: 'Healing Rift', gren: 'Vortex Grenade', melee: 'Pocket Singularity', aspects: ['Soul Siphon', 'Feed the Void'], frags: ['Echo of Provision', 'Echo of Harvest', 'Echo of Instability', 'Echo of Starvation', 'Echo of Undermining'], armor: 'Skull of Dire Ahamkara', weapons: ['Bad Juju'] },
  { file: 'builds/subclasses/stasis-shadebinder.md', name: 'Permafrost Bleak Watcher — Osmiomancy', sub: 'Shadebinder', sup: "Winter's Wrath", cls: 'Healing Rift', gren: 'Coldsnap Grenade', melee: 'Penumbral Blast', aspects: ['Bleak Watcher', 'Glacial Harvest'], frags: ['Whisper of Rime', 'Whisper of Chains', 'Whisper of Fissures', 'Whisper of Shards'], armor: 'Osmiomancy Gloves', weapons: [] },
  { file: 'builds/subclasses/strand-broodweaver.md', name: 'Threadling Nest Broodweaver — Necrotic', sub: 'Broodweaver', sup: 'Needlestorm', cls: 'Healing Rift', gren: 'Threadling Grenade', melee: 'Arcane Needle', aspects: ['Mindspun Invocation', "Weaver's Call"], frags: ['Thread of Evolution', 'Thread of Generation', 'Thread of Warding', 'Thread of Fury', 'Thread of Rebirth'], armor: 'Necrotic Grip', weapons: ['Service of Luzaku'] },
  { file: 'builds/subclasses/prismatic.md', name: 'Busted Buddies — Getaway Prismatic', sub: 'Prismatic Warlock', sup: 'Needlestorm', cls: 'Healing Rift', gren: 'Storm Grenade', melee: 'Arcane Needle', aspects: ['Bleak Watcher', 'Hellion'], frags: ['Facet of Courage', 'Facet of Balance', 'Facet of Awakening', 'Facet of Dominance'], armor: 'Getaway Artist', weapons: [] },
  { file: 'builds/exotic-helpers/speakers-sight.md', name: "Speaker's Sight — Twin Healing Turrets", sub: 'Dawnblade', sup: 'Well of Radiance', cls: 'Phoenix Dive', gren: 'Healing Grenade', melee: 'Incinerator Snap', aspects: ['Touch of Flame', 'Icarus Dash'], frags: ['Ember of Benevolence', 'Ember of Torches', 'Ember of Empyrean', 'Ember of Mercy'], armor: "Speaker's Sight", weapons: [] },
  { file: 'builds/exotic-helpers/boots-of-the-assembler.md', name: 'Noble Sanctuary — Boots of the Assembler', sub: 'Dawnblade', sup: 'Well of Radiance', cls: 'Healing Rift', gren: 'Healing Grenade', melee: 'Incinerator Snap', aspects: ['Touch of Flame', 'Heat Rises'], frags: ['Ember of Benevolence', 'Ember of Torches', 'Ember of Mercy', 'Ember of Searing'], armor: 'Boots of the Assembler', weapons: ['Lumina'] },
  { file: 'builds/exotic-helpers/getaway-artist.md', name: 'Getaway Twin Turrets — Prismatic', sub: 'Prismatic Warlock', sup: 'Song of Flame', cls: 'Healing Rift', gren: 'Storm Grenade', melee: 'Arcane Needle', aspects: ['Bleak Watcher', 'Feed the Void'], frags: ['Facet of Courage', 'Facet of Dominance', 'Facet of Protection', 'Facet of Mending'], armor: 'Getaway Artist', weapons: [] },
  { file: 'builds/exotic-helpers/mataiodoxia.md', name: 'Stylostixis Suspend Engine — Mataiodoxia', sub: 'Broodweaver', sup: 'Needlestorm', cls: 'Healing Rift', gren: 'Shackle Grenade', melee: 'Arcane Needle', aspects: ['Mindspun Invocation', 'The Wanderer'], frags: ['Thread of Warding', 'Thread of Continuity', 'Thread of Generation', 'Thread of Fury'], armor: 'Mataiodoxía', weapons: ['Monte Carlo'] },
  { file: 'builds/exotic-helpers/starfire-protocol.md', name: 'Starfire Nuke — Fusion DPS', sub: 'Dawnblade', sup: 'Well of Radiance', cls: 'Empowering Rift', gren: 'Fusion Grenade', melee: 'Incinerator Snap', aspects: ['Touch of Flame', 'Heat Rises'], frags: ['Ember of Ashes', 'Ember of Singeing', 'Ember of Torches', 'Ember of Searing'], armor: 'Starfire Protocol', weapons: [] },
  { file: 'builds/exotic-helpers/nezarecs-sin.md', name: "Abyssal Extractors — Nezarec's Sin", sub: 'Voidwalker', sup: 'Nova Bomb: Cataclysm', cls: 'Healing Rift', gren: 'Vortex Grenade', melee: 'Pocket Singularity', aspects: ['Soul Siphon', 'Child of the Old Gods'], frags: ['Echo of Undermining', 'Echo of Remnants', 'Echo of Starvation', 'Echo of Expulsion', 'Echo of Instability'], armor: "Nezarec's Sin", weapons: [] },
  { file: 'builds/exotic-helpers/stasis-turret-rime-coat-osmiomancy.md', name: 'Permafrost Sentinel — Rime-Coat', sub: 'Shadebinder', sup: "Winter's Wrath", cls: 'Healing Rift', gren: 'Coldsnap Grenade', melee: 'Penumbral Blast', aspects: ['Bleak Watcher', 'Glacial Harvest'], frags: ['Whisper of Shards', 'Whisper of Rending', 'Whisper of Chains', 'Whisper of Fissures'], armor: 'Rime-Coat Raiment', weapons: [] },
  { file: 'builds/exotic-helpers/prismatic-exotic-class-item.md', name: 'Apotheosis Eater — Solipsism Prismatic', sub: 'Prismatic Warlock', sup: 'Nova Bomb: Cataclysm', cls: 'Healing Rift', gren: 'Vortex Grenade', melee: 'Arcane Needle', aspects: ['Hellion', 'Feed the Void'], frags: ['Facet of Purpose', 'Facet of Dawn', 'Facet of Courage', 'Facet of Protection'], armor: 'Solipsism', weapons: [] },
  { file: 'builds/exotic-helpers/skull-double-nova-bomb.md', name: 'Triple-Detonation Ahamkara', sub: 'Voidwalker', sup: 'Nova Bomb: Cataclysm', cls: 'Empowering Rift', gren: 'Vortex Grenade', melee: 'Pocket Singularity', aspects: ['Feed the Void', 'Soul Siphon'], frags: ['Echo of Instability', 'Echo of Undermining', 'Echo of Persistence', 'Echo of Harvest', 'Echo of Reprisal'], armor: 'Skull of Dire Ahamkara', weapons: ['Bad Juju'] },
  { file: 'builds/exotic-helpers/well-team-dps-lunafaction.md', name: 'The Last Well — Lunafaction', sub: 'Dawnblade', sup: 'Well of Radiance', cls: 'Empowering Rift', gren: 'Healing Grenade', melee: 'Incinerator Snap', aspects: ['Touch of Flame', 'Icarus Dash'], frags: ['Ember of Benevolence', 'Ember of Torches', 'Ember of Empyrean', 'Ember of Solace'], armor: 'Lunafaction Boots', weapons: [] },
  { file: 'builds/exotic-helpers/threadling-weavers-call-boots.md', name: "Threadweaver's Loom — Swarm", sub: 'Broodweaver', sup: 'Needlestorm', cls: 'Healing Rift', gren: 'Threadling Grenade', melee: 'Arcane Needle', aspects: ["Weaver's Call", 'Mindspun Invocation'], frags: ['Thread of Rebirth', 'Thread of Warding', 'Thread of Generation', 'Thread of Evolution', 'Thread of Continuity'], armor: 'Boots of the Assembler', weapons: ['Service of Luzaku'] },
  { file: 'builds/exotic-helpers/hellion-eunoia-phoenix-dive.md', name: "Consul's Artillery — Hellion Eunoia", sub: 'Dawnblade', sup: 'Song of Flame', cls: 'Phoenix Dive', gren: 'Fusion Grenade', melee: 'Incinerator Snap', aspects: ['Hellion', 'Touch of Flame'], frags: ['Ember of Ashes', 'Ember of Char', 'Ember of Singeing', 'Ember of Eruption'], armor: 'Eunoia', weapons: [] },
  { file: 'builds/exotic-helpers/necrotic-osteo-striga.md', name: "Plaguebearer's Weave — Necrotic+Osteo", sub: 'Broodweaver', sup: 'Needlestorm', cls: 'Healing Rift', gren: 'Shackle Grenade', melee: 'Arcane Needle', aspects: ['Mindspun Invocation', 'The Wanderer'], frags: ['Thread of Continuity', 'Thread of Generation', 'Thread of Mind', 'Thread of Binding'], armor: 'Necrotic Grip', weapons: ['Osteo Striga'] },
];

console.error('loading manifest...');
const raw = JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/d2items.json', 'utf8'));
const byHash = raw;
const byName = {};
for (const h of Object.keys(raw)) {
  const d = raw[h];
  const n = d.displayProperties && d.displayProperties.name;
  if (!n) continue;
  (byName[n.toLowerCase()] = byName[n.toLowerCase()] || []).push(d);
}
console.error('indexed', Object.keys(byName).length, 'names');

const warn = [];
function findSubclass(name) {
  const c = (byName[name.toLowerCase()] || []).filter(d => d.itemType === 16 && d.classType === WARLOCK);
  return c[0];
}
function findArmor(name) {
  const c = (byName[name.toLowerCase()] || []).filter(d => d.itemType === 2 && d.inventory && d.inventory.tierType === 6);
  return c.find(d => d.classType === WARLOCK) || c[0];
}
function findWeapon(name) {
  const c = (byName[name.toLowerCase()] || []).filter(d => d.itemType === 3);
  return c.find(d => d.inventory && d.inventory.tierType === 6) || c[0];
}

function buildLoadout(b) {
  const sub = findSubclass(b.sub);
  if (!sub) { warn.push(`${b.name}: SUBCLASS NOT FOUND: ${b.sub}`); return null; }
  // map socket index -> plugCategoryIdentifier of its initial plug
  const sockets = (sub.sockets ? sub.sockets.socketEntries : []).map((se, i) => {
    const init = byHash[se.singleInitialItemHash];
    return { i, pci: init && init.plug ? init.plug.plugCategoryIdentifier : null };
  });
  const usedSockets = new Set();
  const overrides = {};
  const ALIAS = { 'warlock.stasis.totems': 'warlock.shared.aspects', 'shared.stasis.trinkets': 'shared.fragments' };
  function place(plugName, kind) {
    const cands = (byName[plugName.toLowerCase()] || []).filter(d => d.plug && d.plug.plugCategoryIdentifier);
    for (const cand of cands) {
      const want = [cand.plug.plugCategoryIdentifier, ALIAS[cand.plug.plugCategoryIdentifier]].filter(Boolean);
      const s = sockets.find(s => want.includes(s.pci) && !usedSockets.has(s.i));
      if (s) { usedSockets.add(s.i); overrides[s.i] = cand.hash; return true; }
    }
    if (kind === 'grenade' && cands.length) {
      // Voidwalker's grenade socket has no initial plug — fall back to the empty-pci socket
      const s = sockets.find(s => !s.pci && !usedSockets.has(s.i));
      const cand = cands.find(c => !c.plug.plugCategoryIdentifier.includes('prism')) || cands[0];
      if (s) { usedSockets.add(s.i); overrides[s.i] = cand.hash; return true; }
    }
    warn.push(`${b.name}: could not place ${kind} "${plugName}" (candidates: ${cands.map(c => c.plug.plugCategoryIdentifier).join(', ') || 'none'})`);
    return false;
  }
  place(b.cls, 'class ability');
  place(b.sup, 'super');
  place(b.gren, 'grenade');
  place(b.melee, 'melee');
  for (const a of b.aspects) place(a, 'aspect');
  for (const f of b.frags) place(f, 'fragment');

  const equipped = [{ hash: sub.hash, socketOverrides: overrides }];
  const armor = findArmor(b.armor);
  if (armor) equipped.push({ hash: armor.hash }); else warn.push(`${b.name}: exotic armor not found: ${b.armor}`);
  for (const w of b.weapons) {
    const wd = findWeapon(w);
    if (wd) equipped.push({ hash: wd.hash }); else warn.push(`${b.name}: weapon not found: ${w}`);
  }
  return { name: b.name, classType: WARLOCK, clearSpace: false, parameters: {}, equipped, unequipped: [] };
}

const out = [];
out.push('# DIM Import Links — One-Click Loadouts');
out.push('');
out.push('> Open a link → DIM shows an import preview → save it to your Warlock. Links encode the **subclass config (super, abilities, aspects, fragments) + exotic armor + signature exotic weapon** by manifest hash; DIM resolves them to your own copies. Armor mods and legendary weapons are listed in each build file — add those in DIM after import (mod names are account-agnostic but DIM only applies mods you own).');
out.push('');
const sidecar = [];
for (const b of BUILDS) {
  const lo = buildLoadout(b);
  if (!lo) continue;
  const url = 'https://app.destinyitemmanager.com/loadouts?loadout=' + encodeURIComponent(JSON.stringify(lo));
  sidecar.push({ file: b.file, name: b.name, loadout: lo, url });
  out.push(`## ${b.name}`);
  out.push(`*File:* \`${b.file}\``);
  out.push(`[**→ Import to DIM**](${url})`);
  out.push('');
}
if (warn.length) {
  out.push('---');
  out.push('## ⚠ Resolution warnings (verify these pieces manually in DIM)');
  for (const w of warn) out.push('- ' + w);
}
fs.writeFileSync('/root/d2-warlock-monument/dim-import.md', out.join('\n') + '\n');
fs.writeFileSync('/root/d2-warlock-monument/tools/dim-loadouts.json', JSON.stringify(sidecar, null, 1));
// armor-mod name -> hash lookup for the enrichment agents
const mods = {};
for (const h of Object.keys(byHash)) {
  const d = byHash[h];
  const p = d.plug && d.plug.plugCategoryIdentifier;
  if (p && p.startsWith('enhancements.') && d.displayProperties && d.displayProperties.name) {
    (mods[d.displayProperties.name] = mods[d.displayProperties.name] || []).push({ hash: d.hash, pci: p });
  }
}
fs.writeFileSync('/root/d2-warlock-monument/tools/mod-hashes.json', JSON.stringify(mods));
console.error('WROTE dim-import.md with', BUILDS.length, 'builds;', warn.length, 'warnings');
warn.forEach(w => console.error('WARN:', w));
