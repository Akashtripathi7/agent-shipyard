#!/usr/bin/env node
/**
 * Verify the built site. Run `npm run build` first; this checks `dist/`.
 *
 * The course teaches that a change is not done until something other than the
 * agent says so. This is that something for this repo. It checks the things
 * that silently rot: dead internal links, kit downloads that 404, data files
 * pointing at lessons that were never written, and pages missing a title.
 *
 * Exits non-zero on any failure, so it works as a pre-push or CI gate.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const failures = [];
const notes = [];

const fail = (msg) => failures.push(msg);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}

if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const files = walk(dist);
const pages = files.filter((f) => f.endsWith('.html'));
const rel = (f) => '/' + relative(dist, f).split('\\').join('/');

// Every path the built site can serve, in both the "/a/b/" and "/a/b/index.html" spellings.
const routes = new Set(pages.map((f) => rel(f).replace(/index\.html$/, '')));
const assets = new Set(files.map(rel));

// 1. Internal links resolve.
let linkCount = 0;
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const href = m[1];
    linkCount++;
    if (routes.has(href) || routes.has(href + '/') || assets.has(href)) continue;
    fail(`dead link ${href} on ${rel(f)}`);
  }
}
notes.push(`${linkCount} internal links across ${pages.length} pages`);

// 2. Every page has one <h1> and a <title>, and headings never skip a level.
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) fail(`${rel(f)} has ${h1s} <h1> elements, expected exactly 1`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${rel(f)} has no <title>`);

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      fail(`${rel(f)} skips a heading level: h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }
}

// 3. Data files must only point at lessons that exist.
const courseDir = join(root, 'src/content/course');
const slugs = new Set(
  walk(courseDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => relative(courseDir, f).replace(/\.mdx$/, '').split('\\').join('/'))
);

const refs = [
  ['src/data/kit.ts', /lesson: '([^']+)'/g, 'kit'],
  ['src/data/tools.ts', /lesson: '([^']+)'/g, 'tools'],
  ['src/data/glossary.ts', /first: '([^']+)'/g, 'glossary'],
];
const unwritten = new Set();
for (const [file, re, label] of refs) {
  const src = readFileSync(join(root, file), 'utf8');
  for (const m of src.matchAll(re)) {
    if (!slugs.has(m[1])) unwritten.add(`${label} → ${m[1]}`);
  }
}
// These are allowed — tiers 3 and 4 are still being written — but the pages must
// label them rather than link them, which rule 1 already proves.
if (unwritten.size) notes.push(`${unwritten.size} data references to lessons not yet written (rendered as labels, not links)`);

// 4. Every kit file listed is downloadable from the built site.
const kitSrc = readFileSync(join(root, 'src/data/kit.ts'), 'utf8');
const kitPaths = [...kitSrc.matchAll(/path: '([^']+)'/g)].map((m) => m[1]);
for (const p of kitPaths) {
  const onDisk = join(dist, 'kit', p);
  if (!existsSync(onDisk)) fail(`kit file missing from dist: /kit/${p}`);
  else if (statSync(onDisk).size === 0) fail(`kit file is empty: /kit/${p}`);
  // A file whose name starts with a dot is hidden by most static hosts.
  if (p.split('/').pop().startsWith('.')) fail(`kit file /kit/${p} starts with a dot; most hosts will not serve it`);
}
notes.push(`${kitPaths.length} kit downloads`);

// 5. Search index built.
if (!existsSync(join(dist, 'pagefind'))) fail('pagefind index missing; did `npm run build` finish?');

for (const n of notes) console.log(`  checked  ${n}`);
if (failures.length) {
  console.error(`\n${failures.length} problem${failures.length === 1 ? '' : 's'}:`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('\n✓ site verified');
