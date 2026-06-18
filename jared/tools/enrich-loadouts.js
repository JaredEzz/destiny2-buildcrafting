// Enrich the 21 live DIM loadouts with pinned armor + weapons from the user's inventory.
const fs=require("fs"),https=require("https");
const M=JSON.parse(fs.readFileSync("/tmp/d2items.json","utf8"));
const snap=JSON.parse(fs.readFileSync("/tmp/profile-snap.json","utf8")).Response;
const live=JSON.parse(fs.readFileSync("/tmp/live21.json","utf8")).loadouts;
const TOKEN=fs.readFileSync("/root/.dim-token","utf8").trim(), KEY=fs.readFileSync("/root/.dim-apikey","utf8").trim();
const PID="4611686018495212620";
const BUCKET={3448274439:"Helmet",3551918588:"Arms",14239492:"Chest",20886954:"Legs",1585787867:"Class",1498876634:"Kinetic",2465295065:"Energy",953998645:"Power"};
const inst=snap.itemComponents.instances.data, stats=snap.itemComponents.stats.data, socks=snap.itemComponents.sockets.data;
let items=[...(snap.profileInventory.data.items||[])];
for(const c of Object.values(snap.characterInventories.data))items.push(...c.items);
for(const c of Object.values(snap.characterEquipment.data))items.push(...c.items);
const statTotal=id=>Object.values(stats[id]?.stats||{}).reduce((a,b)=>a+((typeof b==="number")?b:(b&&b.value)||0),0);
const archOf=id=>{for(const s of (socks[id]?.sockets||[])){const pd=M[s.plugHash];if(pd&&/archetype/i.test(pd.plug?.plugCategoryIdentifier||""))return pd.displayProperties.name;}return"-";};
// indexes
const armor=[],wepByName={},itemByHash={};
for(const it of items){const d=M[it.itemHash];if(!d||!it.itemInstanceId)continue;const slot=BUCKET[d.inventory?.bucketTypeHash];const id=it.itemInstanceId;
  itemByHash[it.itemHash]=itemByHash[it.itemHash]||[];itemByHash[it.itemHash].push({id,hash:it.itemHash,slot,tier:inst[id]?.gearTier??0,total:statTotal(id),exotic:d.inventory.tierType===6,name:d.displayProperties.name});
  if(d.itemType===2&&d.classType===2&&["Helmet","Arms","Chest","Legs","Class"].includes(slot))
    armor.push({slot,id,hash:it.itemHash,name:d.displayProperties.name,exotic:d.inventory.tierType===6,tier:inst[id]?.gearTier??0,total:statTotal(id),arch:archOf(id)});
  if(d.itemType===3){const n=d.displayProperties.name;(wepByName[n.toLowerCase()]=wepByName[n.toLowerCase()]||[]).push({id,hash:it.itemHash,slot,tier:inst[id]?.gearTier??0,exotic:d.inventory.tierType===6,name:n});}
}
const bestInstanceOfHash=h=>{const c=(itemByHash[h]||[]).slice().sort((a,b)=>b.tier-a.tier||b.total-a.total);return c[0];};
const bestWeapon=name=>{const c=(wepByName[(name||"").toLowerCase()]||[]).slice().sort((a,b)=>b.tier-a.tier);return c[0];};
function bestLegendary(slot,archPref,usedIds){
  const cands=armor.filter(a=>a.slot===slot&&!a.exotic&&!usedIds.has(a.id));
  cands.sort((a,b)=> b.tier-a.tier || (archPref.indexOf(b.arch)>-1?1:0)-(archPref.indexOf(a.arch)>-1?1:0) || b.total-a.total);
  // prefer archPref within top tier
  const topTier=cands[0]?.tier??0;
  const inPref=cands.filter(a=>a.tier===topTier&&archPref.includes(a.arch));
  return (inPref[0]||cands[0]);
}
// per-build intent keyed by loadout name: archetype preference + weapon wishlist (priority order)
const SURV=["Bulwark","Reaver","Siegebreaker","Brawler"],DPS=["Colossus","Powerhouse","Paragon"],GREN=["Demolitionist","Siegebreaker","Gunner"];
const BUILDS={
 "Soul Siphon Voidwalker — Double Nova":{arch:SURV,wep:["Bad Juju","Graviton Lance","Xenophage"]},
 "Triple-Detonation Ahamkara":{arch:DPS,wep:["Bad Juju","Xenophage"]},
 "Abyssal Extractors — Nezarec's Sin":{arch:SURV,wep:["Graviton Lance","Bad Juju"]},
 "Plaguebearer's Weave — Necrotic+Osteo":{arch:SURV,wep:["Osteo Striga","The Call"]},
 "Threadling Nest Broodweaver — Necrotic":{arch:SURV,wep:["Service of Luzaku","The Call","Final Warning"]},
 "Threadweaver's Loom — Swarm":{arch:SURV,wep:["Service of Luzaku","The Call"]},
 "Stylostixis Suspend Engine — Mataiodoxia":{arch:SURV,wep:["Monte Carlo","The Call"]},
 "Busted Buddies — Getaway Prismatic":{arch:GREN,wep:["Quicksilver Storm","Graviton Lance"]},
 "Getaway Twin Turrets — Prismatic":{arch:GREN,wep:["Quicksilver Storm"]},
 "Apotheosis Eater — Solipsism Prismatic":{arch:DPS,wep:["Apex Predator","Bad Juju"]},
 "Permafrost Bleak Watcher — Osmiomancy":{arch:SURV,wep:["Cold Comfort","Bad Juju"]},
 "Permafrost Sentinel — Rime-Coat":{arch:SURV,wep:["Lost Signal","Cold Comfort"]},
 "Eternal Embers — Dawn Chorus Ignition":{arch:GREN,wep:["Sunshot","Polaris Lance"]},
 "Starfire Nuke — Fusion DPS":{arch:GREN,wep:["Polaris Lance","Apex Predator"]},
 "Consul's Artillery — Hellion Eunoia":{arch:SURV,wep:["Polaris Lance","Sunshot"]},
 "Stormwrath — Geomag Chaos Reach":{arch:DPS,wep:["Quicksilver Storm","Apex Predator"]},
 "Rain of Fire — Fusion Trinity":{arch:DPS,wep:["Vex Mythoclast","Deliverance","Cataclysmic"]},
 "The Last Well — Lunafaction":{arch:DPS,wep:["Tractor Cannon","Apex Predator"]},
 "Speaker's Sight — Twin Healing Turrets":{arch:SURV,wep:["Lumina","Sunshot"]},
 "Noble Sanctuary — Boots of the Assembler":{arch:SURV,wep:["Lumina","Sunshot"]},
 "Gravekeeper — Cenotaph Ammo Battery":{arch:SURV,wep:["Acasia's Dejection","Divinity"]},
};
function post(updates){return new Promise((res,rej)=>{const body=JSON.stringify({platformMembershipId:PID,destinyVersion:2,updates});
  const req=https.request("https://api.destinyitemmanager.com/profile",{method:"POST",headers:{"Authorization":"Bearer "+TOKEN,"X-API-Key":KEY,"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)}},
  r=>{let d="";r.on("data",c=>d+=c);r.on("end",()=>res({code:r.statusCode,body:d}));});req.on("error",rej);req.write(body);req.end();});}
(async()=>{
 const report=[];
 for(const lo of live){
  const meta=BUILDS[lo.name.trim()];if(!meta){report.push(lo.name+": (no meta, skipped)");continue;}
  const eq=lo.equipped||[];
  const subclass=eq.find(e=>{const d=M[e.hash];return d&&d.itemType===16;});
  // identify exotic armor + exotic weapon already in loadout
  let exoArmor=null, exoWep=null;
  for(const e of eq){const d=M[e.hash];if(!d)continue;if(d.itemType===2&&d.inventory.tierType===6)exoArmor=e.hash;if(d.itemType===3&&d.inventory.tierType===6)exoWep=e.hash;}
  const used=new Set();const newEq=[];
  if(subclass)newEq.push(subclass);
  // armor: exotic in its slot + best legendary for other 4
  const armorSlots=["Helmet","Arms","Chest","Legs","Class"];
  let exoSlot=null;
  if(exoArmor){const ai=bestInstanceOfHash(exoArmor);if(ai){exoSlot=BUCKET[M[exoArmor].inventory.bucketTypeHash];used.add(ai.id);newEq.push({id:ai.id,hash:exoArmor});}}
  for(const s of armorSlots){if(s===exoSlot)continue;const a=bestLegendary(s,meta.arch,used);if(a){used.add(a.id);newEq.push({id:a.id,hash:a.hash});}}
  // weapons: signature exotic + wishlist, one per bucket, max one exotic
  const wslots={Kinetic:null,Energy:null,Power:null};let exoticWepUsed=false;
  const tryAdd=w=>{if(!w)return;if(wslots[w.slot])return;if(w.exotic&&exoticWepUsed)return;wslots[w.slot]={id:w.id,hash:w.hash};if(w.exotic)exoticWepUsed=true;};
  if(exoWep){const wi=bestInstanceOfHash(exoWep);if(wi){tryAdd({...wi,slot:wi.slot});}}
  for(const wn of meta.wep)tryAdd(bestWeapon(wn));
  for(const s of ["Kinetic","Energy","Power"])if(wslots[s])newEq.push(wslots[s]);
  // build updated loadout: keep everything, replace equipped, keep parameters/unequipped
  const updated={...lo,equipped:newEq};
  const armorCount=newEq.filter(e=>{const d=M[e.hash];return d&&d.itemType===2;}).length;
  const wepCount=newEq.filter(e=>{const d=M[e.hash];return d&&d.itemType===3;}).length;
  const r=await post([{action:"loadout",payload:updated}]);
  const ok=r.code===200&&JSON.parse(r.body).results[0].status==="Success";
  report.push(`${ok?"✓":"✗"} ${lo.name}  [armor ${armorCount}/5, guns ${wepCount}]  ${newEq.filter(e=>{const d=M[e.hash];return d&&d.itemType===3;}).map(e=>M[e.hash].displayProperties.name).join(", ")}`);
  await new Promise(z=>setTimeout(z,200));
 }
 console.log(report.join("\n"));
})();
