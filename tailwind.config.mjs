/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',      // カード・ボックスの背景（白）
        tint: '#FAFAFA',       // ページ全体の背景（薄グレー）。paperとの明度差でカードを浮かせる
        ink: '#22282E',        // 本文用の墨色（純黒より柔らかい）
        indigo: {
          DEFAULT: '#24405A',  // 藍色。ブランドのプライマリ
          light: '#3D5B78',
        },
        seal: '#B33A3A',       // 朱色（鑑定印）。検証・CTAのアクセントのみに使用
        line: '#E4E4E7',       // ヘアライン罫線色（ニュートラルグレー）
      },
      fontFamily: {
        display: ['"Shippori Mincho"', 'serif'],   // 見出し：和の骨格を持つ明朝体
        body: ['"IBM Plex Sans"', 'sans-serif'],     // 本文
        data: ['"IBM Plex Mono"', 'monospace'],      // スペック数値・価格・調査ログ
      },
      letterSpacing: {
        wide2: '0.12em',
      },
    },
  },
  plugins: [],
};
