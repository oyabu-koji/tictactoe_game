# 開発ガイドライン (Development Guidelines)

## 基本原則

- 最優先は「すぐ遊べる」「勝敗が分かりやすい」体験を守ること
- オフライン完結を前提にし、不要な権限や通信依存を追加しない
- 要件や設計の変更は `docs/` と `.steering/` の両方へ反映する

## 開発環境

- Node.js: 22.x
- npm: 10.x
- JavaScript: ES2022
- 実行基盤: React Native + Expo managed workflow

### 日常コマンド

```bash
npm run lint
npm test
npx expo start
npx expo start --tunnel -c
```

### Node.js の固定

- このリポジトリでは `Node 22.x` を前提にする
- `node -v` が `22.x` 以外なら Expo 起動や tunnel 判定が不安定になるため、先に PATH または version manager を修正する
- macOS + Homebrew で `node@22` を使う場合は、`node@22` が keg-only なので `PATH` の先頭に追加してから作業する

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
hash -r
node -v
```

### 依存関係セットアップ

- `npm install` を初回セットアップの標準手順とする
- リモート端末確認で使う `@expo/ngrok` は `devDependencies` に含め、グローバル install に依存しない

```bash
npm install
node -v
```

## コーディング規約

### JavaScript / JSDoc

```javascript
/**
 * @typedef {Object} GameSessionState
 * @property {CellModel[]} board
 * @property {'X' | 'O'} currentPlayer
 * @property {'idle' | 'playing' | 'won' | 'draw'} status
 */
```

- 公開される関数、hook、service の契約は JSDoc で補う
- 状態名、エンティティ名、制約は `docs/functional-design.md` と揃える
- TypeScript は明示依頼がない限り導入しない

### 命名規則

```javascript
const winningLine = [0, 1, 2];

function evaluateBoard(board) {
  return null;
}

function useTicTacToeSession() {
  return {};
}

function GameScreen() {
  return null;
}
```

- 変数 / 関数: `camelCase`
- コンポーネント: `PascalCase`
- hook: `use` で始める
- 真偽値: `is` / `has` / `can` / `should`

### ファイル規約

- 画面: `PascalCaseScreen.jsx`
- コンポーネント: `PascalCase.jsx`
- hook / service / util: `camelCase.js`
- type helper: `*.types.js`
- test: `*.test.js` / `*.test.jsx`

### エラーハンドリング

```javascript
class ValidationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}
```

- 入力不正は明示的なエラーまたは無害な無視で扱い、盤面状態を壊さない
- 端末依存処理の失敗は recoverable error として扱い、ゲーム進行を止めない
- `catch` で継続する場合は、なぜ続行可能かをコメントまたは設計で説明する

## UI / 実装ルール

- 画面から Expo API を直接呼ばない
- 端末依存処理は `services/` に集約する
- 勝敗判定や入力ガードは `logic/` に集約する
- 盤面、手番、結果、再戦導線は同一画面で把握できるように保つ
- 子どもでも理解しやすいよう、長文説明より視覚的な状態変化を優先する

## テスト戦略

### unit test
- 勝敗判定の 8 パターン
- 埋まったセルの無効入力と手番切替

### component test
- ホーム画面からの対戦開始
- 勝利 / 引き分け時の結果表示と再戦導線

### 起動確認
- `npx expo start` でホーム画面とゲーム画面が起動する
- 実機でタップ操作と視認性を確認する

### リモート端末確認
- 同一 LAN で確認しにくい場合は `npx expo start --tunnel -c` を使う
- `--tunnel` と `--offline` は併用しない
- Expo Go で実機確認する場合は、Metro cache の影響を避けるため `-c` 付きで起動する

## Expo 起動トラブルシュート

### `@expo/ngrok` の install を毎回求められる

- `node -v` が `22.x` か確認する
- `npm install` を実行してローカルの `devDependencies` を揃える
- `@expo/ngrok` はグローバルではなくプロジェクトローカルを優先する

```bash
node -v
npm install
npx expo start --tunnel -c
```

### `failed to start tunnel` / `remote gone away`

- `~/.expo/ngrok.yml` が壊れている、または古い設定を保持している可能性がある
- まず設定ファイルを削除し、Metro cache を消して tunnel を再起動する

```bash
rm -f ~/.expo/ngrok.yml
npx expo start --tunnel -c
```

- それでも改善しない場合は VPN / プロキシ / 通信フィルタを外し、別回線で再試行する

## 品質ゲート

- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npx expo start`
- [ ] 必要な `docs/` / `.steering/` 更新

## Git 運用

- ブランチ戦略: `main` を安定状態とし、作業は `feature/<task>` または `docs/<task>` を基本とする
- コミット規約: Conventional Commits
- PR 前チェック: 受け入れ条件、lint、test、起動確認、関連ドキュメント更新を確認する

## Definition of Done

- [ ] 受け入れ条件を満たす
- [ ] lint / test / 起動確認が完了している
- [ ] `docs/` と `.steering/` の記述が最新である
