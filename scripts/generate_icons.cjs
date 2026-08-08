const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Helper to create a valid PNG file buffer from RGBA pixels
function createPngBuffer(width, height, pixelShader) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth: 8
  ihdr[9] = 6; // color type: 6 (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw pixel data with filter byte 0 at start of each scanline
  const rawRowLen = 1 + width * 4;
  const rawData = Buffer.alloc(height * rawRowLen);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rawRowLen;
    rawData[rowOffset] = 0; // None filter
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelShader(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);

  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Simple CRC32 table & function
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Medical App Icon Shader: Royal Blue Gradient (#2563eb to #1d4ed8) with Luer Connector Emblem
function medicalIconShader(x, y, width, height) {
  const nx = (x / width - 0.5) * 2;
  const ny = (y / height - 0.5) * 2;
  const dist = Math.sqrt(nx * nx + ny * ny);

  // Rounded rectangle mask (radius ~ 0.25)
  const cornerR = 0.45;
  const ax = Math.max(0, Math.abs(nx) - (1 - cornerR));
  const ay = Math.max(0, Math.abs(ny) - (1 - cornerR));
  const cornerDist = Math.sqrt(ax * ax + ay * ay);

  if (cornerDist > cornerR) {
    return [0, 0, 0, 0]; // Transparent outside rounded corner
  }

  // Background Gradient (Top Left #3b82f6 -> Bottom Right #1e40af)
  const t = (nx + ny + 2) / 4;
  let r = Math.round(59 + (30 - 59) * t);
  let g = Math.round(130 + (64 - 130) * t);
  let b = Math.round(246 + (175 - 246) * t);

  // Luer Connector Syringe Tip Motif (Center Taper + Collar Rings)
  // Tapered cone: y between -0.4 and +0.3
  const isCone = ny >= -0.45 && ny <= 0.25 && Math.abs(nx) <= 0.15 + (0.25 - ny) * 0.15;
  // Inner channel: y between -0.4 and +0.25
  const isChannel = ny >= -0.4 && ny <= 0.25 && Math.abs(nx) <= 0.05;
  // Thread Collar Rings
  const isRing1 = ny >= 0.25 && ny <= 0.35 && Math.abs(nx) <= 0.4;
  const isRing2 = ny >= 0.4 && ny <= 0.5 && Math.abs(nx) <= 0.45;

  if (isChannel) {
    // Inner cyan channel
    return [147, 197, 253, 255];
  } else if (isCone || isRing1 || isRing2) {
    // White emblem with slight drop shadow
    return [255, 255, 255, 255];
  }

  // Subtle Outer Glow Ring
  if (dist > 0.65 && dist < 0.72) {
    r = Math.min(255, r + 40);
    g = Math.min(255, g + 40);
    b = Math.min(255, b + 50);
  }

  return [r, g, b, 255];
}

const publicDir = path.resolve(__dirname, '../public');

console.log('Generating PWA PNG icons...');
const buf192 = createPngBuffer(192, 192, medicalIconShader);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), buf192);

const buf512 = createPngBuffer(512, 512, medicalIconShader);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), buf512);

const bufApple = createPngBuffer(180, 180, medicalIconShader);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), bufApple);

console.log('PWA icons created successfully!');
