/* Screenshot the glb from front, back, and three-quarter. */
const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(
  'C:', 'development', 'Hothifa', 'kormzi', 'kormzi-website', 'node_modules', 'puppeteer-core'
));
const chromePath = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => fs.existsSync(p));

const http = require('http');
const ROOT = path.resolve(__dirname, '..');
const MIME = { '.html': 'text/html', '.glb': 'model/gltf-binary', '.js': 'text/javascript' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) {
    res.writeHead(404); res.end(); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(5299, r));
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 900 });
  const file = process.argv[2] || '../incoming/a1-model.glb';
  for (const yaw of [0, 35, 180]) {
    await page.goto(`http://localhost:5299/tools/preview.html?yaw=${yaw}&file=${encodeURIComponent(file)}`, { waitUntil: 'networkidle0' });
    await page.waitForFunction('window.__done || window.__err', { timeout: 20000 });
    const err = await page.evaluate('window.__err || ""');
    if (err) { console.error('LOAD_ERR', err); break; }
    await page.screenshot({ path: path.join(__dirname, `m-yaw${yaw}.png`) });
    console.log('shot', `m-yaw${yaw}.png`);
  }
  await browser.close();
  server.close();
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
