# TicTacToe Game

Offline local two-player tic-tac-toe built with React Native and Expo.

## 技術スタック

- React Native
- Expo managed workflow
- JavaScript
- Node 22
- Expo SDK 54

## 現在の実装範囲

- ホーム画面から 1 タップでゲーム開始
- 3x3 盤面での交互ターン進行
- 勝敗判定と引き分け判定
- 終局後の再戦
- Jest + `@testing-library/react-native` による unit / component test

## 開発コマンド

```bash
npm install
npm run lint
npm test
npx expo start
npx expo start --tunnel -c
```

## 起動手順

通常のローカル確認:

```bash
node -v
npx expo start
```

- `node -v` は `22.x` を前提にする

リモート端末確認:

```bash
node -v
npx expo start --tunnel -c
```

- `--tunnel` 利用時は `@expo/ngrok` を `devDependencies` で管理する
- tunnel が不安定な場合は `docs/development-guidelines.md` のトラブルシュートを参照する

## ドキュメント

- Durable docs: `docs/`
- 作業単位の計画: `.steering/`
- エージェント用 workflow / skills: `.agents/`

## 開発フロー

1. `docs/` の durable docs を確認する
2. 対象の `.steering/[YYYYMMDD]-[task]/` を読む
3. `tasklist.md` に従って実装する
4. `npm run lint` と `npm test` を通す
5. `npx expo start` で起動確認する

`.devcontainer/` は任意利用です。現時点で Docker 利用は必須ではありません。
