---
description: ポートフォリオ状態を読み取り、新ブランド追加か既存ブランド深掘りかを自律判断して実行する。毎日の記事生成を完全自動化するコマンド。
---

# /daily 実行手順

以下の手順を **すべて日本語で** 実行・報告してください。

---

## STEP 0: 状態ファイルを読み込む

以下を順に Read すること:

1. `CONTENT_RULES.md` -- 全ルールを把握する
2. `src/data/site-state.json` -- brands[], totals, priceTierRatio を取得
3. `src/data/link-map.json` -- Rule 13 内部リンク判断に使う
4. `.claude/daily-log.md` -- 存在する場合のみ。連続ブランド判定に使う

**集計の禁止**: 記事ファイルを直接スキャンして数えてはいけない。
site-state.json の数値をそのまま使うこと。

---

## STEP 1: 実行種別を決定する

以下のロジックを上から順に評価し、最初に当てはまった条件を採用する。

### ルール 1（最優先）: Rule 14 ポートフォリオ配分チェック

```
高単価ブランドの比率 = priceTierRatio.high / (priceTierRatio.high + priceTierRatio.low)
```

この比率が **0.67 未満** の場合:
→ **新ブランド追加** を実行。対象は必ず `priceTier = "high"` のブランド。
→ 理由に「Rule 14: 高単価比率 X% < 67%」と明記する。

### ルール 2: ブランド数と平均記事数による判断

Rule 1 が発動しなかった場合（比率 >= 0.67）、以下を評価:

| 条件 | 実行種別 |
|---|---|
| ブランド数 < 8 かつ 平均記事数 >= 10 | 新ブランド追加 |
| 平均記事数 < 10 | 深掘り |
| ブランド数 >= 8 かつ 平均記事数 >= 10 | 新ブランド追加 |

### 深掘りの対象ブランド選定

深掘りが選ばれた場合:

1. `priceTier = "high"` のブランドを候補とする
2. 記事数が最も少ないブランドを選ぶ
3. `.claude/daily-log.md` の直近エントリを読み、
   同一ブランドが **3回連続** で選ばれている場合は次点のブランドを選ぶ
4. `priceTier = "high"` のブランドが全て3連続回避対象の場合は
   `priceTier = "low"` で同様に選ぶ

**選択したブランドと理由を、作業を始める前にユーザーに報告すること。**

---

## STEP 2A: 新ブランド追加（next-brand フローを実行）

`.claude/commands/next-brand.md` の STEP 0 から STEP 9 を実行する。

ただし以下の点を変更する:
- STEP 0 のブランド選定では Rule 14 の要件（high priceTier 優先）を考慮すること
- STEP 0 の「ブランドと理由を報告」時に、site-state.json の現在の配分を示すこと

next-brand STEP 9 の完了後、STEP 3（daily-log 更新）に進む。

---

## STEP 2B: 深掘り（既存ブランドの記事拡充）

選定したブランドの既存記事をカバーしていない新テーマ 6〜8 本を生成する。

### 2B-1: ブランド情報の読み込み

1. `src/data/brands/[brand-slug].md` を Read する
2. `src/data/site-state.json` の該当ブランドの `slugs[]` を確認し、
   既存の記事テーマを把握する -- 記事ファイルを一件ずつ読まなくてよい
3. ブランドプロファイルの「使用済み視点」セクションを確認し、
   すでに使った Japan Context の切り口を把握する

### 2B-2: 新テーマの洗い出し（6〜8 本）

以下の観点で、既存 slugs と重複しないテーマを洗い出す:

- まだ書いていない製品ライン・モデル
- 購入目的の別角度（日常使い / ギフト / 業務用 / コレクション）
- 比較検討（未カバーの競合との対比）
- 素材・機能・場面の組み合わせで未カバーのもの
- 「日本で人気だから」以外の Japan Context 視点が使えるもの

**必ず `theme-auditor` エージェントで審査すること（`.claude/agents/theme-auditor.md`）。**
却下基準は next-brand STEP 3 と同じ。

### 2B-3: 記事の執筆

next-brand STEP 4 の手順に従い、合格テーマを 1 本ずつ記事化する。

- コンテンツディレクトリは既存ブランド記事と同じディレクトリを使う
  （ブランドの既存スラッグが `src/content/kitchen/` にあれば kitchen/ に作成）
- `status: draft`（公開しない）
- ビルドエラーチェック: `npm run build` は全記事完成後に 1 回実行

### 2B-4: article-reviewer による審査

各記事を `.claude/agents/article-reviewer.md` で審査する。
CHECK-1 から CHECK-8 を全実施。

### 2B-5: 内部リンクの追加（Rule 13）

article-reviewer の CHECK-8 で candidates が出た場合は追加する。
加えて、`src/data/link-map.json` を参照し、
`inboundFrom` が空（リンクされていない）の既存記事を
リンク先の優先候補とすること。

### 2B-6: ブランドプロファイルの更新

`src/data/brands/[brand-slug].md` を更新:
- 「使用済み視点」セクションに今回使った Japan Context の切り口を追記
- `profileUpdated` を今日の日付に更新

---

## STEP 3: daily-log の更新

`.claude/daily-log.md` に以下の形式で追記する。
ファイルが存在しない場合は新規作成する。

```markdown
## [YYYY-MM-DD]

- 作業種別: [新ブランド追加 / 深掘り]
- 対象ブランド: [ブランド名]
- 生成記事数: [N]本
- 判断理由: [適用されたルールと数値根拠を一文で]
- 実行時ポートフォリオ: ブランド数 [N] / 平均記事数 [N] / 高単価比率 [N%]
```

---

## STEP 4: ビルド・コミット・プッシュ

```
npm run build
```

ビルドが通ったら:

```
git add src/content/ src/data/brands/ src/data/site-state.json src/data/link-map.json .claude/daily-log.md
git commit -m "[深掘り/新ブランド]: [ブランド名] articles (draft) x[N]"
git push
```

---

## STEP 5: 完了報告

以下の形式で報告する:

```
## /daily 完了レポート

### 実行種別と理由
[新ブランド追加 / 深掘り] -- [選んだ理由を一文で]

### 対象ブランド
[ブランド名]

### 生成した記事
| # | タイトル | slug | verdict | article-reviewer |
|---|---------|------|---------|-----------------|
| 1 | ... | ... | recommended / conditional / not-recommended | pass / fixed |

### 内部リンク（Rule 13）
- 追加: [記事 A -> 記事 B: "アンカーテキスト"] / 見送り: なし
- 優先付与した link-map 孤立記事: [スラッグ] / なし

### 現在のポートフォリオ状況
（最新 site-state.json より -- ビルド後の値）

| 指標 | 値 |
|---|---|
| ブランド数 | N |
| 総記事数 | N |
| 平均記事数/ブランド | N |
| 高単価ブランド比率 | N% |
| recommended / conditional / not-recommended | N / N / N |

### 次回 /daily の予測判断
[現在の数値から、次回はどちらの条件が適用されるかを一行で]
```

---

## 重要な制約（全STEP共通）

- **`status: published` には絶対に変更しない**
- 記事を直接スキャンして集計し直さない -- site-state.json を使う
- Rule 14 の判断は実行前の site-state.json の値で行う
  （当日生成した記事は次回ビルドまで反映されない）
- Amazon の星評価・レビュー数の具体的数値を断定しない
- ASCII-only ルール（Rule 11）を守る
