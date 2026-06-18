// In-game-style 4x4 loadout grid mockups using REAL Bungie loadout icons + color swatches.
const { PNG } = require('pngjs'), jpeg = require('jpeg-js'), fs = require('fs'), zlib = require('zlib');
function loadPng(f) { const p = PNG.sync.read(fs.readFileSync(f)); return { w: p.width, h: p.height, data: p.data }; }
function loadJpg(f) { const j = jpeg.decode(fs.readFileSync(f), { useTArray: true }); return { w: j.width, h: j.height, data: j.data }; }
function canvas(w, h, bg) { const d = Buffer.alloc(w * h * 3); for (let i = 0; i < w * h; i++) { d[i * 3] = bg[0]; d[i * 3 + 1] = bg[1]; d[i * 3 + 2] = bg[2]; } return { w, h, d }; }
function blit(cv, img, dx, dy, dw, dh) { for (let y = 0; y < dh; y++) for (let x = 0; x < dw; x++) { const sx = Math.floor(x * img.w / dw), sy = Math.floor(y * img.h / dh); const si = (sy * img.w + sx) * 4; const a = img.data[si + 3] / 255; const px = dx + x, py = dy + y; if (px < 0 || py < 0 || px >= cv.w || py >= cv.h) continue; const di = (py * cv.w + px) * 3; cv.d[di] = Math.round(img.data[si] * a + cv.d[di] * (1 - a)); cv.d[di + 1] = Math.round(img.data[si + 1] * a + cv.d[di + 1] * (1 - a)); cv.d[di + 2] = Math.round(img.data[si + 2] * a + cv.d[di + 2] * (1 - a)); } }
function rect(cv, x, y, w, h, c) { for (let yy = Math.max(0, y); yy < Math.min(cv.h, y + h); yy++) for (let xx = Math.max(0, x); xx < Math.min(cv.w, x + w); xx++) { const i = (yy * cv.w + xx) * 3; cv.d[i] = c[0]; cv.d[i + 1] = c[1]; cv.d[i + 2] = c[2]; } }
const F = {
  A: ['01110','10001','10001','11111','10001','10001','10001'],B:['11110','10001','11110','10001','10001','10001','11110'],C:['01111','10000','10000','10000','10000','10000','01111'],D:['11110','10001','10001','10001','10001','10001','11110'],E:['11111','10000','11110','10000','10000','10000','11111'],F:['11111','10000','11110','10000','10000','10000','10000'],G:['01111','10000','10000','10011','10001','10001','01111'],H:['10001','10001','11111','10001','10001','10001','10001'],I:['11111','00100','00100','00100','00100','00100','11111'],J:['00111','00010','00010','00010','00010','10010','01100'],K:['10001','10010','11100','10010','10001','10001','10001'],L:['10000','10000','10000','10000','10000','10000','11111'],M:['10001','11011','10101','10101','10001','10001','10001'],N:['10001','11001','10101','10011','10001','10001','10001'],O:['01110','10001','10001','10001','10001','10001','01110'],P:['11110','10001','10001','11110','10000','10000','10000'],Q:['01110','10001','10001','10001','10101','10010','01101'],R:['11110','10001','10001','11110','10010','10001','10001'],S:['01111','10000','10000','01110','00001','00001','11110'],T:['11111','00100','00100','00100','00100','00100','00100'],U:['10001','10001','10001','10001','10001','10001','01110'],V:['10001','10001','10001','10001','10001','01010','00100'],W:['10001','10001','10001','10101','10101','11011','10001'],X:['10001','01010','00100','00100','00100','01010','10001'],Y:['10001','01010','00100','00100','00100','00100','00100'],Z:['11111','00001','00010','00100','01000','10000','11111'],
  "'":['00100','00100','00000','00000','00000','00000','00000'],'-':['00000','00000','00000','11111','00000','00000','00000'],' ':['00000','00000','00000','00000','00000','00000','00000'],'.':['00000','00000','00000','00000','00000','00100','00100'],
  '0':['01110','10001','10011','10101','11001','10001','01110'],'1':['00100','01100','00100','00100','00100','00100','01110'],'2':['01110','10001','00001','00110','01000','10000','11111'],'3':['11110','00001','00001','01110','00001','00001','11110'],'4':['00010','00110','01010','10010','11111','00010','00010'],'5':['11111','10000','11110','00001','00001','10001','01110'],'6':['00110','01000','10000','11110','10001','10001','01110'],'7':['11111','00001','00010','00100','01000','01000','01000'],'8':['01110','10001','10001','01110','10001','10001','01110'],'9':['01110','10001','10001','01111','00001','00010','01100'],
};
function text(cv, x, y, str, c, s) { let cx = x; for (const ch of str.toUpperCase()) { const g = F[ch] || F[' ']; for (let r = 0; r < 7; r++) for (let col = 0; col < 5; col++) if (g[r][col] === '1') rect(cv, cx + col * s, y + r * s, s, s, c); cx += 6 * s; } }
function textC(cv, cx, y, str, c, s) { text(cv, cx - Math.floor(str.length * 6 * s / 2), y, str, c, s); }
function crc32(buf) { let c, t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } let crc = 0xFFFFFFFF; for (const b of buf) crc = t[(crc ^ b) & 0xFF] ^ (crc >>> 8); return (crc ^ 0xFFFFFFFF) >>> 0; }
function chunk(type, data) { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, crc]); }
function writePng(file, cv) { const raw = Buffer.alloc((cv.w * 3 + 1) * cv.h); for (let y = 0; y < cv.h; y++) { raw[y * (cv.w * 3 + 1)] = 0; cv.d.copy(raw, y * (cv.w * 3 + 1) + 1, y * cv.w * 3, (y + 1) * cv.w * 3); } const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(cv.w, 0); ihdr.writeUInt32BE(cv.h, 4); ihdr[8] = 8; ihdr[9] = 2; fs.writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])); }

