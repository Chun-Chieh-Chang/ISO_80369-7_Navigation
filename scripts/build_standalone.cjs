const fs = require('fs');
const path = require('path');

const srcHtmlPath = path.join(__dirname, '..', 'public', 'slides', 'index.html');
const outHtmlPath = path.join(__dirname, '..', 'public', 'slides-standalone.html');

let html = fs.readFileSync(srcHtmlPath, 'utf8');

// Find all asset references like ../assets/...
const assetRegex = /\.\.\/assets\/[a-zA-Z0-9_\-\.\/]+/g;
const matches = [...new Set(html.match(assetRegex) || [])];

console.log(`Found ${matches.length} unique asset references to inline.`);

for (const match of matches) {
  const relPath = match.replace('../assets/', '');
  const absPath = path.join(__dirname, '..', 'public', 'assets', relPath);
  if (fs.existsSync(absPath)) {
    const ext = path.extname(absPath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.svg' ? 'image/svg+xml' : 'application/octet-stream';
    const b64 = fs.readFileSync(absPath).toString('base64');
    const dataUri = `data:${mime};base64,${b64}`;
    html = html.split(match).join(dataUri);
    console.log(`Inlined: ${match} -> (${b64.length} bytes)`);
  } else {
    console.warn(`File not found: ${absPath}`);
  }
}

fs.writeFileSync(outHtmlPath, html, 'utf8');
console.log(`Successfully generated standalone slides: ${outHtmlPath} (${html.length} bytes)`);
