const fs=require("fs");
const snap=JSON.parse(fs.readFileSync("/tmp/profile-snap.json","utf8")).Response;
const M=JSON.parse(fs.readFileSync("/tmp/d2items.json","utf8"));
const los=JSON.parse(fs.readFileSync("/tmp/verify21.json","utf8")).loadouts;
const stats=snap.itemComponents.stats.data;
const SH={2996146975:"W",392767087:"H",1943323491:"C",1735777505:"G",144602215:"S",4244567218:"M"};
const ORDER=["W","H","C","G","S","M"];
const TGT={
 "Soul Siphon Voidwalker — Double Nova":["M","C","S"],
 "Triple-Detonation Ahamkara":["S","C","G"],
 "Abyssal Extractors — Nezarec's Sin":["C","H","M"],
 "Plaguebearer's Weave — Necrotic+Osteo":["H","C","G"],
 "Threadling Nest Broodweaver — Necrotic":["C","G","H"],
 "Threadweaver's Loom — Swarm":["C","H","G"],
 "Stylostixis Suspend Engine — Mataiodoxia":["C","M","G"],
 "Busted Buddies — Getaway Prismatic":["C","G","H"],
 "Getaway Twin Turrets — Prismatic":["C","G","H"],
 "Apotheosis Eater — Solipsism Prismatic":["S","H","C"],
 "Permafrost Bleak Watcher — Osmiomancy":["C","H","G"],
 "Permafrost Sentinel — Rime-Coat":["H","C","G"],
 "Eternal Embers — Dawn Chorus Ignition":["G","C","H"],
 "Starfire Nuke — Fusion DPS":["G","C","S"],
 "Consul's Artillery — Hellion Eunoia":["C","G","S"],
 "Stormwrath — Geomag Chaos Reach":["S","C","H"],
 "Rain of Fire — Fusion Trinity":["W","C","S"],
 "The Last Well — Lunafaction":["S","C","W"],
 "Speaker's Sight — Twin Healing Turrets":["C","H","S"],
 "Noble Sanctuary — Boots of the Assembler":["C","H","G"],
 "Gravekeeper — Cenotaph Ammo Battery":["C","H","S"],
};
function spread(lo){const t={W:0,H:0,C:0,G:0,S:0,M:0};for(const e of lo.equipped){const d=M[e.hash];if(!d||d.itemType!==2||!e.id)continue;const st=stats[e.id]&&stats[e.id].stats||{};for(const h in st){const k=SH[h];if(k){const v=st[h];t[k]+=(typeof v==="number")?v:(v.value||0);}}}return t;}
console.log("Build".padEnd(40),"  W  H  C  G  S  M | tot | targets");
console.log("-".repeat(78));
for(const lo of los){
  const t=spread(lo);const tot=ORDER.reduce((a,k)=>a+t[k],0);
  const tg=TGT[lo.name.trim()]||[];
  const hit=tg.map(k=>{const v=t[k];return k+(v>=90?"✓":v>=70?"~":"✗")+v;}).join(" ");
  const row=ORDER.map(k=>String(t[k]).padStart(3)).join("");
  console.log(lo.name.trim().slice(0,38).padEnd(40),row," |",String(tot).padStart(3),"|",hit);
}
console.log("\nLegend: stat values are RAW ARMOR only (5 pieces). check = 90+, ~ = 70-89, x = under 70.");
console.log("Mods + tuning slot + over-100 from a Font add ~10-30 more to your chosen stats on top.");