const icons = {}, colors = {};
for (let i = 0; i <= 20; i++) icons[i] = loadPng(`icon-${i}.png`);
for (let i = 0; i <= 21; i++) colors[i] = loadJpg(`color-${i}.jpg`);
// JPG loads lack alpha=255? jpeg-js returns RGBA with alpha 255. good.

function drawGrid(file, title, rowLabels, colLabels, tiles) {
  const TS = 150, GAP = 26, ML = 130, MT = 120, CAP = 56;
  const ROWS = Math.ceil(tiles.length / 4);
  const W = ML + 4 * (TS + GAP) + 40, H = MT + ROWS * (TS + CAP + GAP) + 20;
  const cv = canvas(W, H, [13, 13, 18]);
  textC(cv, Math.floor(W / 2), 24, title, [240, 240, 245], 3);
  colLabels.forEach((cl, i) => textC(cv, ML + i * (TS + GAP) + TS / 2, 84, cl, [150, 150, 165], 2));
  rowLabels.forEach((rl, i) => text(cv, 18, MT + i * (TS + CAP + GAP) + TS / 2 - 7, rl, [150, 150, 165], 2));
  tiles.forEach((t, idx) => {
    const r = Math.floor(idx / 4), c = idx % 4;
    const x = ML + c * (TS + GAP), y = MT + r * (TS + CAP + GAP);
    rect(cv, x - 3, y - 3, TS + 6, TS + 6, [90, 90, 105]); // frame
    blit(cv, colors[t.c], x, y, TS, TS);                    // real swatch bg
    blit(cv, icons[t.i], x + 15, y + 15, TS - 30, TS - 30); // real glyph
    textC(cv, x + TS / 2, y + TS + 10, t.n1, [235, 235, 240], 2);
    textC(cv, x + TS / 2, y + TS + 30, `I${t.i} . C${t.c} . ${t.nm}`, [140, 140, 155], 1);
  });
  writePng(file, cv); console.log('wrote', file);
}

