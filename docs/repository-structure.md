# リポジトリ構造定義書 (Repository Structure Document)

## 適用方針

- 本リポジトリは React Native + Expo + JavaScript を前提にする
- 実装ファイルは `.js` / `.jsx` を基本とする
- feature-first 構成を採用し、Tic-Tac-Toe 関連実装は `src/features/tic-tac-toe/` に集約する
- 品質確認は `npm run lint`、`npm test`、`npx expo start` を基本とする

## プロジェクト構造

```text
project-root/
├── App.jsx
├── assets/
│   ├── audio/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── navigation/
│   │   ├── providers/
│   │   └── theme/
│   ├── features/
│   │   └── tic-tac-toe/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── logic/
│   │       ├── screens/
│   │       ├── services/
│   │       ├── types/
│   │       └── __tests__/
│   └── shared/
│       ├── components/
│       ├── constants/
│       ├── test-support/
│       └── utils/
├── tests/
│   └── e2e/
├── docs/
├── .agents/
├── .steering/
├── package.json
├── eslint.config.js
└── jsconfig.json (必要な場合)
```

## ディレクトリ詳細

### `assets/`

**役割**: 画像、アイコン、効果音など UI 演出用アセットを保持する

**配置ファイル**:
- `images/app-logo.png`
- `audio/win.mp3`

**命名規則**:
- `kebab-case`

### `src/app/`

**役割**: アプリ全体の初期化、画面切替、テーマ、共通 provider を置く

**配置ファイル**:
- `navigation/`
- `theme/`
- `providers/`

**依存関係**:
- 依存可能: `shared/`, `features/`
- 依存禁止: `tests/`

### `src/features/tic-tac-toe/screens/`

**役割**: `HomeScreen`、`GameScreen` など feature の画面単位 UI を管理する

**配置ファイル**:
- `HomeScreen.jsx`
- `GameScreen.jsx`

**命名規則**:
- `PascalCaseScreen.jsx`

**依存関係**:
- 依存可能: `components/`, `hooks/`, `shared/`
- 依存禁止: Expo API の直接利用

### `src/features/tic-tac-toe/components/`

**役割**: 盤面、セル、結果表示など画面内で再利用する UI 部品を管理する

**配置ファイル**:
- `GameBoard.jsx`
- `MarkCell.jsx`
- `ResultBanner.jsx`

**命名規則**:
- `PascalCase.jsx`

**依存関係**:
- 依存可能: `shared/`, `types/`
- 依存禁止: `screens/`

### `src/features/tic-tac-toe/hooks/`

**役割**: 盤面状態とユーザー操作を結びつける hook を置く

**配置ファイル**:
- `useTicTacToeSession.js`

**命名規則**:
- `use` で始める

**依存関係**:
- 依存可能: `logic/`, `services/`, `types/`
- 依存禁止: `screens/`

### `src/features/tic-tac-toe/logic/`

**役割**: 初期状態生成、手番更新、勝敗判定など純粋ロジックを置く

**配置ファイル**:
- `createInitialState.js`
- `placeMark.js`
- `evaluateBoard.js`

**命名規則**:
- `camelCase.js`

**依存関係**:
- 依存可能: `types/`, `shared/utils/`
- 依存禁止: React、Expo、画面コンポーネント

### `src/features/tic-tac-toe/services/`

**役割**: 触覚フィードバックや将来のローカル保存など端末依存処理を管理する

**配置ファイル**:
- `feedbackService.js`

**命名規則**:
- `camelCase.js`

**依存関係**:
- 依存可能: Expo / React Native 公式 API
- 依存禁止: `screens/`

### `src/features/tic-tac-toe/types/`

**役割**: JSDoc 型補助や状態名定数など、feature 内で共有する契約を置く

**配置ファイル**:
- `gameSession.types.js`
- `gameStatus.js`

**命名規則**:
- `*.types.js`, `camelCase.js`

### `src/features/tic-tac-toe/__tests__/`

**役割**: feature の unit test / component test を近接配置する

**配置ファイル**:
- `AppNavigator.test.jsx`
- `evaluateBoard.test.js`
- `feedbackService.test.js`
- `placeMark.test.js`

**命名規則**:
- `*.test.jsx` / `*.test.js`

### `src/shared/`

**役割**: 複数 feature から使う UI、定数、util、test helper を管理する

**配置ファイル**:
- `components/`
- `constants/`
- `utils/`
- `test-support/`

## ファイル配置規則

| ファイル種別 | 配置先 | 命名規則 | 例 |
|------------|--------|---------|-----|
| 画面 | `screens/` | `PascalCaseScreen.jsx` | `GameScreen.jsx` |
| コンポーネント | `components/` | `PascalCase.jsx` | `GameBoard.jsx` |
| hook | `hooks/` | `useSomething.js` | `useTicTacToeSession.js` |
| service | `services/` | `camelCase.js` | `feedbackService.js` |
| util / logic | `logic/`, `utils/` | `camelCase.js` | `evaluateBoard.js` |
| type helper | `types/` | `*.types.js` | `gameSession.types.js` |
| test | `__tests__/` | `*.test.jsx` / `*.test.js` | `feedbackService.test.js` |

## 依存関係ルール

```text
screens -> hooks -> logic
screens -> hooks -> services
components -> shared
services -> Expo / React Native API
```

**禁止例**:
- `logic/` から Expo API を呼ぶ
- `components/` が `screens/` を import する
- `shared/` に Tic-Tac-Toe 固有ルールを持ち込む

## テスト / 起動確認

```bash
npm run lint
npm test
npx expo start
```

## 実機確認の記録先

- `.steering/[YYYYMMDD]-[task]/tasklist.md`
