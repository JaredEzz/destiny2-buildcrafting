const fs=require("fs"),https=require("https");
const M=JSON.parse(fs.readFileSync("/tmp/d2items.json","utf8"));
const snap=JSON.parse(fs.readFileSync("/tmp/profile-snap.json","utf8")).Response;
const socks=snap.itemComponents.sockets.data;
const live=JSON.parse(fs.readFileSync("/tmp/verify21.json","utf8")).loadouts;
const SETS=JSON.parse(fs.readFileSync("/tmp/orn-sets.json","utf8")); // {family:{Helmet,Arms,Chest,Legs,Class:hash}}
const TOKEN=fs.readFileSync("/root/.dim-token","utf8").trim(), KEY=fs.readFileSync("/root/.dim-apikey","utf8").trim();
const PID="4611686018495212620";
// element of each build
const EL={
 "Soul Siphon Voidwalker — Double Nova":"Void","Triple-Detonation Ahamkara":"Void","Abyssal Extractors — Nezarec's Sin":"Void",
 "Stormwrath — Geomag Chaos Reach":"Arc",
 "Permafrost Bleak Watcher — Osmiomancy":"Stasis","Permafrost Sentinel — Rime-Coat":"Stasis",
 "Plaguebearer's Weave — Necrotic+Osteo":"Strand","Threadling Nest Broodweaver — Necrotic":"Strand","Threadweaver's Loom — Swarm":"Strand","Stylostixis Suspend Engine — Mataiodoxia":"Strand",
 "Busted Buddies — Getaway Prismatic":"Prismatic","Getaway Twin Turrets — Prismatic":"Prismatic","Apotheosis Eater — Solipsism Prismatic":"Prismatic",
 "Eternal Embers — Dawn Chorus Ignition":"Solar","Starfire Nuke — Fusion DPS":"Solar","Consul's Artillery — Hellion Eunoia":"Solar","Rain of Fire — Fusion Trinity":"Solar",
 "Speaker's Sight — Twin Healing Turrets":"Solar","Noble Sanctuary — Boots of the Assembler":"Solar","The Last Well — Lunafaction":"Solar","Gravekeeper — Cenotaph Ammo Battery":"Solar",
};
// curated set assignment — within each element every build gets a distinct set
const ASSIGN={
 "Soul Siphon Voidwalker — Double Nova":"Elect of the Empty","Abyssal Extractors — Nezarec's Sin":"Lucent Night","Triple-Detonation Ahamkara":"Neotenic Starfarer",
 "Stormwrath — Geomag Chaos Reach":"Arclight",
 "Permafrost Bleak Watcher — Osmiomancy":"Dendrite Shimmer","Permafrost Sentinel — Rime-Coat":"S'phtish",
 "Plaguebearer's Weave — Necrotic+Osteo":"Entheogenic Parasite","Threadling Nest Broodweaver — Necrotic":"Dionaea","Threadweaver's Loom — Swarm":"Intrepid Inquiry","Stylostixis Suspend Engine — Mataiodoxia":"Streetscholar",
 "Busted Buddies — Getaway Prismatic":"Arclight","Getaway Twin Turrets — Prismatic":"Dendrite Shimmer","Apotheosis Eater — Solipsism Prismatic":"Neotenic Starfarer",
 "Eternal Embers — Dawn Chorus Ignition":"Dawn Singer","Starfire Nuke — Fusion DPS":"S'phtish","Consul's Artillery — Hellion Eunoia":"Lucent Night","Rain of Fire — Fusion Trinity":"Streetscholar",
 "Speaker's Sight — Twin Healing Turrets":"Dawn Singer","Noble Sanctuary — Boots of the Assembler":"Intrepid Inquiry","The Last Well — Lunafaction":"Entheogenic Parasite","Gravekeeper — Cenotaph Ammo Battery":"Dionaea",
};
const BSLOT={3448274439:"Helmet",3551918588:"Arms",14239492:"Chest",20886954:"Legs",1585787867:"Class"};
function ornSocketIdx(id){const ss=socks[id]?.sockets||[];for(let i=0;i<ss.length;i++){const pd=M[ss[i].plugHash];if(pd&&/armor_skins/.test(pd.plug?.plugCategoryIdentifier||""))return i;}return null;}
function post(lo){return new Promise((res,rej)=>{const body=JSON.stringify({platformMembershipId:PID,destinyVersion:2,updates:[{action:"loadout",payload:lo}]});
 const req=https.request("https://api.destinyitemmanager.com/profile",{method:"POST",headers:{"Authorization":"Bearer "+TOKEN,"X-API-Key":KEY,"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)}},
 r=>{let d="";r.on("data",c=>d+=c);r.on("end",()=>res({code:r.statusCode,body:d}));});req.on("error",rej);req.write(body);req.end();});}
(async()=>{
 const rep=[];
 for(const lo of live){
  const fam=ASSIGN[lo.name.trim()];const set=SETS[fam];if(!set){rep.push("? "+lo.name);continue;}
  let applied=0;
  const eq=lo.equipped.map(e=>{const d=M[e.hash];if(!d||d.itemType!==2||!e.id)return e;
   const slot=BSLOT[d.inventory.bucketTypeHash];const orn=set[slot];const idx=ornSocketIdx(e.id);
   if(orn&&idx!=null){const so=Object.assign({},e.socketOverrides||{});so[String(idx)]=orn;applied++;return Object.assign({},e,{socketOverrides:so});}
   return e;});
  const r=await post(Object.assign({},lo,{equipped:eq}));const ok=r.code===200&&JSON.parse(r.body).results[0].status==="Success";
  rep.push((ok?"✓ ":"✗ ")+lo.name.trim().slice(0,40).padEnd(42)+"→ "+fam+" set ("+applied+"/5)");
  await new Promise(z=>setTimeout(z,200));
 }
 console.log(rep.join("\n"));
})();
