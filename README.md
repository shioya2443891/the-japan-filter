# The Japan Filter

## これは何か
Astro（静的サイトジェネレーター）で作った、The Japan Filterのサイトの土台。
現状は動作確認用の最小構成（Noritakeの記事1本のみ）。

## 中身
- `src/pages/` : ページ（トップ、about、プライバシーポリシー、開示ページ、tablewareカテゴリー）
- `src/content/tableware/` : 記事本体（Markdown）。ここに記事を追加していく
- `src/components/` : 比較テーブル・調査ボックス等の部品
- `preview.html` : ブラウザで直接開けるデザインプレビュー（開発環境不要）

## 次にやること（GitHub → Cloudflare Pages）
1. GitHubで新しいリポジトリを作成（例: the-japan-filter）
2. このフォルダの中身をそのリポジトリにアップロード
   （GitHubの「Add file → Upload files」からドラッグ&ドロップでOK。
   コマンド操作は不要）
3. Cloudflareダッシュボードで「Workers & Pages」→「Create」→「Pages」→
   「Connect to Git」で、今作ったGitHubリポジトリを選択
4. ビルド設定：
   - Build command: `npm run build`
   - Build output directory: `dist`
5. デプロイ後、Cloudflare側で独自ドメイン（thejapanfilter.com）を接続
