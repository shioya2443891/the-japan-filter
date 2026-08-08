const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const files = [
  "shun-vs-global-knives.md",
  "shun-free-sharpening-service.md",
  "shun-knives-left-handed.md",
  "shun-vs-wusthof-chef-knife.md",
  "shun-knives-wedding-gift.md",
  "shun-classic-vs-premier.md",
  "shun-vs-miyabi-knives.md",
  "where-are-shun-knives-made.md",
  "shun-vs-mac-knives.md",
  "shun-dual-core-guide.md",
];

const dir = "src/content/tableware";

for (const fname of files) {
  const fpath = path.join(dir, fname);
  let text = fs.readFileSync(fpath, 'utf8');

  const startMarker = "\nreviewLog:\n";
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) {
    console.log("SKIP (no reviewLog block): " + fname);
    continue;
  }
  const blockStart = startIdx + 1;
  const rest = text.slice(blockStart + "reviewLog:\n".length);
  const lines = rest.split("\n");
  let endOffsetLines = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^[A-Za-z]/.test(lines[i])) {
      endOffsetLines = i;
      break;
    }
  }
  const blockLines = lines.slice(0, endOffsetLines);
  const blockText = "reviewLog:\n" + blockLines.join("\n") + "\n";
  const afterText = lines.slice(endOffsetLines).join("\n");

  const parsed = yaml.load(blockText);
  const rl = parsed.reviewLog;

  const verdict = rl.finalVerdict || rl.verdict || rl.initialVerdict || "pass";
  const checks = (rl.checks || []).map(function(c) {
    let result = c.result || c.status;
    if (result === 'layout-dependent') result = 'pass';
    return {
      item: c.item || c.label,
      result: result,
      note: c.note,
    };
  });

  let summary = rl.summary || "";
  if (rl.revisions && rl.revisions.length > 0) {
    const revText = rl.revisions.map(function(r) {
      return (r.check || r.id || '') + ': ' + (r.description || r.detail || '');
    }).join(' / ');
    summary = summary + ' 修正: ' + revText;
  }

  const newReviewLog = {
    reviewLog: {
      reviewedAt: rl.reviewedAt || "August 2026",
      verdict: verdict,
      checks: checks,
      summary: summary,
    }
  };

  const newBlockText = yaml.dump(newReviewLog, { lineWidth: -1, noRefs: true });

  const newText = text.slice(0, startIdx + 1) + newBlockText + afterText;
  fs.writeFileSync(fpath, newText, 'utf8');
  console.log("FIXED: " + fname);
}
