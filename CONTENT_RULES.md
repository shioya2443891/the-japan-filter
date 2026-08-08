# Content Rules — The Japan Filter

These rules apply to all articles, page copy, and layout text across the site.
They exist to prevent FTC compliance issues, Amazon Associates policy violations,
and reader trust problems that arise from overclaiming firsthand experience.

---

## 1. Never imply physical product testing

The Japan Filter does not purchase or physically test products.
Do not use any language that implies direct, hands-on experience.

**Prohibited expressions:**
- tested / we tested / after testing
- hands-on / hands-on review
- we tried / we used / we bought
- in our testing / during our testing
- after using / after receiving
- unboxed / in person (when describing product feel)

**Use instead:**
- we researched / we evaluated
- reviewers report / reviewers consistently describe
- according to manufacturer specifications
- verified listings show / based on official product information
- customer reviews indicate

**Examples:**

| Before (prohibited) | After (correct) |
|---|---|
| "We tested this in the dishwasher" | "Reviewers consistently report dishwasher performance holds up after 12+ months" |
| "Dishwasher performance holds up well" | "Reviewers report dishwasher performance holds up well" |
| "We found the glaze durable" | "Customer reviews indicate the glaze remains durable over time" |
| "In our testing, the handle felt secure" | "Reviewers describe the handle as secure" |

---

## 2. Do not use ambiguous first-person plural for physical claims

"We" is acceptable when referring to research and verification work.
"We" is not acceptable when the sentence implies physical interaction with a product.

**Acceptable:**
- "We verified the seller is Noritake U.S.A., Inc."
- "We cross-referenced domestic Japanese rankings."
- "We evaluated availability across Amazon.com listings."

**Not acceptable:**
- "We found the weight comfortable." → "Reviewers describe the weight as comfortable."
- "We noticed the glaze fades." → "Some reviewers report glaze fading over time."

---

## 3. Avoid specific, volatile review metrics

Review counts, star ratings, and sales rank fluctuate daily.
Do not hardcode specific numbers that will become inaccurate and undermine credibility.

**Prohibited:**
- "4.7 stars across 2,340 reviews"
- "Amazon's #1 bestseller in Dinnerware"
- "ranked #3 in customer satisfaction"

**Use instead:**
- "consistently well-reviewed (4★ and above)"
- "one of the highest-rated sets in its category"
- "a strong review record with 100+ verified purchases"

Once the Amazon Product Advertising API (Creators API) is integrated, dynamic
review counts and ratings can be fetched and displayed programmatically.
Until then, use range or threshold descriptions only.

---

## 4. Sourcing language in How We Researched sections

Each `researchSteps` entry must describe an action taken on available information —
not physical verification. Acceptable verbs: confirmed, verified, cross-referenced,
checked, reviewed, evaluated, compared.

Avoid: tested, examined in person, assessed by hand, inspected.

---

## 5. Layout and evergreen copy

Site-wide copy in BaseLayout, about.astro, and index.astro must use research-based
framing. Approved phrasing for evergreen mission statements:

- "We research and verify Japanese products using domestic market information
  and manufacturer sources."
- "Independent research and verification — not physical testing."
- "Re-evaluated using domestic Japanese sources, not firsthand product use."

---

## 6. Master Article Template

The Noritake Colorwave wedding gifts article (`best-noritake-dinnerware-wedding-gifts.md`)
is the confirmed master template for all Japan Filter articles.

**Standard article structure (in order):**

1. **INTRO** — frontmatter `intro` field; one paragraph establishing the brand and why
   it matters for US buyers
2. **Product Cards** — frontmatter `products` array; rendered automatically by ArticleLayout
3. **Editorial body** — markdown content in the article file; supplemental context,
   use cases, buying scenarios
4. **Japan Context** — frontmatter `japanContext`; two required subsections:
   - **IN JAPAN**: documented facts about how the product/brand is positioned, sold,
     or priced in the Japanese market, with verification date for any time-sensitive data
   - **WHAT THAT MEANS FOR U.S. BUYERS**: explicit translation of each Japan-market fact
     into a concrete US buyer implication
5. **What US Buyers Should Know** — frontmatter `usBuyerNotes`; practical checklist
   items specific to buying this product category as a US consumer
6. **Final Verdict** — frontmatter `verdict`; rating, summary, and best pick with
   Amazon CTA
7. **How We Researched** — frontmatter `researchSteps`, `sourcesChecked`,
   `lastVerified`; methodology transparency

New articles must follow this structure. Deviating from the order or omitting sections
requires documented justification.

---

## 7. Japan Context: prohibited reasoning patterns

The Japan Context section exists to provide verifiable market intelligence — not to
validate a purchase recommendation on the basis of popularity or cultural prestige.

