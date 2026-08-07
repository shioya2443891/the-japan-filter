/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4EC',      // 和紙を思わせる温かい生成り色。背景
        ink: '#22282E',        // 本文用の墨色（純黒より柔らかい）
        indigo: {
          DEFAULT: '#24405A',  // 藍色。ブランドのプライマリ
          light: '#3D5B78',
        },
        seal: '#B33A3A',       // 朱色（鑑定印）。検証・CTAのアクセントのみに使用
        line: '#D8D2C2',       // ヘアライン罫線色
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