// OPTION 1 — rows are jobs, color+icon = element. Every tile is a UNIQUE icon+color pair.
drawGrid('/root/d2-warlock-monument/grid-real-option1.png',
  'OPTION 1 . ROWS ARE JOBS . COLOR IS ELEMENT', ['GM', 'BOSS', 'ADDS', 'TEAM'], ['DEFAULT', '', '', ''], [
  { i: 4, c: 17, nm: 'NIGHTFALL', n1: 'SOUL SIPHON' },
  { i: 5, c: 6, nm: 'NIGHTFALL', n1: 'RIME-COAT' },
  { i: 6, c: 12, nm: 'NIGHTFALL', n1: 'MATAIODOXIA' },
  { i: 4, c: 15, nm: 'NIGHTFALL', n1: "NEZAREC'S SIN" },
  { i: 4, c: 21, nm: 'RAID', n1: 'TRIPLE-DET' },
  { i: 19, c: 20, nm: 'RAID', n1: 'APOTHEOSIS' },
  { i: 3, c: 13, nm: 'RAID', n1: 'STARFIRE' },
  { i: 2, c: 5, nm: 'RAID', n1: 'STORMWRATH' },
  { i: 6, c: 11, nm: 'STRIKE', n1: 'PLAGUEBEARER' },
  { i: 6, c: 10, nm: 'PVE', n1: 'THREADLING NEST' },
  { i: 3, c: 18, nm: 'STRIKE', n1: 'DAWN CHORUS' },
  { i: 3, c: 9, nm: 'PVE', n1: "CONSUL'S ART." },
  { i: 3, c: 8, nm: 'SUPPORT', n1: "SPEAKER'S SIGHT" },
  { i: 3, c: 1, nm: 'SUPPORT', n1: 'LAST WELL' },
  { i: 6, c: 3, nm: 'SUPPORT', n1: 'THREADWEAVER' },
  { i: 19, c: 14, nm: 'PVE', n1: 'BUSTED BUDDIES' },
]);

// OPTION 2 — columns are element wings, ICON = JOB (Vanguard=GM, Raid arch=Boss, Sword=Adds, Shield=Team)
drawGrid('/root/d2-warlock-monument/grid-real-option2.png',
  'OPTION 2 . COLUMNS ARE WINGS . ICON IS JOB', ['', '', '', ''], ['NIGHT', 'WEAVE', 'DAWN', 'LIGHT'], [
  { i: 20, c: 17, nm: 'NIGHTFALL', n1: 'SOUL SIPHON' },
  { i: 11, c: 12, nm: 'STRIKE', n1: 'PLAGUEBEARER' },
  { i: 11, c: 13, nm: 'STRIKE', n1: 'DAWN CHORUS' },
  { i: 16, c: 5, nm: 'RAID', n1: 'STORMWRATH' },
  { i: 16, c: 15, nm: 'RAID', n1: 'TRIPLE-DET' },
  { i: 11, c: 10, nm: 'PVE', n1: 'THREADLING NEST' },
  { i: 16, c: 18, nm: 'RAID', n1: 'STARFIRE' },
  { i: 16, c: 20, nm: 'RAID', n1: 'APOTHEOSIS' },
  { i: 20, c: 21, nm: 'NIGHTFALL', n1: "NEZAREC'S SIN" },
  { i: 20, c: 11, nm: 'NIGHTFALL', n1: 'MATAIODOXIA' },
  { i: 11, c: 9, nm: 'PVE', n1: "CONSUL'S ART." },
  { i: 20, c: 14, nm: 'PVE', n1: 'BUSTED BUDDIES' },
  { i: 20, c: 6, nm: 'NIGHTFALL', n1: 'RIME-COAT' },
  { i: 12, c: 3, nm: 'SUPPORT', n1: 'THREADWEAVER' },
  { i: 12, c: 8, nm: 'SUPPORT', n1: "SPEAKER'S SIGHT" },
  { i: 12, c: 1, nm: 'SUPPORT', n1: 'LAST WELL' },
]);

