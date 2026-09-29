# ひびのかけら（名称未定）

パーソナライズ型日記Webアプリのプロトタイプ（第1段階）です。
30問の診断で6タイプ×4サブタイプ＝24タイプに分類し、タイプごとに最適化した日記入力フォームと、7感情のキーワード解析・グラフ表示、連続記録によるゲーミフィケーションを備えています。

## 動かし方

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開くと動作します。

本番ビルドを試す場合:

```bash
npm run build
npm run start
```

## 使っている技術

- Next.js (App Router) / React
- Tailwind CSS v4
- Lucide React（アイコン）
- Recharts（円グラフ・折れ線グラフ）
- Framer Motion（診断フローの画面遷移）
- canvas-confetti（保存・診断完了時の演出）
- ブラウザの `localStorage`（データ保存。サーバーは使用しません）

## ディレクトリ構成

```
app/
  layout.jsx       ルートレイアウト（フォント・メタ情報）
  page.jsx         トップページ（DiaryAppを描画するだけ）
  globals.css       Tailwind読み込み・配色トークン・アニメーション定義
components/
  DiaryApp.jsx      アプリ全体の状態管理・画面切り替え
  DiagnosisFlow.jsx 30問診断フロー
  WriteForms.jsx    6タイプ別の日記入力フォーム
  WriteScreen.jsx   日記作成画面（タグ付け含む）
  HomeScreen.jsx    ホーム画面（連続日数・検索・一覧）
  AnalysisScreen.jsx 感情分析画面（円グラフ・推移グラフ）
  TypesScreen.jsx   24タイプ一覧・切り替え・拡張モジュール
  SettingsScreen.jsx エクスポート・テーマ解放・データリセット
  ui.jsx            共通部品（ヘッダー・ナビ・紙吹雪など）
lib/
  constants.js      タイプ定義・診断の質問・感情辞書などのデータ
  utils.js          感情解析・ストリーク計算・診断結果判定などのロジック
  storage.js        localStorageへの保存・読み込み
```

## 注意点・今後の拡張ポイント

- **データ保存について**: `localStorage` に保存しているため、ブラウザやデバイスを変えると引き継がれません。他端末同期が必要な場合は、サーバー・DBを別途用意する設計変更が必要です。
- **PWA対応**: `public/manifest.json` を用意していますが、アイコン画像（192x192 / 512x512 の `.png` など）が未設定です。`public/` に配置して `manifest.json` の `icons` を埋めると「ホーム画面に追加」が正式に機能します。オフラインキャッシュ（Service Worker）まで必要な場合は `next-pwa` などの追加導入をおすすめします。
- **診断・タイプの拡張**: `lib/constants.js` に全データが集約されているので、質問文やサブタイプの説明文はこのファイルの編集だけで調整できます。
- **依存パッケージのバージョン**: `package.json` はプロトタイプ作成時点のものです。`npm install` 時に週次で更新される可能性があるので、`npm outdated` で適宜確認してください。

## Gitへのpush / Vercelへのデプロイ

このフォルダはすでに `git init` 済みで、最初のコミットも作成されています。GitHubにpushする場合は以下の手順です。

```bash
git remote add origin <あなたのリポジトリURL>
git branch -M main
git push -u origin main
```

その後、[Vercel](https://vercel.com) でこのリポジトリをインポートすれば、そのままデプロイできます（Next.jsプロジェクトなので設定はほぼ自動検出されます）。