**Prohibited logic:**

- "This product is popular in Japan, therefore it is good" — Japanese market popularity
  does not transfer as product quality evidence for US buyers
- "Japanese consumers prefer X, so US buyers should too" — preference differences between
  markets are real; domestic Japanese preference is not a recommendation signal
- "It sells well in Japan" — sales performance in one market does not indicate product
  fit or value in another
- Using the brand's Japanese origin as a standalone quality signal without specific,
  verifiable evidence

**The Japan Context section must:**
- State verifiable facts about how the product is positioned, priced, or distributed
  in Japan
- Explicitly connect each Japan-market fact to a US buyer implication in the
  "WHAT THAT MEANS FOR U.S. BUYERS" subsection
- Include verification date for any market data (prices, availability, rankings)
- Remain neutral: Japan-market context can support, qualify, or contradict a recommendation

**Japan Context must never substitute for a verdict.** The Final Verdict section carries
the recommendation; Japan Context provides supporting or qualifying evidence only.

---

## 8. Evidence Strength Rule

Do not conflate "not found in research" with "does not exist."
Every claim must be calibrated to what was actually verified.

---

**LEVEL 1 — Confirmed from primary sources**

Facts verifiable from official manufacturer documentation, official sales listings,
corporate registration, official pricing, manufacturer warranty information, or
well-established historical record.

→ May be stated as fact without qualification.

Examples: "Noritake U.S.A., Inc. is listed as the seller." / "The set contains 20 pieces
per the manufacturer's official product description." / "Noritake was founded in Nagoya
in 1904."

---

**LEVEL 2 — Corroborated market trends**

Patterns observed across multiple reliable sources: retail listings, brand materials,
verified review aggregates, or multiple retail channel checks.

→ Use: "commonly" / "tends to" / "widely available" /
"we found across multiple sources" / "in the channels we reviewed" /
"the review pattern suggests" / "based on the sources reviewed"

Examples: "Reviewers commonly describe the glaze as durable after 12+ months of
dishwasher use." / "Across the sources we checked, this pattern appeared in top-tier
gift contexts."

---

**LEVEL 3 — Not found within research scope**

Information that was searched for but not confirmed. Absence of evidence within a
research scope is not evidence of absence in the real world.

→ Prohibited: "X is not sold in Japan" / "does not appear in Japanese gift culture" /
"has no presence in the Japanese market" / "Japanese consumers do not recognize X"

→ Required: "We did not find..." / "In the Japanese retailers we checked..." /
"At the time of our research (Month Year)..." /
"Our review of major Japanese retail channels found no evidence of..."

Always specify the research scope and date. "We did not find X in [channels reviewed]
during our research (August 2026)" is accurate; "X does not exist in Japan" is not.

---

**LEVEL 4 — Inference or speculation**

Market positioning claims, brand perception assessments, consumer psychology, and
popularity judgments not directly supported by verifiable data.

→ Prohibited by default. If included, must be labeled as analysis or inference:
"Based on available information, it appears..." / "This may reflect..." /
"One interpretation of the available data..."

Do not present inferences as facts. Do not omit the inference label because the
conclusion seems obvious.

---

**Particularly sensitive negative claims — minimum LEVEL 3 treatment required**

- "X is not sold in [country]"
- "X has no presence in [market]"
- "X is not popular in [country]"
- "X is not recognized in [market]"
- "Japanese consumers think / prefer / do not recognize X"
- "X does not exist in [market]"

Scope limitation is not weakness — it is accuracy. Stating "we did not find X in the
channels we reviewed" is more credible than stating "X does not exist," and it is what
a research-based publication should say.

---

**Process Log and How We Researched**

The `researchSteps` and `sourcesChecked` frontmatter fields are a factual record of
what was actually checked. Do not list a source in `sourcesChecked` that was not
reviewed. Do not describe a research step in `researchSteps` that was not taken.

If a source was checked but returned no usable results, that is still a valid entry:
e.g., "Major Japanese retail channels checked — no Lenox listings found during review."

---

## 9. Not-Recommended 記事の終わり方

`verdict.rating: "not-recommended"` の記事は、必ず「では何を買うべきか」で締めること。
「米国では買えない」「おすすめしない」で終わる記事はユーザーを行き止まりに置く。

**必須要素（両方なければならない）:**

1. **本文末に「What to Buy Instead」セクション** — 代替品・代替手段を1段落以上で説明する
2. **製品カードに代替モデルを掲載** — `award` フィールドに "BEST ALTERNATIVE" 等を設定し、
   Amazon CTA で代替品に誘導する

**`verdict` フィールドの書き方:**
```yaml
verdict:
  rating: "not-recommended"
  summary: "[なぜおすすめしないか] + [代替として何を買うべきか]"
  bestPick: "[代替製品の product id]"
```

