const fs=require("fs"),https=require("https");
const M=JSON.parse(fs.readFileSync("/tmp/d2items.json","utf8"));
const live=JSON.parse(fs.readFileSync("/tmp/verify21.json","utf8")).loadouts;
const sh=JSON.parse(fs.readFileSync("/tmp/owned-shaders.json","utf8"));
const TOKEN=fs.readFileSync("/root/.dim-token","utf8").trim(), KEY=fs.readFileSync("/root/.dim-apikey","utf8").trim();
const PID="4611686018495212620";
const has=n=>sh.find(s=>s.name.toLowerCase()===n.toLowerCase());
const find=(...kw)=>{for(const k of kw){const m=sh.find(s=>s.name.toLowerCase().includes(k));if(m)return m;}return null;};
// shader palette (owned)
const VOID=find("amethyst","violet","wizard"),ARC=find("blue geometry","cobalt"),STASIS=find("mystophosphor","frost","glacial"),STRAND=find("jungle viper","verdant","reed"),PRISM=find("superblack")||find("scintillant"),
 SOLAR_DPS=find("copperbrand","rust","ember"),SOLAR_SUP=find("goldleaf","gilded","celestial","ophidian","amber")||find("copperbrand");
const SHADER={
 "Soul Siphon Voidwalker — Double Nova":VOID,"Triple-Detonation Ahamkara":VOID,"Abyssal Extractors — Nezarec's Sin":VOID,
 "Stormwrath — Geomag Chaos Reach":ARC,
 "Permafrost Bleak Watcher — Osmiomancy":STASIS,"Permafrost Sentinel — Rime-Coat":STASIS,
 "Plaguebearer's Weave — Necrotic+Osteo":STRAND,"Threadling Nest Broodweaver — Necrotic":STRAND,"Threadweaver's Loom — Swarm":STRAND,"Stylostixis Suspend Engine — Mataiodoxia":STRAND,
 "Busted Buddies — Getaway Prismatic":PRISM,"Getaway Twin Turrets — Prismatic":PRISM,"Apotheosis Eater — Solipsism Prismatic":PRISM,
 "Eternal Embers — Dawn Chorus Ignition":SOLAR_DPS,"Starfire Nuke — Fusion DPS":SOLAR_DPS,"Consul's Artillery — Hellion Eunoia":SOLAR_DPS,"Rain of Fire — Fusion Trinity":SOLAR_DPS,
 "Speaker's Sight — Twin Healing Turrets":SOLAR_SUP,"Noble Sanctuary — Boots of the Assembler":SOLAR_SUP,"The Last Well — Lunafaction":SOLAR_SUP,"Gravekeeper — Cenotaph Ammo Battery":SOLAR_SUP,
};
function postLoadout(lo){return new Promise((res,rej)=>{const body=JSON.stringify({platformMembershipId:PID,destinyVersion:2,updates:[{action:"loadout",payload:lo}]});
 const req=https.request("https://api.destinyitemmanager.com/profile",{method:"POST",headers:{"Authorization":"Bearer "+TOKEN,"X-API-Key":KEY,"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)}},
 r=>{let d="";r.on("data",c=>d+=c);r.on("end",()=>res({code:r.statusCode,body:d}));});req.on("error",rej);req.write(body);req.end();});}
(async()=>{
 const rep=[];
 for(const lo of live){
  const sd=SHADER[lo.name.trim()];if(!sd){rep.push("? "+lo.name);continue;}
  const eq=lo.equipped.map(e=>{const d=M[e.hash];
   if(d&&d.itemType===2&&e.id){ // armor → set shader socket (4), keep any existing overrides
    const so=Object.assign({},e.socketOverrides||{});so["4"]=sd.hash;return Object.assign({},e,{socketOverrides:so});}
   return e;});
  const updated=Object.assign({},lo,{equipped:eq});
  const r=await postLoadout(updated);const ok=r.code===200&&JSON.parse(r.body).results[0].status==="Success";
  rep.push((ok?"✓ ":"✗ ")+lo.name.trim().slice(0,40).padEnd(42)+"→ "+sd.name);
  await new Promise(z=>setTimeout(z,200));
 }
 console.log(rep.join("\n"));
})();
