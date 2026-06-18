// Renders 4x4 loadout-grid mockup PNGs with a built-in 5x7 pixel font. No deps (zlib only).
const zlib = require('zlib'), fs = require('fs');

// ---- minimal PNG writer ----
function crc32(buf) { let c, t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } let crc = 0xFFFFFFFF; for (const b of buf) crc = t[(crc ^ b) & 0xFF] ^ (crc >>> 8); return (crc ^ 0xFFFFFFFF) >>> 0; }
function chunk(type, data) { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, crc]); }
function png(w, h, px) { // px = Buffer w*h*3 RGB
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (w * 3 + 1)] = 0; px.copy(raw, y * (w * 3 + 1) + 1, y * w * 3, (y + 1) * w * 3); }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
// ---- 5x7 font ----
const F = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'], B: ['11110', '10001', '11110', '10001', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'], D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '11110', '10000', '10000', '10000', '11111'], F: ['11111', '10000', '11110', '10000', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10011', '10001', '10001', '01111'], H: ['10001', '10001', '11111', '10001', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'], J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
  K: ['10001', '10010', '11100', '10010', '10001', '10001', '10001'], L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'], N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'], P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'], R: ['11110', '10001', '10001', '11110', '10010', '10001', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'], T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'], V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'], X: ['10001', '01010', '00100', '00100', '00100', '01010', '10001'],
  Y: ['10001', '01010', '00100', '00100', '00100', '00100', '00100'], Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  "'": ['00100', '00100', '00000', '00000', '00000', '00000', '00000'], '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000'], ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  '1': ['00100','01100','00100','00100','00100','00100','01110'],
  '2': ['01110','10001','00001','00110','01000','10000','11111'],
  '.': ['00000', '00000', '00000', '00000', '00000', '00100', '00100'],
};
function makeCanvas(w, h, bg) { const px = Buffer.alloc(w * h * 3); for (let i = 0; i < w * h; i++) { px[i * 3] = bg[0]; px[i * 3 + 1] = bg[1]; px[i * 3 + 2] = bg[2]; } return { w, h, px }; }
function rect(cv, x, y, w, h, c) { for (let yy = Math.max(0, y); yy < Math.min(cv.h, y + h); yy++) for (let xx = Math.max(0, x); xx < Math.min(cv.w, x + w); xx++) { const i = (yy * cv.w + xx) * 3; cv.px[i] = c[0]; cv.px[i + 1] = c[1]; cv.px[i + 2] = c[2]; } }
function text(cv, x, y, str, c, s = 2) { let cx = x; for (const ch of str.toUpperCase()) { const g = F[ch] || F[' ']; for (let r = 0; r < 7; r++) for (let col = 0; col < 5; col++) if (g[r][col] === '1') rect(cv, cx + col * s, y + r * s, s, s, c); cx += 6 * s; } }
function textC(cv, cx, y, str, c, s = 2) { text(cv, cx - Math.floor(str.length * 6 * s / 2), y, str, c, s); }

// ---- palette ----
const EL = { void: [123, 80, 196], arc: [86, 176, 244], solar: [240, 116, 28], stasis: [78, 130, 224], strand: [52, 200, 130], prism: [226, 88, 162] };
const BG = [16, 16, 24], TILE_TXT = [255, 255, 255], DIM = [180, 180, 195];

function drawGrid(file, title, rowLabels, colLabels, tiles) {
  const TW = 232, TH = 132, GAP = 14, ML = 120, MT = 110;
  const W = ML + 4 * TW + 3 * GAP + 30, H = MT + 4 * TH + 3 * GAP + 30;
  const cv = makeCanvas(W, H, BG);
  textC(cv, Math.floor(W / 2), 22, title, [255, 255, 255], 3);
  colLabels.forEach((cl, i) => textC(cv, ML + i * (TW + GAP) + TW / 2, 72, cl, DIM, 2));
  rowLabels.forEach((rl, i) => text(cv, 16, MT + i * (TH + GAP) + TH / 2 - 7, rl, DIM, 2));
  tiles.forEach((t, idx) => {
    const r = Math.floor(idx / 4), c = idx % 4;
    const x = ML + c * (TW + GAP), y = MT + r * (TH + GAP);
    const col = EL[t.el];
    rect(cv, x, y, TW, TH, [Math.floor(col[0] * 0.28), Math.floor(col[1] * 0.28), Math.floor(col[2] * 0.28)]); // dark fill
    rect(cv, x, y, TW, 8, col); rect(cv, x, y + TH - 8, TW, 8, col); rect(cv, x, y, 8, TH, col); rect(cv, x + TW - 8, y, 8, TH, col); // border
    rect(cv, x + 8, y + 8, TW - 16, 26, col); // header band
    textC(cv, x + TW / 2, y + 14, t.icon, [10, 10, 14], 2); // icon/glyph label in band
    const lines = t.name.split('|');
    lines.forEach((ln, li) => textC(cv, x + TW / 2, y + 52 + li * 22, ln, TILE_TXT, 2));
    textC(cv, x + TW / 2, y + TH - 30, t.sub, DIM, 1);
  });
  fs.writeFileSync(file, png(W, H, cv.px));
  console.log('wrote', file, W + 'x' + H);
}

