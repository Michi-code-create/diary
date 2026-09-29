import "./globals.css";

export const metadata = {
  title: "ひびのかけら｜あなたに合う日記アプリ",
  description:
    "24タイプ診断で、あなたに合った日記の書き方が見つかるパーソナライズ型日記アプリ。",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FBF8FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