// OPTION 3 — THE TAPESTRY: pure aesthetics. One glyph per row, four-color hue sweep per row.
// Vertical story: Void night -> Solar dawn -> Strand growth -> Frozen light.
drawGrid('/root/d2-warlock-monument/grid-real-option3.png',
  'OPTION 3 . THE TAPESTRY . ONE GLYPH PER ROW', ['NIGHT', 'DAWN', 'GROWTH', 'ICE'], ['', '', '', ''], [
  { i: 4, c: 15, nm: 'VOID', n1: "NEZAREC'S SIN" },
  { i: 4, c: 17, nm: 'VOID', n1: 'SOUL SIPHON' },
  { i: 4, c: 21, nm: 'VOID', n1: 'TRIPLE-DET' },
  { i: 4, c: 20, nm: 'PRISMATIC', n1: 'APOTHEOSIS' },
  { i: 3, c: 18, nm: 'SOLAR', n1: 'DAWN CHORUS' },
  { i: 3, c: 13, nm: 'SOLAR', n1: 'STARFIRE' },
  { i: 3, c: 8, nm: 'SOLAR', n1: "SPEAKER'S SIGHT" },
  { i: 3, c: 9, nm: 'SOLAR', n1: "CONSUL'S ART." },
  { i: 6, c: 12, nm: 'STRAND', n1: 'PLAGUEBEARER' },
  { i: 6, c: 11, nm: 'STRAND', n1: 'THREADLING NEST' },
  { i: 6, c: 3, nm: 'STRAND', n1: 'THREADWEAVER' },
  { i: 6, c: 10, nm: 'STRAND', n1: 'MATAIODOXIA' },
  { i: 5, c: 6, nm: 'STASIS', n1: 'RIME-COAT' },
  { i: 5, c: 4, nm: 'PVE', n1: 'BUSTED BUDDIES' },
  { i: 5, c: 7, nm: 'ARC', n1: 'STORMWRATH' },
  { i: 5, c: 1, nm: 'SUPPORT', n1: 'LAST WELL' },
]);

// OPTION 4 — THE BESTIARY: icon = the build's story. 16 distinct glyphs. Color still = element.
drawGrid('/root/d2-warlock-monument/grid-real-option4.png',
  'OPTION 4 . THE BESTIARY . ICON IS THE BUILD', ['', '', '', ''], ['NIGHT', 'WEAVE', 'DAWN', 'LIGHT'], [
  { i: 4, c: 17, nm: 'NIGHTFALL', n1: 'SOUL SIPHON' },     // devour vortex
  { i: 13, c: 12, nm: 'STRIKE', n1: 'PLAGUEBEARER' },      // venom serpent
  { i: 10, c: 18, nm: 'STRIKE', n1: 'DAWN CHORUS' },       // phoenix bird
  { i: 20, c: 5, nm: 'RAID', n1: 'STORMWRATH' },           // beam from the sky
  { i: 8, c: 15, nm: 'RAID', n1: 'TRIPLE-DET' },           // wish-dragon = AHAMKARA
  { i: 7, c: 10, nm: 'PVE', n1: 'THREADLING NEST' },       // spider brood
  { i: 3, c: 13, nm: 'RAID', n1: 'STARFIRE' },             // the eternal flame
  { i: 2, c: 20, nm: 'RAID', n1: 'APOTHEOSIS' },           // the star it eats
  { i: 14, c: 21, nm: 'NIGHTFALL', n1: "NEZAREC'S SIN" },  // the god's eye
  { i: 11, c: 11, nm: 'NIGHTFALL', n1: 'MATAIODOXIA' },    // the arcane needle
  { i: 18, c: 9, nm: 'PVE', n1: "CONSUL'S ART." },         // siege bull
  { i: 19, c: 14, nm: 'PVE', n1: 'BUSTED BUDDIES' },       // robo-buddy cluster
  { i: 5, c: 6, nm: 'NIGHTFALL', n1: 'RIME-COAT' },        // the frost itself
  { i: 6, c: 3, nm: 'SUPPORT', n1: 'THREADWEAVER' },       // the literal loom
  { i: 1, c: 8, nm: 'SUPPORT', n1: "SPEAKER'S SIGHT" },    // the Speaker's regalia
  { i: 12, c: 1, nm: 'SUPPORT', n1: 'LAST WELL' },         // the team's shield
]);


