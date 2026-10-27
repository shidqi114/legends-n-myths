// After `vite build`: render each page with React on the server and put the HTML into dist/,
// so the pages read without JavaScript. The client entries then hydrate it.
import fs from 'node:fs';
import { createServer } from 'vite';

const PAGES = [
  ['dist/index.html', 'home'],
  ['dist/privacy/index.html', 'privacy'],
  ['dist/terms/index.html', 'terms'],
];

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { renderPage } = await vite.ssrLoadModule('/src/prerender.tsx');
  for (const [file, page] of PAGES) {
    const html = fs.readFileSync(file, 'utf8');
    const out = html.replace(/<div id="root"([^>]*)><\/div>/, (_, attrs) => `<div id="root"${attrs}>${renderPage(page)}</div>`);
    if (out === html) throw new Error(`no empty #root in ${file}`);
    fs.writeFileSync(file, out);
    console.log(`prerendered ${file}`);
  }
} finally {
  await vite.close();
}
