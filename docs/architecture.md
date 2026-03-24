# アーキテクチャ設計書 (Architecture Design Document)

## 前提と方針

- 本プロジェクトは React Native + Expo + JavaScript を前提にする
- MVP は単一端末で完結するオフラインクライアントとして設計する
- 最優先体験は「起動後すぐ遊べること」と「勝敗が分かりやすいこと」とする
- 品質確認は `npm run lint`、`npm test`、`npx expo start` を基本とする

## テクノロジースタック

### 言語・ランタイム

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Node.js | 22.x | 開発環境 |
| JavaScript | ES2022 | アプリ実装 |
| npm | 10.x | パッケージ管理 |

### フレームワーク・ライブラリ

| 技術 | バージョン | 用途 | 選定理由 |
|------|-----------|------|----------|
| React Native | Expo SDK 54 対応版 | モバイル UI | タッチ操作中心のゲーム UI を iOS / Android 両方へ提供できる |
| Expo | SDK 54 | 実行基盤・端末機能 | Managed workflow で初期構築と端末依存機能利用を簡素化できる |
| React | Expo 同梱版 | 宣言的 UI | 盤面状態に応じた UI 更新を簡潔に記述できる |
| 追加ライブラリなし (MVP) | - | 端末フィードバック | MVP では no-op service で開始し、要件確定後に必要なら Expo 公式モジュールを追加する |

### 開発ツール

| 技術 | バージョン | 用途 | 選定理由 |
|------|-----------|------|----------|
| ESLint | 現行メジャー | 静的解析 | JavaScript 実装の整合性を保ちやすい |
| Jest | 29.x | unit test | Expo managed workflow で安定して動く test runner として採用する |
| `@testing-library/react-native` | React Native 互換版 | component test | Jest と組み合わせて画面とタップフローを実利用に近い形で確認できる |
| Prettier | 現行メジャー | 整形 | ドキュメントと JavaScript のスタイル差異を抑えられる |

## アーキテクチャパターン

### Feature-first + Layered Client Architecture

```text
UI Layer
  screens / components
Application Layer
  hooks / controllers
Domain Layer
  tic-tac-toe rules / selectors
Platform Layer
  haptics / storage / device services
```

### レイヤー定義

#### UI Layer
- **責務**: ホーム画面、ゲーム画面、盤面 UI、結果表示を描画する
- **許可される操作**: hook / controller の呼び出し、theme の参照
- **禁止される操作**: 勝敗判定ロジックの実装、Expo API の直接利用

#### Application Layer
- **責務**: セルタップを状態更新へ変換し、再戦や演出の呼び出し順を調停する
- **許可される操作**: Domain Layer / Platform Layer の呼び出し
- **禁止される操作**: 盤面描画の JSX 詳細を持つこと

#### Domain Layer
- **責務**: 初期盤面生成、手番切替、勝敗判定、引き分け判定、入力ガード
- **許可される操作**: 純粋関数、JSDoc 契約への依存
- **禁止される操作**: React、Expo、端末 API、ログ出力前提の副作用

#### Platform Layer
- **責務**: 触覚フィードバック、将来のローカル保存、端末差異吸収
- **許可される操作**: Expo / React Native 公式 API の利用
- **禁止される操作**: ゲームルールの意思決定、UI 状態の直接変更

## データ管理

| データ種別 | 保存場所 | フォーマット | 理由 |
|-----------|----------|-------------|------|
| 盤面状態 | メモリ | JavaScript オブジェクト | 1 局ごとの短命データであり、MVP では永続化不要 |
| 現在手番 | メモリ | `'X' | 'O'` | UI 表示と勝敗判定に即時反映できる |
| 勝敗結果 | メモリ | `winner`, `status`, `winningLine` | 画面描画のために軽量に保持できる |
| 将来の設定値 | ローカル保存予定 | JSON 相当 | サウンド設定や先手設定の追加余地を確保する |

## オフライン戦略

- 外部 API やクラウド依存を持たない
- ゲーム進行にネットワーク接続を要求しない
- 触覚フィードバックが利用できない端末でもゲーム本体は成立させる

## テスト戦略

### unit test
- **実行手段**: `npm test`
- **対象**: `createInitialState`, `placeMark`, `evaluateBoard` など Domain Layer の純粋関数

### component test
- **実行手段**: `npm test`
- **対象**: `HomeScreen` と `GameScreen` の主要フロー、無効セル入力、再戦導線

### 起動確認
- **実行手段**: `npx expo start`
- **対象**: ホーム画面表示、対戦開始、終局までの基本フロー

### 静的解析
- **実行手段**: `npm run lint`
- **対象**: 命名、import、未使用コード、hooks ルール

## パフォーマンス要件

| 項目 | 目標 | 測定条件 |
|------|------|---------|
| 起動時間 | 3 秒以内 | 基準端末で初回ホーム画面が表示されるまで |
| タップ反応 | 100ms 未満 | 盤面セルを押して記号が表示されるまで |
| メモリ使用量 | 軽量を維持 | 単一盤面と最小限の UI 状態のみを保持する |

## セキュリティ / 品質制約

- 個人情報を扱わない
- 不要な権限を要求しない
- ログやエラー表示に端末固有の機密情報を含めない

## 技術的制約

- 縦向き前提で片手でも操作しやすい UI を優先する
- Expo managed workflow で完結する範囲を優先し、ネイティブカスタマイズを避ける
- 追加依存は標準機能で代替できない場合のみ採用する

## 依存関係管理

| ライブラリ | 用途 | 管理方針 |
|-----------|------|---------|
| React Native / Expo | 実行基盤 | Expo 互換性を優先して固定 |
| ESLint | 静的解析 | Expo SDK 54 互換の `eslint-config-expo` を使う |
| Jest / `jest-expo` | テスト | Expo SDK 54 互換版を固定して管理する |
| `@testing-library/react-native` | component test | React Native 互換性を優先 |

## 確認チェックリスト

- [x] React Native + Expo + JavaScript の前提が明記されている
- [x] UI / Application / Domain / Platform の責務が分かれている
- [x] `npm run lint` / `npm test` / `npx expo start` が確認手順に含まれている
- [x] オフライン前提と端末依存処理の扱いが記述されている