`bestPick` に `null` や `~` を入れることは、not-recommended 記事では認めない。
代替品を指定できない場合は記事化自体を保留する。

---

## 10. Brand Profile（ブランドプロファイル）の運用ルール

ブランドに関する調査済み情報は `src/data/brands/[brand-slug].md` に蓄積する。

**新規記事を書く前に必ず行うこと:**

1. 対象ブランドのプロファイルファイルが `src/data/brands/` に存在するか確認する
2. 存在する場合: プロファイルに記載されている情報から使用可能な素材を確認する
3. 不足している情報のみ追加調査する
4. 追加調査で得た新情報はプロファイルに追記する（`profileUpdated` を更新）

**プロファイルが存在しない場合:**

brand-scout エージェントを使って初回調査を行い、プロファイルファイルを作成してから記事を書く。

**プロファイルファイルの構成要素:**

各項目には Evidence Strength Rule（ルール 8）の LEVEL 1〜3 を明記すること。

- 一次情報で確認できた事実（LEVEL 1）
- 日本国内でのブランドポジション（LEVEL 1〜3）
- 米国での認知度・位置づけ（LEVEL 1〜2）
- 主力商品ライン（LEVEL 1）
- 米国での競合ブランド（LEVEL 1〜2）
- 日米の価格傾向（LEVEL 2〜3、時点を必ず明記）
- Japan Context として書ける独自視点（使用済み・未使用を区別して記録）
- 調査記録（調査日・情報源）

**Japan Context 使い回し防止:**

プロファイル内の「Japan Context として書ける独自視点」セクションに使用済みの視点を記録し、
新規記事では未使用の視点から選ぶこと（ルール 7 参照）。

**現在のプロファイル一覧:**

- `src/data/brands/noritake.md` — Noritake（ノリタケ）、食器、August 2026
- `src/data/brands/zojirushi.md` — Zojirushi（象印マホービン）、キッチン家電、August 2026
- `src/data/brands/shun.md` — Shun（旬 / KAI Corporation）、刃物、August 2026

---

## 11. 記事本文の記号はASCII範囲のみ使用する

### ルール

**記事本文（frontmatter の text/string フィールドを含む）に使ってよいのは
ASCII 範囲（コードポイント U+0000 - U+007F）の記号のみ。**

非ASCII記号をそのまま書くと、Claude の出力→エディタ→git という
パイプラインのどこかで UTF-8 バイト列が Shift-JIS (CP932) として
再解釈され、文字化けとして記事に残る。再発を防ぐために記号を
ASCII に統一する。

### 置換対応表

| 非ASCII文字 | 代替ASCII |
|---|---|
| `—` em dash (U+2014) | `--` |
| `–` en dash (U+2013) | `-` |
| `·` middle dot (U+00B7) | `-` |
| `×` multiplication sign (U+00D7) | `x` |
| `"` `"` curly double quotes | `"` |
| `'` `'` curly single quotes | `'` |
| `…` ellipsis (U+2026) | `...` |
| `★` black star (U+2605) | `4-star` 等のテキスト表現 |

### 例外：固有名詞のダイアクリティカルマーク

ブランド名・地名など固有名詞の正式表記に含まれる非ASCII文字は、
**HTML エンティティ**で書く。生の非ASCII文字は書かない。

| ブランド | 生の文字 (NG) | HTML エンティティ (OK) |
|---|---|---|
| Wüsthof | `Wüsthof` | `W&uuml;sthof` |

- HTML エンティティはすべて ASCII 文字で構成されるため、
  チェックスクリプトはそのまま通る。
- 名前付きエンティティ (`&uuml;`) と数値参照 (`&#252;`) のどちらでも可。
- URL（Amazon のクエリ文字列など）には書かない。
  URL 内では ASCII のまま (`Wusthof`) で問題ない。

### 自動チェック

`npm run build` は `node scripts/check-encoding.mjs` を先に実行する。
記事本文（frontmatter 末尾の `---` より後）に非ASCII文字が1文字でも
あればビルドが停止し、ファイル名と行番号が表示される。

BOM (U+FEFF, codepoint 65279) も同じチェックで検出される。
記事ファイルは必ず BOM なし UTF-8 で保存すること。

### 文字化けが起きたとき

過去に観測されたパターン（根本原因はすべて同じ: UTF-8 → CP932 誤読）:

| 文字化け文字 | 本来の文字 |
|---|---|
| `窶・` | `—` em dash |
| `窶・X` (数字欠落) | `–X` en dash + 数字 |
| `ﾂｷ` | `·` middle dot |
| `笘・` | `★` 黒星 |
2026-08-08 に一括修正済み。