// ===== 4x5 INTEGRATED GRIDS (20 slots) =====
// OPTION 1 — FIVE JOB ROWS: GM / BOSS / TURRETS / SWARM / TEAM. Color+icon = element.
drawGrid('/root/d2-warlock-monument/grid-real20-option1.png','OPTION 1 . FIVE JOBS . COLOR IS ELEMENT',
 ['GM','BOSS','TURRET','SWARM','TEAM'],['DEFAULT','','',''],[
 { i:4,c:17,nm:'NIGHTFALL',n1:'SOUL SIPHON' },{ i:4,c:15,nm:'NIGHTFALL',n1:"NEZAREC'S SIN" },{ i:6,c:12,nm:'NIGHTFALL',n1:'MATAIODOXIA' },{ i:6,c:11,nm:'NIGHTFALL',n1:'PLAGUEBEARER' },
 { i:4,c:21,nm:'RAID',n1:'TRIPLE-DET' },{ i:19,c:20,nm:'RAID',n1:'APOTHEOSIS' },{ i:3,c:13,nm:'RAID',n1:'STARFIRE' },{ i:3,c:19,nm:'RAID',n1:'RAIN OF FIRE' },
 { i:5,c:6,nm:'PVE',n1:'RIME-COAT' },{ i:5,c:7,nm:'PVE',n1:'OSMIOMANCY' },{ i:19,c:16,nm:'PVE',n1:'GETAWAY TURRETS' },{ i:19,c:14,nm:'PVE',n1:'BUSTED BUDDIES' },
 { i:6,c:10,nm:'STRIKE',n1:'THREADLING NEST' },{ i:3,c:18,nm:'STRIKE',n1:'DAWN CHORUS' },{ i:3,c:9,nm:'STRIKE',n1:"CONSUL'S ART." },{ i:2,c:5,nm:'STRIKE',n1:'STORMWRATH' },
 { i:3,c:8,nm:'SUPPORT',n1:"SPEAKER'S SIGHT" },{ i:3,c:1,nm:'SUPPORT',n1:'LAST WELL' },{ i:6,c:3,nm:'SUPPORT',n1:'THREADWEAVER' },{ i:3,c:0,nm:'SUPPORT',n1:'GRAVEKEEPER' }]);

// OPTION 2 — WINGS, 5 DEEP: each column a gradient journey. Icon = job (I20 GM, I16 Boss, I11 Adds, I12 Team).
drawGrid('/root/d2-warlock-monument/grid-real20-option2.png','OPTION 2 . ELEMENT WINGS . GRADIENT COLUMNS',
 ['','','','',''],['NIGHT','WEAVE','DAWN','LIGHT'],[
 { i:20,c:17,nm:'NIGHTFALL',n1:'SOUL SIPHON' },{ i:11,c:12,nm:'STRIKE',n1:'PLAGUEBEARER' },{ i:11,c:18,nm:'STRIKE',n1:'DAWN CHORUS' },{ i:12,c:0,nm:'SUPPORT',n1:'GRAVEKEEPER' },
 { i:20,c:21,nm:'NIGHTFALL',n1:"NEZAREC'S SIN" },{ i:20,c:11,nm:'NIGHTFALL',n1:'MATAIODOXIA' },{ i:16,c:13,nm:'RAID',n1:'STARFIRE' },{ i:12,c:1,nm:'SUPPORT',n1:'LAST WELL' },
 { i:16,c:15,nm:'RAID',n1:'TRIPLE-DET' },{ i:11,c:10,nm:'PVE',n1:'THREADLING NEST' },{ i:11,c:9,nm:'PVE',n1:"CONSUL'S ART." },{ i:16,c:5,nm:'RAID',n1:'STORMWRATH' },
 { i:20,c:6,nm:'NIGHTFALL',n1:'RIME-COAT' },{ i:12,c:3,nm:'SUPPORT',n1:'THREADWEAVER' },{ i:16,c:19,nm:'RAID',n1:'RAIN OF FIRE' },{ i:20,c:16,nm:'PVE',n1:'GETAWAY TURRETS' },
 { i:20,c:7,nm:'NIGHTFALL',n1:'OSMIOMANCY' },{ i:20,c:14,nm:'PVE',n1:'BUSTED BUDDIES' },{ i:12,c:8,nm:'SUPPORT',n1:"SPEAKER'S SIGHT" },{ i:16,c:20,nm:'RAID',n1:'APOTHEOSIS' }]);

