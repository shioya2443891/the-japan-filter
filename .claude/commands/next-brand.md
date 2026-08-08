---
description: 日本ブランドの記事を一括生成する。brand-scout → theme-auditor → 記事執筆 → article-reviewer の全工程を自動実行し、draft 記事を作成してレポートする。引数: ブランド名（省略可）
---

# /next-brand 実行手順

引数: $ARGUMENTS

以下の手順を **すべて日本語で** 実行・報告してください。
作業前に必ず `CONTENT_RULES.md` を読むこと。

---

## STEP 0: ブランドの決定

**引数が指定されている場合**: そのブランドを対象とする。

**引数が省略されている場合**: 以下の条件を満たす日本ブランドを1つ選ぶ。
- Amazon.com に公式ストアまたは公認セラーがある
- `src/data/brands/` にプロファイルが存在しない（まだ扱っていない）
- The Japan Filter の既存カテゴリ（食器・キッチン家電）と隣接または補完するカテゴリ
- Japan Context が「日本で人気だから」以外の角度で書けるブランド

選んだブランドと理由を最初に報告すること。

---

## STEP 1: ブランドプロファイルの確認と調査

### 1a. プロファイル存在確認

`src/data/brands/[brand-slug].md` が存在するか確認する。

**存在する場合:**
- `lastResearched` と `refreshInterval` を読み込む
- 今日の日付（$CURRENT_DATE）と比較し、期限切れかどうか確認する
- 期限切れ: STEP 1b（再調査）へ
- 有効: プロファイルを読み込んで STEP 2 へ。「プロファイル有効・既存データを使用」と報告

**存在しない場合:** STEP 1b へ

### 1b. brand-scout で調査

`brand-scout` エージェント（`.claude/agents/brand-scout.md`）の手順に従い調査を実施する。

- Amazon.com での公式ストア有無・主力商品を調査（WebSearch / WebFetch を使用）
- 日本国内でのブランドポジション・価格帯を調査（Japan Context 素材）
- 米国での競合ブランドを特定
- 調査結果を `src/data/brands/[brand-slug].md` に保存する
  - `lastResearched`: 今日の日付（YYYY-MM-DD 形式）
  - `volatility`: 家電=high(60日) / キッチン用品=medium(90日) / 食器・伝統工芸=low(180日)
  - `refreshInterval`: volatility に対応する日数
  - Evidence Strength Rule（CONTENT_RULES.md ルール 8）に従い、各項目に LEVEL 1〜3 を明記すること
  - 「Japan Context として書ける独自視点」セクションには「使用済み」「未使用」を区別して記録

---

## STEP 2: 記事テーマの洗い出し

`brand-scout` エージェントの手順に従い、記事テーマ 8〜12 本を洗い出す。

ブランドプロファイルの「使用済み視点リスト」を参照し、
**すでに使った Japan Context の切り口は避けること**。

---

## STEP 3: theme-auditor による審査

`theme-auditor` エージェント（`.claude/agents/theme-auditor.md`）の手順に従い、
STEP 2 で洗い出したテーマを審査する。

**重要: 優先度の高低でテーマを絞らないこと。**
以下の基準のいずれかに該当するものだけを却下する:

- A: CONTENT_RULES.md に構造的に違反する
- B: Japan Context で「日本で人気だから」以外の独自視点が書けない
- C: 既存記事と内容が 70% 以上重複する
- D: 推薦根拠が「日本での人気」のみになる

却下テーマは理由を日本語で明記すること。

---

## STEP 4: 記事の執筆（合格テーマ全本）

合格したテーマを **1本ずつ** 以下の手順で記事化する。

### マスターテンプレートの参照

記事構造は `src/content/tableware/best-noritake-dinnerware-wedding-gifts.md` に準拠すること（CONTENT_RULES.md ルール 6）。

### 各記事の作成手順

1. `src/content/tableware/[slug].md` を新規作成する
2. frontmatter 構成（順序を守ること）:
   - `title`, `description`, `intro`
   - `publishDate`: 今日の日付
   - `researchSteps`, `sourcesChecked`, `lastVerified`
   - `status: draft`（公開まで変更しない）
   - `reviewLog: null`（article-reviewer が書き込む）
   - `products` 配列（各商品の `amazon.url` は検索 URL 形式）
   - `japanContext`（`inJapan` + `forUsBuyers` の 2 サブセクション必須）
   - `usBuyerNotes`
   - `verdict`

3. ブランドプロファイル（`src/data/brands/[brand-slug].md`）を参照し、
   LEVEL 1〜2 の情報を使う。不足があれば WebSearch / WebFetch で追加調査する。

4. **CONTENT_RULES.md の全ルールを守ること**:
   - 禁止表現なし（we tested / hands-on / we tried 等）
   - Evidence Strength Rule（各主張が LEVEL に合った表現になっているか）
   - 「日本で人気だからおすすめ」ロジックにしない
   - 変動する数値（星評価・レビュー数）を断定しない

5. 記事作成後、`npm run build` でビルドエラーがないことを確認する。
   エラーがあれば修正してから次の記事に進む。

---

## STEP 5: article-reviewer による審査

各記事を `article-reviewer` エージェント（`.claude/agents/article-reviewer.md`）で審査する。

- 7項目の全チェックを実施する
- `reviewLog` を frontmatter に書き込む
- **`status` は `draft` のまま変更しない**
- fail 項目があれば記事を直接修正し、修正内容を `reviewLog.revisions` に記録する
- 修正後に再審査し、`reviewLog.finalVerdict: "pass"` になったことを確認する

---

## STEP 6: ブランドプロファイルの更新

`src/data/brands/[brand-slug].md` を更新する:

- 「使用済み視点」セクションに今回使用した Japan Context の切り口を追記する
- `lastResearched`: 今日の日付で更新（再調査した場合）
- `profileUpdated`: 今日の日付で更新

---

## STEP 7: コミット・プッシュ

```
git add src/content/tableware/ src/data/brands/
git commit -m "Add [brand] articles (draft) · [記事数]本"
git push
```

---

## STEP 8: 完了報告（日本語）

以下の形式で報告する:

```
## /next-brand 完了レポート

### 対象ブランド
[ブランド名] — [選んだ理由または指定ブランドの確認]

### テーマ審査結果
- 候補: X本 / 合格: X本 / 却下: X本
- 却下テーマ:
  - [テーマ名]: [却下理由]

### 作成した記事
| # | タイトル | slug | article-reviewer |
|---|---------|------|-----------------|
| 1 | ... | ... | pass / fixed（修正内容） |

### Final Verdict 内訳
- recommended: X本
- conditional: X本
- not-recommended: X本

### 次のアクション
公開したい記事があれば「[タイトル] を公開して」と指示してください。
ブランドプロファイルの次回再調査期限: [日付]
```

---

## 重要な制約（全STEP共通）

- **`status: published` には絶対に変更しない**。人間が「公開して」と明示した場合のみ変更する
- `article-reviewer` が pass を出しても、人間の確認なしに公開しない（Amazon 規約・FTC 開示漏れはアカウント停止に直結する）
- 調査できなかった情報は「確認できなかった」と明記し、LEVEL 3 として処理する
- Amazon の星評価・レビュー数の具体的数値を断定しない
