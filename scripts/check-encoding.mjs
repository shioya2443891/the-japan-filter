/**
 * Pre-build encoding check.
 * Scans markdown bodies (after frontmatter) for non-ASCII characters
 * (codepoint > 127). Exits with code 1 and prints offending file:line.
 *
 * RULE: article body must be ASCII-only (codepoint 0x00-0x7F).
 *
 * EXCEPTION -- proper nouns with diacritics (e.g. Wüsthof, Ōsaka):
 *   Do NOT write the raw non-ASCII character.
 *   Use an HTML entity instead: W&uuml;sthof, &Ocirc;saka.
 *   HTML entities are pure ASCII and pass this check.
 *   Named entities (&uuml;) and numeric entities (&#252;) both work.
 *
 * BOM (U+FEFF, codepoint 65279) is caught by the same cp > 127 check.
 *   If a file starts with BOM the frontmatter regex fails, the whole file
 *   is treated as body, and the BOM at character 0 is flagged at line 1.
 *   Always save article files without BOM (UTF-8, not UTF-8 with BOM).
 */
import { readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const rootDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const CONTENT_DIRS = [
  join(rootDir, 'src', 'content', 'tableware'),
  join(rootDir, 'src', 'content', 'knives'),
  join(rootDir, 'src', 'content', 'kitchen'),
];

// Frontmatter ends at the second "---" line; everything after is the body.
function splitFrontmatter(raw) {
  const match = raw.match(/^---[\r\n][\s\S]*?[\r\n]---[\r\n]([\s\S]*)$/);
  if (!match) return { fmLines: 0, body: raw };
  const fmLines = raw.slice(0, raw.length - match[1].length).split('\n').length;
  return { fmLines, body: match[1] };
}

let errors = 0;

for (const dir of CONTENT_DIRS) {
  for (const file of readdirSync(dir).filter(f => f.endsWith('.md')).sort()) {
    const filepath = join(dir, file);
    const raw = readFileSync(filepath, 'utf-8');
    const { fmLines, body } = splitFrontmatter(raw);

    const lines = body.split('\n');
    for (let i = 0; i < lines.length; i++) {
      for (const char of lines[i]) {
        const cp = char.codePointAt(0);
        if (cp > 127) {
          const lineNum = fmLines + i + 1;
          const hex = cp.toString(16).toUpperCase().padStart(4, '0');
          const rel = filepath.replace(rootDir + '\\', '').replace(rootDir + '/', '').replace(/\\/g, '/');
          process.stderr.write(`  ${rel}:${lineNum}: non-ASCII U+${hex} '${char}'\n`);
          errors++;
          break; // one error per line is enough
        }
      }
    }
  }
}

if (errors > 0) {
  process.stderr.write(
    `\ncheck-encoding: ${errors} violation(s). Build aborted.\n` +
    'Replace with ASCII equivalents:\n' +
    '  em dash  —  ->  --\n' +
    '  en dash  –  ->  -\n' +
    '  middle dot ·  ->  -\n' +
    '  multiplication ×  ->  x\n' +
    '  ellipsis …  ->  ...\n' +
    '  curly quotes “”‘’  ->  " \'\n'
  );
  process.exit(1);
}

process.stdout.write('check-encoding: OK\n');