// OPTION 3 — THE TAPESTRY, five bands: a day cycle. One glyph per band, hue sweep per band.
drawGrid('/root/d2-warlock-monument/grid-real20-option3.png','OPTION 3 . THE TAPESTRY . FIVE BANDS',
 ['NIGHT','DAWN','GROWTH','ICE','DUSK'],['','','',''],[
 { i:4,c:15,nm:'VOID',n1:"NEZAREC'S SIN" },{ i:4,c:17,nm:'VOID',n1:'SOUL SIPHON' },{ i:4,c:21,nm:'VOID',n1:'TRIPLE-DET' },{ i:4,c:20,nm:'PRISMATIC',n1:'APOTHEOSIS' },
 { i:3,c:18,nm:'SOLAR',n1:'DAWN CHORUS' },{ i:3,c:13,nm:'SOLAR',n1:'STARFIRE' },{ i:3,c:8,nm:'SOLAR',n1:"SPEAKER'S SIGHT" },{ i:3,c:9,nm:'SOLAR',n1:"CONSUL'S ART." },
 { i:6,c:12,nm:'STRAND',n1:'PLAGUEBEARER' },{ i:6,c:11,nm:'STRAND',n1:'THREADLING NEST' },{ i:6,c:3,nm:'STRAND',n1:'THREADWEAVER' },{ i:6,c:10,nm:'STRAND',n1:'MATAIODOXIA' },
 { i:5,c:6,nm:'STASIS',n1:'RIME-COAT' },{ i:5,c:4,nm:'PVE',n1:'BUSTED BUDDIES' },{ i:5,c:7,nm:'ARC',n1:'STORMWRATH' },{ i:5,c:1,nm:'SUPPORT',n1:'LAST WELL' },
 { i:19,c:19,nm:'RAID',n1:'RAIN OF FIRE' },{ i:19,c:14,nm:'PVE',n1:'GETAWAY TURRETS' },{ i:19,c:16,nm:'SUPPORT',n1:'GRAVEKEEPER' },{ i:19,c:2,nm:'NIGHTFALL',n1:'OSMIOMANCY' }]);

// OPTION 4 — THE BESTIARY, 5-deep wings: 20 distinct story icons, same gradient columns as Option 2.
drawGrid('/root/d2-warlock-monument/grid-real20-option4.png','OPTION 4 . THE BESTIARY . 20 SIGILS',
 ['','','','',''],['NIGHT','WEAVE','DAWN','LIGHT'],[
 { i:4,c:17,nm:'NIGHTFALL',n1:'SOUL SIPHON' },{ i:13,c:12,nm:'STRIKE',n1:'PLAGUEBEARER' },{ i:10,c:18,nm:'STRIKE',n1:'DAWN CHORUS' },{ i:9,c:0,nm:'SUPPORT',n1:'GRAVEKEEPER' },
 { i:14,c:21,nm:'NIGHTFALL',n1:"NEZAREC'S SIN" },{ i:11,c:11,nm:'NIGHTFALL',n1:'MATAIODOXIA' },{ i:3,c:13,nm:'RAID',n1:'STARFIRE' },{ i:12,c:1,nm:'SUPPORT',n1:'LAST WELL' },
 { i:8,c:15,nm:'RAID',n1:'TRIPLE-DET' },{ i:7,c:10,nm:'PVE',n1:'THREADLING NEST' },{ i:18,c:9,nm:'PVE',n1:"CONSUL'S ART." },{ i:20,c:5,nm:'RAID',n1:'STORMWRATH' },
 { i:5,c:6,nm:'NIGHTFALL',n1:'RIME-COAT' },{ i:6,c:3,nm:'SUPPORT',n1:'THREADWEAVER' },{ i:0,c:19,nm:'RAID',n1:'RAIN OF FIRE' },{ i:16,c:16,nm:'PVE',n1:'GETAWAY TURRETS' },
 { i:15,c:7,nm:'NIGHTFALL',n1:'OSMIOMANCY' },{ i:19,c:14,nm:'PVE',n1:'BUSTED BUDDIES' },{ i:1,c:8,nm:'SUPPORT',n1:"SPEAKER'S SIGHT" },{ i:2,c:20,nm:'RAID',n1:'APOTHEOSIS' }]);
