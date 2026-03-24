# プロジェクト用語集 (Glossary)

## 概要

このドキュメントは、プロジェクト内で使用される用語の定義を管理します。

**更新日**: 2026-03-23

## ドメイン用語

### Tic-Tac-Toe

**定義**: 3x3 の盤面で `X` と `O` を交互に置き、縦横斜めのいずれかを 3 つ揃えるゲーム。

**説明**: 本プロジェクトのコアゲーム体験そのものを指す。

**関連用語**: Board, Turn, Winning Line

**使用例**:
- Tic-Tac-Toe の 1 局を 1 分以内に遊べることを目指す
- Tic-Tac-Toe の勝敗判定は Domain Layer で扱う

**英語表記**: Tic-Tac-Toe

### Board

**定義**: 9 個のセルからなるゲーム盤面。

**説明**: `CellModel` の配列として表現し、各セルの `mark` と勝ち筋強調状態を保持する。

**関連用語**: Cell, Winning Line

**使用例**:
- Board は常に 9 セルを保持する
- Board の更新は `placeMark` を通じて行う

**英語表記**: Board

### Turn

**定義**: 現在の手番プレイヤー。

**説明**: `currentPlayer` として `X` または `O` を持つ。

**関連用語**: Mark, Game Status

**使用例**:
- Turn は有効手のたびに切り替わる
- 終局後は Turn を表示しても入力は受け付けない

**英語表記**: Turn

### Winning Line

**定義**: 勝利を成立させた 3 マスの並び。

**説明**: 画面上で勝者を視覚的に示すための index 配列。

**関連用語**: Winner, Board

**使用例**:
- Winning Line は `won` 状態のときだけ保持する
- Winning Line のセルは強調表示する

**英語表記**: Winning Line

### Draw

**定義**: 9 マスが埋まり、どちらのプレイヤーも勝利していない状態。

**説明**: `Game Status` のひとつで、勝者は `null` になる。

**関連用語**: Game Status, Winner

**使用例**:
- Draw のときは再戦導線を表示する
- Draw では盤面入力を停止する

**英語表記**: Draw

## 技術用語

### React Native

**定義**: JavaScript / React でモバイル UI を構築するフレームワーク。

**公式サイト**: https://reactnative.dev/

**本プロジェクトでの用途**: Tic-Tac-Toe の画面、盤面、タップ UI を実装する。

**バージョン方針**: Expo SDK 54 対応版

**関連ドキュメント**: `docs/architecture.md`

### Expo

**定義**: React Native アプリの実行基盤と開発支援を提供するプラットフォーム。

**公式サイト**: https://expo.dev/

**本プロジェクトでの用途**: managed workflow、起動、将来の触覚フィードバックなどに利用する。

**バージョン方針**: SDK 54 に固定

**関連ドキュメント**: `docs/architecture.md`

### JSDoc

**定義**: JavaScript コードに型や契約を注釈として付与する記法。

**公式サイト**: https://jsdoc.app/

**本プロジェクトでの用途**: `GameSessionState` や `CellModel` などのデータ契約を明文化する。

**バージョン方針**: 言語機能として継続利用

**関連ドキュメント**: `docs/functional-design.md`, `docs/development-guidelines.md`

### Jest

**定義**: JavaScript 向けのテストランナー。

**公式サイト**: https://jestjs.io/

**本プロジェクトでの用途**: `jest-expo` と組み合わせて、純粋ロジックと React Native コンポーネントの test を実行する。

**バージョン方針**: Expo SDK 54 互換版を固定

**関連ドキュメント**: `docs/architecture.md`, `docs/development-guidelines.md`

### @testing-library/react-native

**定義**: React Native コンポーネントをユーザー操作に近い形でテストするライブラリ。

**公式サイト**: https://callstack.github.io/react-native-testing-library/

**本プロジェクトでの用途**: 画面遷移、盤面タップ、結果表示を component test する。

**バージョン方針**: React Native 互換版

**関連ドキュメント**: `docs/architecture.md`, `docs/development-guidelines.md`

