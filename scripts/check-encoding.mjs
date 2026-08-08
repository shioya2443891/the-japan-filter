/**
 * Pre-build encoding check.
 * Scans markdown bodies (after frontmatter) for non-ASCII characters.
 * Exits with code 1 and prints offending file:line if any are found.
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
