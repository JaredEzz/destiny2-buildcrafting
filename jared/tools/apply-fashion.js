// Apply workflow-curated ornament configs to DIM builds via parameters.modsByBucket.
const fs=require("fs"),https=require("https");
const configs=JSON.parse(fs.readFileSync("/tmp/fashion-configs.json","utf8"));
const live=JSON.parse(fs.readFileSync("/tmp/live-now.json","utf8")).loadouts;
const TOKEN=fs.readFileSync("/root/.dim-token","utf8").trim(), KEY=fs.readFileSync("/root/.dim-apikey","utf8").trim();
const PID="4611686018495212620";
const EL={};for(let i=0;i<18;i++){const a=JSON.parse(fs.readFileSync("/tmp/fashion/"+i+".json","utf8"));EL[a.name]=a.element;}
const SHADER={Void:1371145728,Arc:4006192308,Stasis:557384115,Strand:3818755490,Prismatic:2653012761,Solar:1371145734};
const SLOT2BUCKET={Helmet:3448274439,Arms:3551918588,Chest:14239492,Legs:20886954,Class:1585787867};
function post(payload){return new Promise((res,rej)=>{const body=JSON.stringify({platformMembershipId:PID,destinyVersion:2,updates:[{action:"loadout",payload}]});
 const req=https.request("https://api.destinyitemmanager.com/profile",{method:"POST",headers:{"Authorization":"Bearer "+TOKEN,"X-API-Key":KEY,"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)}},
 r=>{let d="";r.on("data",c=>d+=c);r.on("end",()=>res({code:r.statusCode,body:d}));});req.on("error",rej);req.write(body);req.end();});}
(async()=>{
 const rep=[];
 for(const c of configs){
  const lo=live.find(l=>l.name.trim()===c.name.trim());
  if(!lo){rep.push("✗ NO LIVE: "+c.name);continue;}
  const shader=SHADER[EL[c.name]];
  const mbb=Object.assign({},lo.parameters&&lo.parameters.modsByBucket||{});
  for(const s of ["Helmet","Arms","Chest","Legs","Class"]){mbb[SLOT2BUCKET[s]]=[shader,c.picks[s]];}
  const payload=Object.assign({},lo,{parameters:Object.assign({},lo.parameters,{modsByBucket:mbb})});
  const r=await post(payload);
  let st;try{st=JSON.parse(r.body).results[0].status;}catch(e){st=r.code;}
  rep.push((st==="Success"?"✓ ":"✗ ")+c.name.slice(0,40).padEnd(42)+'"'+c.fashionName+'"');
  await new Promise(z=>setTimeout(z,180));
 }
 console.log(rep.join("\n"));
})();