// ---- OPTION 1: rows = job, color/icon = element ----
drawGrid('/root/d2-warlock-monument/grid-option1.png', 'OPTION 1 . ROWS ARE JOBS . COLOR IS ELEMENT',
  ['GM', 'BOSS', 'ADDS', 'TEAM'],
  ['DEFAULT PICK', '', '', ''],
  [
    { el: 'void', icon: 'VOID', name: 'SOUL SIPHON', sub: 'SKULL . GM ALL-ROUNDER' },
    { el: 'stasis', icon: 'STASIS', name: 'RIME-COAT', sub: 'FREEZE THE ROOM' },
    { el: 'strand', icon: 'STRAND', name: 'MATAIODOXIA', sub: 'SUSPEND CHAMPIONS' },
    { el: 'void', icon: 'VOID', name: "NEZAREC'S SIN", sub: 'NEVER DIE ON MECHANICS' },
    { el: 'void', icon: 'VOID', name: 'TRIPLE-DET|AHAMKARA', sub: 'DOUBLE NOVA BURST' },
    { el: 'prism', icon: 'PRISM', name: 'APOTHEOSIS|EATER', sub: 'STAR-EATER NOVA' },
    { el: 'solar', icon: 'SOLAR', name: 'STARFIRE', sub: 'FUSION SPAM DPS' },
    { el: 'arc', icon: 'ARC', name: 'STORMWRATH', sub: 'CHAOS REACH BEAM' },
    { el: 'strand', icon: 'STRAND', name: 'PLAGUEBEARER', sub: 'OSTEO POISON CHAIN' },
    { el: 'strand', icon: 'STRAND', name: 'THREADLING|NEST', sub: 'NECROTIC SWARM' },
    { el: 'solar', icon: 'SOLAR', name: 'DAWN CHORUS', sub: 'IGNITION CHAINS' },
    { el: 'solar', icon: 'SOLAR', name: "CONSUL'S|ARTILLERY", sub: 'HELLION . NEEDS EUNOIA' },
    { el: 'solar', icon: 'SOLAR', name: "SPEAKER'S|SIGHT", sub: 'HEALING TURRET' },
    { el: 'solar', icon: 'SOLAR', name: 'LAST WELL', sub: 'LUNAFACTION TEAM DPS' },
    { el: 'strand', icon: 'STRAND', name: "THREADWEAVER'S|LOOM", sub: 'SWARM + HEAL MG' },
    { el: 'prism', icon: 'PRISM', name: 'BUSTED|BUDDIES', sub: 'GETAWAY TURRETS' },
  ]);

// ---- OPTION 2: columns = element wing, icon = job ----
drawGrid('/root/d2-warlock-monument/grid-option2.png', 'OPTION 2 . COLUMNS ARE ELEMENT WINGS . ICON IS JOB',
  ['', '', '', ''],
  ['THE NIGHT', 'THE WEAVE', 'THE DAWN', 'THE LIGHT'],
  [
    { el: 'void', icon: 'GM', name: 'SOUL SIPHON', sub: 'VOID' },
    { el: 'strand', icon: 'ADDS', name: 'PLAGUEBEARER', sub: 'STRAND' },
    { el: 'solar', icon: 'ADDS', name: 'DAWN CHORUS', sub: 'SOLAR' },
    { el: 'arc', icon: 'BOSS', name: 'STORMWRATH', sub: 'ARC' },
    { el: 'void', icon: 'BOSS', name: 'TRIPLE-DET|AHAMKARA', sub: 'VOID' },
    { el: 'strand', icon: 'ADDS', name: 'THREADLING|NEST', sub: 'STRAND' },
    { el: 'solar', icon: 'BOSS', name: 'STARFIRE', sub: 'SOLAR' },
    { el: 'prism', icon: 'BOSS', name: 'APOTHEOSIS|EATER', sub: 'PRISMATIC' },
    { el: 'void', icon: 'GM', name: "NEZAREC'S SIN", sub: 'VOID' },
    { el: 'strand', icon: 'GM', name: 'MATAIODOXIA', sub: 'STRAND' },
    { el: 'solar', icon: 'ADDS', name: "CONSUL'S|ARTILLERY", sub: 'SOLAR . NEEDS EUNOIA' },
    { el: 'prism', icon: 'GM', name: 'BUSTED|BUDDIES', sub: 'PRISMATIC' },
    { el: 'stasis', icon: 'GM', name: 'RIME-COAT', sub: 'STASIS' },
    { el: 'strand', icon: 'TEAM', name: "THREADWEAVER'S|LOOM", sub: 'STRAND' },
    { el: 'solar', icon: 'TEAM', name: "SPEAKER'S|SIGHT", sub: 'SOLAR' },
    { el: 'solar', icon: 'TEAM', name: 'LAST WELL', sub: 'SOLAR' },
  ]);