## 略語・頭字語

### MVP

**正式名称**: Minimum Viable Product

**意味**: 最小限の価値を提供する初期リリース範囲。

**本プロジェクトでの使用**: ローカル対戦、勝敗判定、再戦までを MVP として扱う。

### PRD

**正式名称**: Product Requirements Document

**意味**: プロダクト要求定義書。

**本プロジェクトでの使用**: `docs/product-requirements.md` を指す。

### UX

**正式名称**: User Experience

**意味**: 利用者が感じる使いやすさや体験品質。

**本プロジェクトでの使用**: 起動の速さ、視認性、結果の分かりやすさを含む。

## アーキテクチャ用語

### UI Layer

**定義**: 画面描画とユーザー入力受付を担当する層。

**本プロジェクトでの適用**: `HomeScreen`、`GameScreen`、`GameBoard` などを置く。

**関連コンポーネント**: `screens/`, `components/`

### Application Layer

**定義**: UI イベントを状態遷移へ変換する層。

**本プロジェクトでの適用**: `useTicTacToeSession` が中心となり、ロジックと service を調停する。

**関連コンポーネント**: `hooks/`

### Domain Layer

**定義**: ゲームルールや判定など、純粋関数中心の層。

**本プロジェクトでの適用**: `createInitialState`, `placeMark`, `evaluateBoard` を置く。

**関連コンポーネント**: `logic/`

### Platform Layer

**定義**: Expo や端末 API を扱う層。

**本プロジェクトでの適用**: 触覚フィードバックや将来のローカル保存を service として管理する。

**関連コンポーネント**: `services/`

## ステータス・状態

### Game Status

| ステータス | 意味 | 遷移条件 | 次の状態 |
|----------|------|---------|---------|
| `idle` | 対戦開始前の初期状態 | アプリ起動または初期化直後 | `playing` |
| `playing` | 対戦中 | 対戦開始または再戦開始 | `playing`, `won`, `draw` |
| `won` | 勝者が確定した状態 | 有効手で 3 つ揃った | `playing` |
| `draw` | 引き分けが確定した状態 | 9 マスが埋まり勝者なし | `playing` |

## データモデル用語

### CellModel

**定義**: 盤面の 1 マスを表すデータ。

**主要フィールド**:
- `index`: 0 から 8 までの位置
- `mark`: `X`, `O`, `null` のいずれか
- `isWinningCell`: 勝ち筋強調の有無

**関連エンティティ**: `GameSessionState`

**実装例**: `src/features/tic-tac-toe/types/gameSession.types.js`

### GameSessionState

**定義**: 1 局の進行状態全体を保持するデータ構造。

**主要フィールド**:
- `board`: 現在の盤面
- `currentPlayer`: 現在手番
- `status`: 進行状態
- `winner`: 勝者または `null`
- `winningLine`: 勝ち筋の index 配列、または `null`
- `message`: 手番や結果表示に使う文言、または `null`

**関連エンティティ**: `CellModel`, `Game Status`

**実装例**: `src/features/tic-tac-toe/types/gameSession.types.js`

## エラー・例外

### ValidationError

**クラス名**: `ValidationError`

**発生条件**: 不正な index や想定外の盤面データをロジックへ渡した場合。

**対処方法**: 早期に検出し、状態更新を行わずに安全な UI 状態を維持する。

**例**:
```javascript
throw new ValidationError('invalid board index');
```

### Feedback Fallback

**クラス名**: なし

**発生条件**: MVP の `feedbackService` は no-op 実装のため、端末フィードバック失敗を例外として表面化しない。

**対処方法**: service 内で安全に無視し、ゲーム進行を継続する。

**例**:
```javascript
await feedbackService.trigger('win');
```

## テスト関連用語

### component test

**定義**: 画面やコンポーネントをユーザー操作に近い形で検証するテスト。

**本プロジェクトでの使用**: ホーム画面からの開始、盤面操作、結果表示、再戦導線を確認する。

**関連コマンド**:
- `npm run lint`
- `npm test`
- `npx expo start`
