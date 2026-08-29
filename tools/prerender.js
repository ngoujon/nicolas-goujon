/**
 * Pré-rendu statique du build React.
 *
 * Lance un serveur local sur le dossier `build/`, ouvre chaque route dans
 * un navigateur headless, attend que React ait fini de rendre le contenu,
 * puis remplace le HTML de la route par le rendu final (titres + textes
 * visibles sans exécution de JavaScript côté client).
 *
 * Le bundle JS reste inclus dans la page : une fois chargé, React
 * hydrate le HTML pré-rendu et l'app redevient interactive normalement.
 */
const path = require('path');
const fs = require('fs/promises');
const fssync = require('fs');
const http = require('http');
const puppeteer = require('puppeteer');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = 45678;
const BASE_URL = `http://localhost:${PORT}`;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function createStaticServer(root) {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(root, urlPath);
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (fssync.existsSync(filePath) && fssync.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fssync.existsSync(filePath)) {
      // Repli SPA : toute route inconnue sert index.html (comme nginx en prod).
      filePath = path.join(root, 'index.html');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fssync.createReadStream(filePath).pipe(res);
  });
}

const ROUTES = [
  '/',
  '/bio',
  '/stack',
  '/formation',
  '/projets',
  '/contact',
  '/politique-confidentialite',
  '/mentions-legales',
];

async function prerenderRoute(browser, routePath, outFile) {
  const page = await browser.newPage();
  await page.goto(`${BASE_URL}${routePath}`, { waitUntil: 'networkidle0' });
  // Laisse le temps aux composants MUI/animations d'appliquer leur rendu initial.
  await page.waitForSelector('#root h1, #root h2, #root h3', { timeout: 10000 }).catch(() => {});
  const html = await page.content();
  await page.close();

  const outPath = outFile
    ? path.join(BUILD_DIR, outFile)
    : path.join(
        routePath === '/' ? BUILD_DIR : path.join(BUILD_DIR, routePath.replace(/^\//, '')),
        'index.html',
      );
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, html, 'utf8');
  console.log(`  Pré-rendu : ${routePath} -> ${path.relative(BUILD_DIR, outPath)}`);
}

async function main() {
  const server = createStaticServer(BUILD_DIR);
  await new Promise((resolve) => server.listen(PORT, resolve));

  // --no-sandbox : requis pour Chromium exécuté en root dans le conteneur de build.
  // PUPPETEER_EXECUTABLE_PATH : Chromium système (Alpine), cf. Dockerfile.
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    console.log('Pré-rendu des pages statiques...');
    for (const routePath of ROUTES) {
      await prerenderRoute(browser, routePath);
    }
    // Page d'erreur servie par nginx (error_page 404) pour toute URL inconnue :
    // sans elle, le repli SPA renverrait la page d'accueil en HTTP 200.
    await prerenderRoute(browser, '/page-introuvable', '404.html');
  } finally {
    await browser.close();
    server.close();
  }
  console.log('Pré-rendu terminé.');
}

main().catch((error) => {
  console.error('Échec du pré-rendu :', error);
  process.exit(1);
});
