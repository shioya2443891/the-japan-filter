# The Japan Filter — Astroディレクトリ構成案

```
the-japan-filter/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   └── og-default.png            # 自社制作のOGP画像（Amazon画像は使わない）
│
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro       # 全ページ共通（header/footer/開示文言）
│   │   └── ArticleLayout.astro    # 記事ページ専用（著者バイライン・更新日表示）
│   │
│   ├── components/
│   │   ├── ComparisonTable.astro   # 商品比較テーブル（★今回作成）
│   │   ├── HowWeResearched.astro   # 調査プロセス開示ボックス（★今回作成）
│   │   ├── VerifiedBadge.astro     # "Best Overall"等の認定バッジ（署名要素）
│   │   ├── AffiliateDisclosure.astro # Associates開示文言（全記事共通・footer固定）
│   │   ├── ProductCard.astro       # 画像なし運用の商品カード（CTA付き）
│   │   └── Header.astro / Footer.astro / Nav.astro
│   │
│   ├── content/
│   │   ├── config.ts               # Content Collections定義（カテゴリー・記事のスキーマ）
│   │   ├── kitchen-cutlery/         # カテゴリー1：包丁・キッチン調理小道具
│   │   │   ├── best-santoku-knives-2026.md
│   │   │   ├── real-vs-fake-japanese-knives.md
│   │   │   ├── gyuto-vs-santoku-guide.md
│   │   │   ├── best-japanese-knife-sharpening-stones.md
│   │   │   └── best-japanese-nakiri-vegetable-knives.md
│   │   └── stationery/              # カテゴリー2：高機能文具・製図・裁断道具
│   │       └── (Phase 6後半で追加。V1では包丁カテゴリーを先行)
│   │
│   ├── pages/
│   │   ├── index.astro              # トップページ（The Japan Filterのコンセプト訴求）
│   │   ├── about.astro              # 運営者情報・信頼性説明（E-E-A-T対応）
│   │   ├── privacy-policy.astro     # プライバシーポリシー（Associates申請要件）
│   │   ├── disclosure.astro         # アフィリエイト開示ページ
│   │   ├── kitchen-cutlery/
│   │   │   ├── index.astro          # カテゴリーindex（ピラーページ）
│   │   │   └── [...slug].astro      # 記事の動的ルーティング
│   │   └── stationery/
│   │       └── index.astro          # （将来用の空のピラーページ）
│   │
│   └── utils/
│       └── opportunityData.ts       # V1のOpportunity Engineデータ（簡易JSON/シート連携用の型定義のみ。自動化ロジックは実装しない）
│
└── sitemap.xml                      # Astro公式integrationで自動生成
```

## 設計上のポイント

- **カテゴリーごとにディレクトリを分離**（`content/kitchen-cutlery/`, `content/stationery/`）し、将来カテゴリーが増えてもフラットにならない構造にしている
- **`stationery/`は今回ディレクトリだけ用意し、コンテンツは空**。V1のスコープは「1〜2カテゴリーに絞る」方針に沿って、まず`kitchen-cutlery`を先行させる
- **`AffiliateDisclosure.astro`を独立コンポーネント化**し、全記事のfooterに固定表示することでAmazon規約の開示義務を構造的に担保する
- **`ProductCard.astro`は画像なし運用前提**。Amazon商品画像はCreators API解放（10件/30日達成）まで使用しない方針を反映している
- **`opportunityData.ts`は型定義のみ**。V1では自動スコアリングを実装しないという方針を、コード構成上も明確にしている
